import type { HybridObject } from 'react-native-nitro-modules';

export interface NitroAudio
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  createPlayer(id: string, url: string): void;
  play(id: string): void;
  pause(id: string): void;
  stop(id: string): void;
  setLoop(id: string, loop: boolean): void;
  setRate(id: string, rate: number): void;
  setVolume(id: string, to: number): void;
  seek(id: string, position: number): void;
  releasePlayer(id: string): void;
  addInfoEventListener(id: string, cb: (status: number) => void): void;
  destroyAll(): void;
}
