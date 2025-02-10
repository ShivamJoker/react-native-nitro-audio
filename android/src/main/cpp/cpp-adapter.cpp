#include <jni.h>
#include "nitroaudioOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitroaudio::initialize(vm);
}
