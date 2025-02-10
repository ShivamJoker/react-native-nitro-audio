import { NitroModules } from 'react-native-nitro-modules';
import type { NitroAudio } from './NitroAudio.nitro';

const NitroAudioHybridObject =
  NitroModules.createHybridObject<NitroAudio>('NitroAudio');

export function multiply(a: number, b: number): number {
  return NitroAudioHybridObject.multiply(a, b);
}
