package com.margelo.nitro.nitroaudio


import android.media.MediaPlayer
import android.util.Log
import android.content.Context
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.Promise
import kotlin.collections.forEach

class NitroAudio : HybridNitroAudioSpec() {
  private val mediaPlayers: MutableMap<String, MediaPlayer> = mutableMapOf()
  private val context: Context
    get() = NitroModules.applicationContext ?: throw Error("Lost applicationContext")

  override fun createPlayer(id: String, url: String): Promise<Double> {
    return Promise.async {
      val mediaPlayer = MediaPlayer().apply {
        setOnErrorListener { mp, what, extra ->
          when (what) {
            MediaPlayer.MEDIA_ERROR_MALFORMED -> Log.d("AudioDebug", "Malformed")
          }
          Log.d("AudioDebug", what.toString())
          true
        }
        if (url.startsWith("http")) {
          setDataSource(url)
          prepareAsync()

        } else {
          val file = context.assets.openFd(url)
          setDataSource(file)
          prepare()
        }
      }
      mediaPlayers[id] = mediaPlayer
//      mediaPlayer.setOnPreparedListener{listener ->
        return@async mediaPlayer.duration.toDouble() / 1000
//      }
    }
  }


  override fun play(id: String) {
    mediaPlayers[id]?.let { player ->
      if (!player.isPlaying) {
        player.start()
      }
    } ?: throw Error("Player with ID $id not found")
  }

  override fun addInfoEventListener(id: String, cb: (Double) -> Unit) {
    val player = mediaPlayers[id]
    if (player == null) {
      throw Error("Player not found")
    }
    player.setOnCompletionListener { mp ->
      Log.d("AudioDebug", "ended")
    }
    player.setOnInfoListener { mp, what, extra ->
      cb(what.toDouble())
      Log.d("AudioDebug", what.toString())
      true
    }

  }

  override fun pause(id: String) {
    mediaPlayers[id]?.let { player ->
      if (player.isPlaying) {
        player.pause()
      }
    } ?: throw Error("Player with ID $id not found")
  }


  override fun stop(id: String) {
    mediaPlayers[id]?.let { player ->
      player.stop()
      player.prepare() // Resetting the player to the beginning

    } ?: throw Error("Player with ID $id not found")
  }


  override fun setLoop(id: String, loop: Boolean) {
    mediaPlayers[id]?.let { player ->
      player.isLooping = loop

    } ?: throw Error("Player with ID $id not found")
  }


  override fun setRate(id: String, rate: Double) {
    mediaPlayers[id]?.let { player ->
      player.playbackParams = player.playbackParams.setSpeed(rate.toFloat())
    } ?: throw Error("Player with ID $id not found")
  }


  override fun seek(id: String, position: Double) {
    mediaPlayers[id]?.seekTo(position.toInt())
  }


  override fun setVolume(id: String, to: Double) {
    mediaPlayers[id]?.setVolume(to.toFloat(), to.toFloat())
  }


  override fun releasePlayer(id: String) {
    mediaPlayers.remove(id)?.release()
  }


  override fun destroyAll() {
    // Cleanup all MediaPlayer instances when the module is destroyed
    mediaPlayers.values.forEach { it.release() }
    mediaPlayers.clear()
  }
}
