import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors'; // Make sure this path is correct

interface ProgressBarProps {
  progress: number; // Progress value (0 - 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false, // Consider using true if possible for performance
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp', // Very important: Prevents values outside 0-100%
            }),
          },
        ]}
        accessible={true} // Add accessibility props
        accessibilityRole="progressbar"
        aria-valuenow={progress} // Set the current progress for screen readers
        aria-valuemin={0}
        aria-valuemax={100}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: Colors.White,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.Black,
  },
});

export default ProgressBar;
