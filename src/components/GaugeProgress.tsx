import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Strings } from '../constants/Strings';

interface GaugeProgressBarProps {
  title: string;
  score: number;
  scoreChange: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
}

interface Styles {
  container: ViewStyle;
  textContainer: ViewStyle;
  score: TextStyle;
  change: TextStyle;
  title: TextStyle;
  outOfText: TextStyle;
}

const GaugeProgressBar: React.FC<GaugeProgressBarProps> = ({
  title,
  score,
  scoreChange,
  maxScore = 100,
  size = 70,
  strokeWidth = 6,
}) => {
  const getColor = () => {
    if (score < 45) {
      return Colors.Pink;
    } else if (score <= 70) { // Simplified condition
      return Colors.Yellow;
    } else {
      return Colors.Green;
    }
  };


  return (
    <View style={styles.container}>
      <View
        accessibilityRole="progressbar"
        aria-label={`${title}: ${score} out of ${maxScore}`}
      >
        <AnimatedCircularProgress
          size={size}
          width={strokeWidth}
          fill={maxScore === 0 ? 0 : (score / maxScore) * 100}
          tintColor={getColor()}
          backgroundColor="#ddd"
          rotation={-125}
          arcSweepAngle={250}
          lineCap="round"
        >
          {() => (
            <View style={styles.textContainer}>
              <Text style={styles.score}>{score}</Text>
              <Text
                style={[
                  styles.change,
                  { color: scoreChange >= 0 ? Colors.Green : Colors.Pink },
                ]}
              >
                {scoreChange >= 0 ? `+${scoreChange}` : `${scoreChange}`}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <Text style={styles.outOfText}>{`${score} ${Strings.outOf} ${maxScore}`}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default GaugeProgressBar;

const styles: Styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    score: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.Black,
      fontFamily: Fonts.SemiBold600,
    },
    change: {
      fontSize: 12,
      marginTop: 4,
      fontFamily: Fonts.SemiBold600,
    },
    title: {
      fontSize: 12,
      color: Colors.Black,
      fontFamily: Fonts.SemiBold600,
      width: '60%',
      textAlign: 'center',
    },
    outOfText: {
      fontSize: 12,
      color: Colors.Gray,
      fontFamily: Fonts.Bold700,
      paddingVertical: 5,
    },
  });
