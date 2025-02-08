import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { Colors } from '../constants/Colors';

/**
 * Explore Screen Component
 * @returns JSX.Element
 */
const Explore: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
    </View>
  );
};

export default Explore;

/** Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.Bold700,
    fontSize: 18,
    color: Colors.Black,
  },
});
