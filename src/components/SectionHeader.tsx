import React, {memo} from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {ICONS} from '../../assets/icons';
import {Colors} from '../constants/Colors';
import {Fonts} from '../constants/Fonts';

interface SectionHeaderProps {
  section: string;
}

const getSectionIcon = (section: string) => {
  switch (section) {
    case 'Morning':
      return <Image source={ICONS.Sun as ImageSourcePropType} style={styles.icon} accessibilityLabel="Morning Sun Icon" role="img"/>; // Type assertion
    case 'Afternoon':
      return <Image source={ICONS.Afternoon as ImageSourcePropType} style={styles.icon} accessibilityLabel="Afternoon Tea Icon" role="img"/>; // Type assertion
    case 'Evening':
      return <Image source={ICONS.Evening as ImageSourcePropType} style={styles.icon} accessibilityLabel="Evening Moon Icon" role="img"/>; // Type assertion
    default:
      return null;
  }
};

const SectionHeader: React.FC<SectionHeaderProps> = ({section}) => (
  <View style={styles.sectionHeader} role="row">
    {getSectionIcon(section)}
    <Text style={styles.sectionTitle}>{section}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.Bold700,
    color: Colors.Black,
  },
  icon: {
    marginRight: 8,
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});

export default memo(SectionHeader);
