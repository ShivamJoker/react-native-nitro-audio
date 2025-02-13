import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import AudioManager from 'react-native-nitro-audio';

export default function App() {
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    // try {
    AudioManager.createPlayer(
      '1',
      'sounds/pingu-theme-music.mp3'
      // 'https://nootnoot.in/_astro/pingu-theme-music.6b29e06c.mp3'
    )
      .then((dur) => {
        setDuration(dur);
      })
      .catch((err) => {
        //@ts-ignore
        Alert.alert('Failed to load audio', err.message);
      });
    // // NitroAudioHybridObject.setLoop('1', true);
    // AudioManager.addInfoEventListener('1', (status) => {
    //   console.log(status);
    // });
    //
    // AudioManager.pause('1');
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Play audio files like a pro</Text>
      <Text>Duration: {duration.toFixed(2)}</Text>
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => {
          setIsPlaying(!isPlaying);
          isPlaying ? AudioManager.pause('1') : AudioManager.play('1');
        }}
      />

      <Button
        title={isLooping ? 'Remove Loop' : 'Loop'}
        onPress={() => {
          setIsLooping(!isLooping);
          AudioManager.setLoop('1', !isLooping);
        }}
      />

      <Button
        title={`${speed}X`}
        onPress={() => {
          const newRate = speed >= 2 ? 0.5 : speed + 0.5;
          setSpeed(newRate);
          AudioManager.setRate('1', newRate);
        }}
      />
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
