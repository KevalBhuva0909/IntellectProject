import { StyleSheet, View } from 'react-native';
import React from 'react';
import Navigator from './src/navigation/Navigator';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
