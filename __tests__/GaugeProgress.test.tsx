import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GaugeProgressBar from '../src/components/GaugeProgress';
import { Colors } from '../src/constants/Colors';
import { Strings } from '../src/constants/Strings';
import { View } from 'react-native';

jest.mock('../src/constants/Colors', () => ({
  Green: 'green',
  Yellow: 'yellow',
  Pink: 'pink',
  Black: 'black',
  Gray: 'gray',
}));

jest.mock('../src/constants/Fonts', () => ({
  SemiBold600: 'SemiBold600',
  Bold700: 'Bold700',
}));

jest.mock('../src/constants/Strings', () => ({
  outOf: 'out of',
}));

jest.mock('react-native-circular-progress', () => {
    return {
      AnimatedCircularProgress: ({ children, ...props }: any) => (
        <View {...props} testID="circular-progress">
          {children}
        </View>
      ),
    };
  });

describe('GaugeProgressBar Component', () => {
  it('renders correctly with default props', () => {
    render(<GaugeProgressBar title="Test Gauge" score={75} scoreChange={5} />);
    expect(screen.getByText('Test Gauge')).toBeTruthy();
    expect(screen.getByText('75')).toBeTruthy();
    expect(screen.getByText('+5')).toBeTruthy();
    expect(screen.getByText(`75 ${Strings.outOf} 100`)).toBeTruthy();
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
    expect(screen.getByText(`30 ${Strings.outOf} 200`)).toBeTruthy();
  });

  it('displays the correct score and change', () => {
    render(<GaugeProgressBar title="Test Gauge" score={60} scoreChange={-3} />);
    expect(screen.getByText('60')).toBeTruthy();
    expect(screen.getByText('-3')).toBeTruthy();
  });

  it('displays the correct title', () => {
    render(<GaugeProgressBar title="Test Gauge Title" score={70} scoreChange={2} />);
    expect(screen.getByText('Test Gauge Title')).toBeTruthy();
  });

  it('displays the correct out of text', () => {
    render(<GaugeProgressBar title="Test Gauge Title" score={70} scoreChange={2} maxScore={150} />);
    expect(screen.getByText(`70 ${Strings.outOf} 150`)).toBeTruthy();
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
    expect(screen.getByText('+5').props.style.color).toBe(Colors.Green);

    render(<GaugeProgressBar title="Test" score={50} scoreChange={-5} />);
    expect(screen.getByText('-5').props.style.color).toBe(Colors.Pink);
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
    render(<GaugeProgressBar title="Test Gauge" score={150} scoreChange={0} maxScore={100} />);
    expect(screen.getByText('150')).toBeTruthy();
    const progress = screen.getByTestId('circular-progress');
    expect(progress.props.fill).toBe(150); // Or handle as you see fit
  });
});
