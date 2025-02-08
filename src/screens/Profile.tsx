import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { Colors } from '../constants/Colors';

/**
 * Profile Screen Component
 * @returns JSX.Element
 */
const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
};

export default Profile;

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
