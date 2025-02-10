import {
  render,
  screen,
  within,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import Daily from '../src/screens/Daily';
import {DATA} from '../src/utils/StaticData';
import React from 'react';
import CardItem from '../src/components/CardItem';
import GaugeProgressBar from '../src/components/GaugeProgress';
import ProgressBar from '../src/components/ProgressBar';
import SectionHeader from '../src/components/SectionHeader';

jest.mock('../src/components/CardItem.tsx', () => {
  return () => {
    // Factory function!
    const {View, Text, Image, Pressable} = require('react-native'); // Require inside
    const MockCardItem = ({item, onPress}: any) => (
      <View testID={`card-${item.id || 'mock'}`}>
        <Pressable testID="pressable-area" onPress={onPress}>
          <Image testID="play-icon" />
        </Pressable>
        <Text testID="title">{item.title}</Text>
        <Text testID="subtitle">{item.subtitle}</Text>
      </View>
    );
    return MockCardItem;
  };
});

jest.mock('../src/components/GaugeProgress.tsx', () => {
  return () => {
    return ({title, score, scoreChange}: any) => {
      const {View, Text} = require('react-native');
      return (
        <View>
          <Text testID="gauge-title">{title}</Text>
          <Text testID="gauge-score">{score}</Text>
          <Text testID="gauge-change">{scoreChange}</Text>
        </View>
      );
    };
  };
});

jest.mock('../src/components/ProgressBar.tsx', () => {
  return () => {
    const {View} = require('react-native');
    return ({progress}: any) => (
      <View testID="progress" style={{width: progress}} />
    );
  };
});

jest.mock('../src/components/SectionHeader.tsx', () => {
  return () => {
    const {View, Text, Image} = require('react-native');
    return ({section}: any) => (
      <View testID="section-header">
        <Text>{section}</Text>
        <Image testID="section-icon" />
      </View>
    );
  };
});

jest.mock('react-native-device-info', () => {
  return {
    hasDynamicIsland: jest.fn(),
    hasNotch: jest.fn(),
  };
});

describe('Daily Component', () => {
  it('renders correctly', async () => {
    render(<Daily />);

    expect(screen.getByTestId('header-container')).toBeTruthy();
    expect(screen.getByTestId('greeting-text')).toBeTruthy();
    expect(screen.getByTestId('reminder-button')).toBeTruthy();
    expect(screen.getByTestId('activity-list')).toBeTruthy();

    await waitFor(() => {
      DATA.forEach(item => {
        const cardContainer = screen.getByTestId(`card-${item.id}`);
        expect(within(cardContainer).getByTestId('title')).toBeTruthy();
        expect(within(cardContainer).getByTestId('subtitle')).toBeTruthy();
        expect(
          within(cardContainer).getByTestId('pressable-area'),
        ).toBeTruthy();
        expect(within(cardContainer).getByTestId('play-icon')).toBeTruthy();
      });
    });

    expect(screen.getByTestId('progress')).toBeTruthy();
    expect(screen.getByTestId('gauge-title')).toBeTruthy();
    expect(screen.getByTestId('section-header')).toBeTruthy();
    expect(screen.getByTestId('section-icon')).toBeTruthy();
  });
});

describe('CardItem Component (Directly)', () => {
  it('renders correctly', () => {
    const item = DATA;
    render(<CardItem item={item} />);

    expect(screen.getByTestId(`card-${item.id}`)).toBeTruthy();
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('subtitle')).toBeTruthy();
    expect(screen.getByTestId('pressable-area')).toBeTruthy();
    expect(screen.getByTestId('play-icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const item = DATA;
    const onPress = jest.fn();
    render(<CardItem item={item} onPress={onPress} />);

    const pressableArea = screen.getByTestId('pressable-area');
    fireEvent.press(pressableArea); // Use fireEvent.press

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('GaugeProgressBar Component (Directly)', () => {
  it('renders correctly', () => {
    render(<GaugeProgressBar title="Test" score={75} scoreChange={5} />);
    expect(screen.getByTestId('gauge-title')).toBeTruthy();
    expect(screen.getByTestId('gauge-score')).toBeTruthy();
    expect(screen.getByTestId('gauge-change')).toBeTruthy();
  });
});

describe('ProgressBar Component (Directly)', () => {
  it('renders correctly', () => {
    render(<ProgressBar progress={50} />);
    expect(screen.getByTestId('progress')).toBeTruthy();
  });
});

describe('SectionHeader Component (Directly)', () => {
  it('renders correctly', () => {
    render(<SectionHeader section="Morning" />);
    expect(screen.getByTestId('section-header')).toBeTruthy();
    expect(screen.getByTestId('section-icon')).toBeTruthy();
  });
});
