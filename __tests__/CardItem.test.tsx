import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import CardItem from '../src/components/CardItem';
import {Colors} from '../src/constants/Colors';
import {Fonts} from '../src/constants/Fonts';

export const mockItem = {
  id: '1',
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  section: 'Test Section',
};

describe('CardItem Component', () => {
  it('renders correctly with provided props', () => {
    render(<CardItem item={mockItem} />);

    expect(screen.getByTestId('title')).toHaveTextContent(mockItem.title);
    expect(screen.getByTestId('subtitle')).toHaveTextContent(mockItem.subtitle);
    expect(screen.getByTestId('play-icon')).toBeTruthy();

    const card = screen.getByTestId('card');
    expect(card).toHaveStyle({backgroundColor: Colors.LightRed});
  });

  it('calls onPress when the card is pressed', () => {
    const onPress = jest.fn();

    render(<CardItem item={mockItem} onPress={onPress} />);

    const pressableArea = screen.getByTestId('pressable-area');
    fireEvent.press(pressableArea);

    expect(onPress).toHaveBeenCalled();
  });

  it('applies correct styles', () => {
    render(<CardItem item={mockItem} />);

    const title = screen.getByTestId('title');
    const subtitle = screen.getByTestId('subtitle');

    expect(title).toHaveStyle({
      fontSize: 12,
      fontFamily: Fonts.SemiBold600,
      color: Colors.Black,
    });

    expect(subtitle).toHaveStyle({
      fontSize: 10,
      fontFamily: Fonts.Regular400,
      color: Colors.Blue,
    });
  });

  it('renders different data correctly', () => {
    const anotherMockItem = {
      id: '2',
      title: 'Another Title',
      subtitle: 'Another Subtitle',
      section: 'Another Section',
    };

    render(<CardItem item={anotherMockItem} />);

    expect(screen.getByTestId('title')).toHaveTextContent(
      anotherMockItem.title,
    );
    expect(screen.getByTestId('subtitle')).toHaveTextContent(
      anotherMockItem.subtitle,
    );
  });

  it('should memoize the component', () => {
    let currentItem = {...mockItem};
    const {rerender} = render(<CardItem item={currentItem} />);

    const sameItem = {...currentItem};
    rerender(<CardItem item={sameItem} />);
    expect(screen.getByTestId('title')).toHaveTextContent(mockItem.title);

    currentItem = {...currentItem, title: 'Updated Title'};
    rerender(<CardItem item={currentItem} />);
    expect(screen.getByTestId('title')).toHaveTextContent('Updated Title');
  });

  it('renders the pressable area', () => {
    render(<CardItem item={mockItem} />);
    expect(screen.getByTestId('pressable-area')).toBeTruthy();
  });

  it('renders the image with the correct source', () => {
    render(<CardItem item={mockItem} />);
    const playIcon = screen.getByTestId('play-icon');
    expect(playIcon.props.source.uri).toBe('test-file-stub');
  });
});
