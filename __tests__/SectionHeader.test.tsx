import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SectionHeader from '../src/components/SectionHeader';
import { Colors } from '../src/constants/Colors';
import { Fonts } from '../src/constants/Fonts';

jest.mock('../assets/icons/index.tsx', () => ({  // Correct mock structure
  ICONS: {
    Sun: { uri: 'mock_sun_uri' },
    Afternoon: { uri: 'mock_afternoon_uri' },
    Evening: { uri: 'mock_evening_uri' },
  },
}));

describe('SectionHeader', () => {
  it('renders the section title and correct icon for Morning', async () => {
    render(<SectionHeader section="Morning" />);
    expect(screen.getByText('Morning')).toBeTruthy();


    const icon = await screen.findByRole('img'); // Use findByRole and await
    expect(icon.props.source).toEqual({ uri: 'mock_sun_uri' });
    expect(icon.props.style.marginRight).toBe(8);
    expect(icon.props.style.height).toBe(24);
    expect(icon.props.style.width).toBe(24);
    expect(icon.props.style.resizeMode).toBe('contain');
  });

  it('renders the section title and correct icon for Afternoon', async () => {
    render(<SectionHeader section="Afternoon" />);
    expect(screen.getByText('Afternoon')).toBeTruthy();

    const icon = await screen.findByRole('img');
    expect(icon.props.source).toEqual({ uri: 'mock_afternoon_uri' });
  });

  it('renders the section title and correct icon for Evening', async () => {
    render(<SectionHeader section="Evening" />);
    expect(screen.getByText('Evening')).toBeTruthy();

    const icon = await screen.findByRole('img');
    expect(icon.props.source).toEqual({ uri: 'mock_evening_uri' });
  });

  it('renders the section title without an icon for other sections', () => {
    render(<SectionHeader section="Other" />);
    expect(screen.getByText('Other')).toBeTruthy();
    const icon = screen.queryByRole('img'); // queryByRole, not getByRole
    expect(icon).toBeNull();
  });

  it('applies correct styling', async () => { // Make async if using findByRole inside
    render(<SectionHeader section="Morning" />);

    const sectionHeader = await screen.findByRole('row'); // Use findByRole and await if needed
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
    const memoizedComponent = React.memo(SectionHeader); // Use React.memo
    expect(memoizedComponent).toBeDefined();
  });
});
