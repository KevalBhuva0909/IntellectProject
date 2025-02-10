import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GetGreeting} from '../utils/Functions';
import {IMAGES} from '../../assets/images';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';
import {Colors} from '../constants/Colors';
import {Fonts} from '../constants/Fonts';
import {Strings} from '../constants/Strings';
import {ICONS} from '../../assets/icons';
import ProgressBar from '../components/ProgressBar';
import GaugeProgressBar from '../components/GaugeProgress';
import {DATA} from '../utils/StaticData';
import SectionHeader from '../components/SectionHeader';
import CardItem from '../components/CardItem';

/**
 * Interface for card items displayed in the FlatList.
 */
interface CardItemProps {
  id: string;
  title: string;
  subtitle: string;
  section: string;
}

/**
 * Daily Component - Displays user progress, sections, and activity recommendations.
 */
const Daily: React.FC = () => {
  const [progress, setProgress] = useState<number>(10);

  /**
   * Increases progress bar value, ensuring it does not exceed 100.
   */
  const increaseProgress = () => {
    setProgress(prev => (prev < 100 ? prev + 10 : 100));
  };

  /**
   * Renders each item in the FlatList while adding section headers when needed.
   * @param item - CardItemProps object containing id, title, subtitle, and section.
   * @param index - Position of the item in the list.
   */
  const renderItem = useCallback(
    ({item, index}: {item: CardItemProps; index: number}) => {
      const showHeader =
        index === 0 || DATA[index - 1]?.section !== item.section;
      return (
        <View>
          {showHeader && <SectionHeader section={item.section} />}
          <CardItem item={item} /> {/* This line was the problem */}
        </View>
      );
    },
    [],
  );

  /**
   * Extracts unique key for each FlatList item.
   * @param item - CardItemProps object.
   */
  const keyExtractor = useCallback((item: CardItemProps) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer} testID="header-container">
        {' '}
        {/* Added testID */}
        <View style={styles.innerHeader}>
          <Text style={styles.titleText} testID="greeting-text">
            {GetGreeting()}
          </Text>{' '}
          {/* Added testID */}
          <Text style={styles.subTitleText}>{Strings.tryThoseActivity}</Text>
          <Pressable
            style={styles.btnStyle}
            onPress={increaseProgress}
            testID="reminder-button">
            {' '}
            {/* Added testID */}
            <Image source={ICONS.Notify} style={styles.iconStyle} />
            <Text style={styles.btnText}>{Strings.setReminder}</Text>
          </Pressable>
        </View>
        <Image source={IMAGES.Care} style={styles.image} />
      </View>

      {/* Content Section */}
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* Progress Section */}
        <View style={styles.middleContainer}>
          <Text style={styles.middleTitle}>{Strings.finishExercises}</Text>
          <ProgressBar progress={progress} />
          <View style={styles.innerMiddle}>
            <Image source={ICONS.Fire} style={styles.iconStyle} />
            <Text style={[styles.middleTitle, {paddingLeft: 5}]}>
              {Strings.peopleDoing}
            </Text>
          </View>
        </View>

        {/* Gauge Progress Section */}
        <View style={styles.gaugeCard}>
          <Text style={styles.gaugeCardTitle}>{Strings.yourAreas}</Text>
          <View style={styles.gaugeView}>
            <GaugeProgressBar
              title={Strings.mentalWellbeing}
              score={30}
              scoreChange={7}
              maxScore={100}
            />
            <GaugeProgressBar
              title={Strings.workLife}
              score={57}
              scoreChange={-10}
              maxScore={100}
            />
            <GaugeProgressBar
              title={Strings.selfEfficacy}
              score={90}
              scoreChange={8}
              maxScore={100}
            />
          </View>
        </View>

        {/* Activity List */}
        <FlatList
          data={DATA}
          keyExtractor={keyExtractor}
          renderItem={renderItem} // Use the renderItem function
          contentContainerStyle={{padding: 15}}
          initialNumToRender={4}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={true}
          testID="activity-list"
        />

        {/* Quote Section */}
        <View style={styles.quotesView}>
          <Text style={styles.quotesText}>
            {
              '"I advise all of my clients to develop a consistent daily routine which includes mindfulness exercises" \n- Linda Rinn, Clinical Psychologist'
            }
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Daily;
/**
 * Styles for the Daily component.
 */
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.White},
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  headerContainer: {
    paddingTop: hasDynamicIsland() ? 60 : hasNotch() ? 50 : 30,
    backgroundColor: Colors.Blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleText: {
    fontSize: 20,
    color: Colors.White,
    fontFamily: Fonts.SemiBold600,
  },
  innerHeader: {
    paddingHorizontal: 15,
    width: '60%',
    paddingBottom: 20,
  },
  subTitleText: {
    fontSize: 14,
    color: Colors.White,
    fontFamily: Fonts.Regular400,
    paddingVertical: 10,
  },
  iconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  btnText: {
    fontSize: 14,
    color: Colors.White,
    fontFamily: Fonts.Bold700,
    paddingLeft: 8,
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.White,
    paddingVertical: 10,
    marginTop: 5,
    width: '80%',
  },
  middleContainer: {
    backgroundColor: Colors.Red,
    padding: 15,
    width: '100%',
  },
  middleTitle: {
    fontSize: 14,
    color: Colors.Black,
    fontFamily: Fonts.Regular400,
  },
  innerMiddle: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  gaugeCard: {
    margin: 15,
    borderWidth: 1,
    borderColor: Colors.Black,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
  },
  gaugeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  gaugeCardTitle: {
    fontSize: 14,
    color: Colors.Black,
    fontFamily: Fonts.Bold700,
    paddingVertical: 10,
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  quotesView: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  quotesText: {
    fontSize: 12,
    color: Colors.Black,
    fontFamily: Fonts.Regular400,
    textAlign: 'center',
    width: '60%',
  },
});
