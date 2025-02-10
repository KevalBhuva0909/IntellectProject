import React, {memo} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../constants/Colors';
import {ICONS} from '../../assets/icons';
import {Fonts} from '../constants/Fonts';

interface CardItemProps {
  item: {
    id: string;
    title: string;
    subtitle: string;
    section: string;
  };
  onPress?: () => void; // Make onPress optional and add type
}

const CardItem: React.FC<CardItemProps> = ({item, onPress}) => (
  <View style={styles.card} testID="card">
    <Pressable
      style={styles.leftCard}
      onPress={onPress}
      testID="pressable-area">
      <View style={styles.cardImage}>
        <Image source={ICONS.Play} style={styles.icon} testID="play-icon" />
      </View>
    </Pressable>
    <View style={styles.rightCard}>
      <Text style={styles.cardTitle} testID="title">
        {item.title}
      </Text>
      <Text style={styles.cardSubtitle} testID="subtitle">
        {item.subtitle}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.LightRed,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  leftCard: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCard: {
    width: '80%',
  },
  cardImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.Green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {height: 12, width: 12, resizeMode: 'contain'},
  cardTitle: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold600,
    color: Colors.Black,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 10,
    fontFamily: Fonts.Regular400,
    color: Colors.Blue,
  },
});

export default memo(CardItem);
