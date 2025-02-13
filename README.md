# React Native Nitro Audio

Play audio files in React Native

## Installation

```sh
npm install react-native-nitro-audio react-native-nitro-modules
```

> `react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).


## Usage

```js
import AudioManager from 'react-native-nitro-audio';

// ...

AudioManager.createPlayer(
  '1',
  'https://samplelib.com/lib/preview/mp3/sample-6s.mp3'
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
