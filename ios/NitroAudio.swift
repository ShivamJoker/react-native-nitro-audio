import AVFoundation
import NitroModules

enum AudioURLResolverError: Error {
    case invalidURL
    case downloadFailed(String)
}

func resolveAudioURL(_ urlString: String) async throws -> URL {
    
    guard let url = URL(string: urlString) else {
        throw AudioURLResolverError.invalidURL
    }
    
    if url.isFileURL {
        // Local file, return as is
        return url
    } else if url.scheme == "http" || url.scheme == "https"{
        // Remote URL, download the file
        let (localURL, response) = try await URLSession.shared.download(from: url)
        
        // Ensure we have a valid HTTP response
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw AudioURLResolverError.downloadFailed("Failed with status code: \((response as? HTTPURLResponse)?.statusCode ?? -1)")
        }
        
        return localURL
    } else {
        let fileUrl = Bundle.main.bundleURL.appendingPathComponent(urlString)
        if FileManager.default.fileExists(atPath: fileUrl.path){
            return fileUrl
        }
        throw RuntimeError.error(withMessage: "Failed to get file \(urlString)")
        
    }
    
}

class NitroAudio: HybridNitroAudioSpec {

    

    func addInfoEventListener(id: String, cb: @escaping (Double) -> Void) throws {
//        <#code#>
    }
    
    func destroyAll() throws {
//        <#code#>
    }
    
    private var audioPlayers: [String: AVAudioPlayer] = [:]
    
    // Helper method to get AVAudioPlayer by ID
    private func getPlayer(by id: String) throws -> AVAudioPlayer {
        guard let player = audioPlayers[id] else {
            throw RuntimeError.error(withMessage: "Player with id \(id) not found")
        }
        return player;
    }

    // Method to initialize an audio player
    func createPlayer(id: String, url: String) throws -> Promise<Double> {
        return Promise.async {
            let audioUrl = try await resolveAudioURL(url)
            let audioPlayer = try AVAudioPlayer(contentsOf: audioUrl)
            audioPlayer.enableRate = true;
            audioPlayer.prepareToPlay()
            self.audioPlayers[id] = audioPlayer
            return audioPlayer.duration
        }
    }
    
    // Method to play audio
    func play(id: String) throws {
        try getPlayer(by: id).play()
    }
    
    // Method to pause audio
    func pause(id: String) throws {
        try getPlayer(by: id).pause()
    }
    
    // Method to stop audio
    func stop(id: String) throws {
        try getPlayer(by: id).stop()
    }
    
    // Method to set looping
    func setLoop(id: String, loop: Bool) throws {
        let player = try getPlayer(by: id)
        player.numberOfLoops = loop ? -1 : 0
    }
    
    // Method to set playback rate
    func setRate(id: String, rate: Double) throws {
        let player = try getPlayer(by: id)
        player.rate = Float(rate)
        player.play()
    }
  
    // Method to set volume
    func setVolume(id: String, to: Double) throws {
        try getPlayer(by: id).volume = Float(to)
    }
  
    // Method to seek to a specific time
    func seek(id: String, position: Double) throws {
        try getPlayer(by: id).currentTime = position
    }
    
    // Cleanup method to remove an audio player instance
    func releasePlayer( id: String) throws {
        audioPlayers.removeValue(forKey: id)
    }
}
