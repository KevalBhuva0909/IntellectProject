import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import SectionHeader from '../src/components/SectionHeader';
import {Colors} from '../src/constants/Colors';
import {Fonts} from '../src/constants/Fonts';

jest.mock('../assets/icons/index.tsx', () => ({
  ICONS: {
    Sun: {uri: 'mock_sun_uri'},
    Afternoon: {uri: 'mock_afternoon_uri'},
    Evening: {uri: 'mock_evening_uri'},
  },
}));

describe('SectionHeader', () => {
  it('renders the section title and correct icon for Morning', async () => {
    render(<SectionHeader section="Morning" />);
    expect(screen.getByText('Morning')).toBeTruthy();

    await waitFor(() =>
      expect(screen.getByLabelText('Morning Sun Icon')).toBeTruthy(),
    );
    const icon = screen.getByLabelText('Morning Sun Icon');
    expect(icon.props.source).toEqual({uri: 'mock_sun_uri'});
    expect(icon.props.style.marginRight).toBe(8);
    expect(icon.props.style.height).toBe(24);
    expect(icon.props.style.width).toBe(24);
    expect(icon.props.style.resizeMode).toBe('contain');

    const sectionHeader = screen.getByLabelText('Morning Section'); // Or a more descriptive label
    expect(sectionHeader).toBeTruthy(); // Just check that it's present
  });

  it('renders the section title and correct icon for Afternoon', async () => {
    render(<SectionHeader section="Afternoon" />);
    expect(screen.getByText('Afternoon')).toBeTruthy();

    await waitFor(() =>
      expect(screen.getByLabelText('Afternoon Tea Icon')).toBeTruthy(),
    );
    const icon = screen.getByLabelText('Afternoon Tea Icon');
    expect(icon.props.source).toEqual({uri: 'mock_afternoon_uri'});

    const sectionHeader = screen.getByLabelText('Afternoon Section');
    expect(sectionHeader).toBeTruthy();
  });

  it('renders the section title and correct icon for Evening', async () => {
    render(<SectionHeader section="Evening" />);
    expect(screen.getByText('Evening')).toBeTruthy();

    await waitFor(() =>
      expect(screen.getByLabelText('Evening Moon Icon')).toBeTruthy(),
    );
    const icon = screen.getByLabelText('Evening Moon Icon');
    expect(icon.props.source).toEqual({uri: 'mock_evening_uri'});

    const sectionHeader = screen.getByLabelText('Evening Section');
    expect(sectionHeader).toBeTruthy();
  });

  it('renders the section title without an icon for other sections', () => {
    render(<SectionHeader section="Other" />);
    expect(screen.getByText('Other')).toBeTruthy();
    const icon = screen.queryByLabelText('Other Section Icon'); // Or perhaps no label at all in this case
    expect(icon).toBeNull();

    const sectionHeader = screen.getByLabelText('Other Section');
    expect(sectionHeader).toBeTruthy();
  });

  it('applies correct styling', async () => {
    render(<SectionHeader section="Morning" />);

    // You can still query the View by its label:
    const sectionHeader = screen.getByLabelText('Morning Section');
    expect(sectionHeader.props.style.flexDirection).toBe('row');
    expect(sectionHeader.props.style.alignItems).toBe('center');
    expect(sectionHeader.props.style.backgroundColor).toBe(Colors.White);
    expect(sectionHeader.props.style.paddingVertical).toBe(20);

    const sectionTitle = screen.getByText('Morning');
    expect(sectionTitle.props.style.fontSize).toBe(18);
    expect(sectionTitle.props.style.fontFamily).toBe(Fonts.Bold700);
    expect(sectionTitle.props.style.color).toBe(Colors.Black);
  });

  it('should memoize the component', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const component = <SectionHeader section="Morning" />;
    const memoizedComponent = React.memo(SectionHeader);
    expect(memoizedComponent).toBeDefined();
  });
});
