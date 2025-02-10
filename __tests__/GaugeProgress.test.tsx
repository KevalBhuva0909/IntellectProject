import React from 'react';
import {render, screen} from '@testing-library/react-native';
import GaugeProgressBar from '../src/components/GaugeProgress';
import {Colors} from '../src/constants/Colors';

// Mock Constants
jest.mock(
  '../src/constants/Colors.ts',
  () => ({
    Blue: '#2e4759',
    White: '#ffffff',
    Black: '#000000',
    Red: '#e9e1e0',
    LightRed: '#eaeaea',
    Green: '#61b97e',
    Pink: '#d8666f',
    Yellow: '#f2be70',
    DarkBlue: '#121927',
    Gray: '#c5c6c7',
  }),
  {virtual: true},
);

jest.mock(
  '../src/constants/Fonts.ts',
  () => ({
    ExtraLight200: 'Mulish-ExtraLight',
    Light300: 'Mulish-Light',
    Regular400: 'Mulish-Regular',
    Medium500: 'Mulish-Medium',
    SemiBold600: 'Mulish-SemiBold',
    Bold700: 'Mulish-Bold',
    ExtraBold800: 'Mulish-ExtraBold',
    Black900: 'Mulish-Black',
  }),
  {virtual: true},
);

jest.mock(
  '../src/constants/Strings.ts',
  () => ({
    tryThoseActivity:
      'Try those activities daily to see long term improvements in your mental-health & productivity',
    setReminder: 'Set Reminder',
    finishExercises: 'Finish 3+ exercises today to stay calm and focused',
    peopleDoing: '2615 people doing sessions with you this hour',
    home: 'HOME',
    explore: 'EXPLORE',
    care: 'CARE',
    daily: 'DAILY',
    profile: 'PROFILE',
    yourAreas: 'Your areas of growth are:',
    mentalWellbeing: 'Mental Wellbeing',
    workLife: 'Work-Life Balance',
    selfEfficacy: 'Self Efficacy',
    outOf: 'out of',
  }),
  {virtual: true},
);

// Mock AnimatedCircularProgress
jest.mock('react-native-circular-progress', () => {
  const {View} = require('react-native');

  const MockAnimatedCircularProgress = ({children, style, ...props}: any) => (
    <View {...props} style={style} testID="circular-progress">
      {children}
    </View>
  );
  return {
    AnimatedCircularProgress: MockAnimatedCircularProgress,
  };
});

describe('GaugeProgressBar Component', () => {
  it('renders correctly with default props', () => {
    render(<GaugeProgressBar title="Test Gauge" score={75} scoreChange={5} />);
    expect(screen.getByText('Test Gauge')).toBeTruthy();
    expect(screen.getByText('75')).toBeTruthy();
    expect(screen.getByText('+5')).toBeTruthy();
    expect(screen.getByText('75 out of 100')).toBeTruthy();
  });

  it('renders correctly with custom props', () => {
    render(
      <GaugeProgressBar
        title="Custom Gauge"
        score={30}
        scoreChange={-2}
        maxScore={200}
        size={100}
        strokeWidth={10}
      />,
    );
    expect(screen.getByText('Custom Gauge')).toBeTruthy();
    expect(screen.getByText('30')).toBeTruthy();
    expect(screen.getByText('-2')).toBeTruthy();
    expect(screen.getByText('30 out of 200')).toBeTruthy();
  });

  it('displays the correct score and change', () => {
    render(<GaugeProgressBar title="Test Gauge" score={60} scoreChange={-3} />);
    expect(screen.getByText('60')).toBeTruthy();
    expect(screen.getByText('-3')).toBeTruthy();
  });

  it('displays the correct title', () => {
    render(
      <GaugeProgressBar title="Test Gauge Title" score={70} scoreChange={2} />,
    );
    expect(screen.getByText('Test Gauge Title')).toBeTruthy();
  });

  it('displays the correct out of text', () => {
    render(
      <GaugeProgressBar
        title="Test Gauge Title"
        score={70}
        scoreChange={2}
        maxScore={150}
      />,
    );
    expect(screen.getByText('70 out of 150')).toBeTruthy();
  });

  it('applies the correct color based on score', () => {
    render(<GaugeProgressBar title="Test" score={80} scoreChange={1} />);
    const progress = screen.getByTestId('circular-progress');
    expect(progress.props.tintColor).toBe(Colors.Green);

    render(<GaugeProgressBar title="Test" score={50} scoreChange={1} />);
    const progress2 = screen.getByTestId('circular-progress');
    expect(progress2.props.tintColor).toBe(Colors.Yellow);

    render(<GaugeProgressBar title="Test" score={20} scoreChange={1} />);
    const progress3 = screen.getByTestId('circular-progress');
    expect(progress3.props.tintColor).toBe(Colors.Pink);
  });

  it('applies the correct color based on score change', () => {
    render(<GaugeProgressBar title="Test" score={80} scoreChange={5} />);
    const changeText = screen.getByText('+5');
    expect(changeText.props.style).toBeDefined();
    expect(changeText.props.style.color).toBe(Colors.Green);

    render(<GaugeProgressBar title="Test" score={50} scoreChange={-5} />);
    const changeText2 = screen.getByText('-5');
    expect(changeText2.props.style).toBeDefined();
    expect(changeText2.props.style.color).toBe(Colors.Pink);
  });

  it('handles zero score correctly', () => {
    render(<GaugeProgressBar title="Test Gauge" score={0} scoreChange={0} />);
    expect(screen.getByText('0')).toBeTruthy();
    const progress = screen.getByTestId('circular-progress');
    expect(progress.props.fill).toBe(0);
  });

  it('handles maximum score correctly', () => {
    render(<GaugeProgressBar title="Test Gauge" score={100} scoreChange={0} />);
    expect(screen.getByText('100')).toBeTruthy();
    const progress = screen.getByTestId('circular-progress');
    expect(progress.props.fill).toBe(100);
  });

  it('handles score greater than maxScore correctly', () => {
    render(
      <GaugeProgressBar
        title="Test Gauge"
        score={150}
        scoreChange={0}
        maxScore={100}
      />,
    );
    expect(screen.getByText('150')).toBeTruthy();
    const progress = screen.getByTestId('circular-progress');
    expect(progress.props.fill).toBe(150);
  });
});
