package com.margelo.nitro.nitroaudio

@DoNotStrip
class NitroAudio : HybridNitroAudioSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
