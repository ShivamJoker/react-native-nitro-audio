import { useEffect } from 'react';
import { Text, View, StyleSheet, Button, ToastAndroid } from 'react-native';
import AudioManager from 'react-native-nitro-audio';

export default function App() {
  useEffect(() => {
    try {
      AudioManager.createPlayer(
        '1',
        'https://cdn.freesound.org/previews/353/353194_5121236-lq.mp3'
      );
      // // NitroAudioHybridObject.setLoop('1', true);
      AudioManager.addInfoEventListener('1', (status) => {
        console.log(status);
        ToastAndroid.show('S' + status, 200);
      });
      //
      // AudioManager.pause('1');
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Play audio files like a pro</Text>
      <Button title="Play" onPress={() => AudioManager.play('1')} />
      <Button title="Pause" onPress={() => AudioManager.pause('1')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
