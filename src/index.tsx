import { NitroModules } from 'react-native-nitro-modules';
import type { NitroAudio } from './NitroAudio.nitro';

export const AudioManager =
  NitroModules.createHybridObject<NitroAudio>('NitroAudio');

export default AudioManager;

export class AudioPlayer {
  private id: string;
  //@ts-ignore
  private url: string;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
    AudioManager.createPlayer(id, url);
  }

  play() {
    return AudioManager.play(this.id);
  }

  pause() {
    return AudioManager.pause(this.id);
  }

  stop() {
    return AudioManager.stop(this.id);
  }

  setLoop(loop: boolean) {
    return AudioManager.setLoop(this.id, loop);
  }

  setRate(rate: number) {
    return AudioManager.setRate(this.id, rate);
  }

  setVolume(to: number) {
    return AudioManager.setVolume(this.id, to);
  }

  seek(time: number) {
    return AudioManager.seek(this.id, time);
  }

  async release() {
    AudioManager.releasePlayer(this.id);
    return console.log(`Audio instance ${this.id} released`);
  }
}
