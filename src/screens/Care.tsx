import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { Colors } from '../constants/Colors';

/**
 * Care Screen Component
 * @returns JSX.Element
 */
const Care: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Care</Text>
    </View>
  );
};

export default Care;

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
