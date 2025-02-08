import { render, screen, within, waitFor } from '@testing-library/react-native';
import Daily from '../src/screens/Daily';
import { DATA } from '../src/utils/StaticData';
import React from 'react';
import CardItem from '../src/components/CardItem';
import GaugeProgressBar from '../src/components/GaugeProgress';
import ProgressBar from '../src/components/ProgressBar';
import SectionHeader from '../src/components/SectionHeader';

jest.mock('../src/components/CardItem.tsx', () => { // Mock CardItem
  return ({ item }: any) => {
    return `<View testID="card-${item.id}"><Text testID="title">${item.title}</Text><Text testID="subtitle">${item.subtitle}</Text><Pressable testID="pressable-area" onPress={onPress}><Image testID="play-icon" /></Pressable></View>`;
  };
});

jest.mock('../src/components/GaugeProgress.tsx', () => { // Mock GaugeProgressBar
  return ({ title, score, scoreChange }: any) => {
    return `<View><Text testID="gauge-title">${title}</Text><Text testID="gauge-score">${score}</Text><Text testID="gauge-change">${scoreChange}</Text></View>`;
  };
});

jest.mock('../src/components/ProgressBar.tsx', () => { // Mock ProgressBar
  return ({ progress }: any) => `<View testID="progress" progress=${progress} />`;
});

jest.mock('../src/components/SectionHeader.tsx', () => { // Mock SectionHeader
  return ({ section }: any) => `<View testID="section-header"><Text>${section}</Text><Image testID="section-icon" /></View>`;
});

jest.mock('react-native-device-info', () => {
  return {
    hasDynamicIsland: jest.fn(), // Mock the functions you use
    hasNotch: jest.fn(),
  };
});

describe('Daily Component', () => {
  it('renders correctly', async () => {
    render(<Daily />);

    // Header
    expect(screen.getByTestId('header-container')).toBeTruthy();
    expect(screen.getByTestId('greeting-text')).toBeTruthy();
    expect(screen.getByTestId('reminder-button')).toBeTruthy();

    // Activity List
    expect(screen.getByTestId('activity-list')).toBeTruthy();

    await waitFor(() => {
      DATA.forEach(item => {
        const cardContainer = screen.getByTestId(`card-${item.id}`);
        expect(within(cardContainer).getByTestId('title')).toBeTruthy();
        expect(within(cardContainer).getByTestId('subtitle')).toBeTruthy();
        expect(within(cardContainer).getByTestId('pressable-area')).toBeTruthy();
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
    const item = DATA[0];
    render(<CardItem item={item} />);

    expect(screen.getByTestId('card')).toBeTruthy();
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('subtitle')).toBeTruthy();
    expect(screen.getByTestId('pressable-area')).toBeTruthy();
    expect(screen.getByTestId('play-icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const item = DATA[0];
    const onPress = jest.fn();
    render(<CardItem item={item} onPress={onPress} />);

    const pressableArea = screen.getByTestId('pressable-area');
    pressableArea.props.onPress();

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

