import React from 'react';
import { render, screen } from '@testing-library/react-native';
import BottomTabs from '../src/navigation/Navigator';

// Mock ALL screens with the ABSOLUTE minimum:
jest.mock('../src/screens/Home', () => {
  return () => { // Return a function from jest.mock
    const { View, Text } = require('react-native'); // Import inside the factory
    return <View><Text>Home</Text></View>;
  };
});

jest.mock('../src/screens/Explore', () => {
  return () => {
    const { View, Text } = require('react-native');
    return <View><Text>Explore</Text></View>;
  };
});

jest.mock('../src/screens/Care', () => {
  return () => {
    const { View, Text } = require('react-native');
    return <View><Text>Care</Text></View>;
  };
});

jest.mock('../src/screens/Daily', () => {
  return () => {
    const { View, Text } = require('react-native');
    return <View><Text>Daily</Text></View>;
  };
});

jest.mock('../src/screens/Profile', () => {
  return () => {
    const { View, Text } = require('react-native');
    return <View><Text>Profile</Text></View>;
  };
});

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(() => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ component }: any) => <>{component()}</>, // Super simple Screen mock
  })),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }: any) => <>{children}</>,
}));

jest.mock('react-native-device-info', () => ({
  hasDynamicIsland: jest.fn(),
  hasNotch: jest.fn(),
}));

jest.mock('../assets/icons/index.tsx', () => ({  // Mock ICONS
  Home: {},
  Explore: {},
  Care: {},
  Daily: {},
  Profile: {},
}));

describe('BottomTabs Component', () => {
  it('renders without crashing', () => {
    render(<BottomTabs />);
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('renders Home screen', () => {
    jest.mock('../src/screens/Home', () => { // Mock ONLY Home
      return () => {
        const { View, Text } = require('react-native');
        return <View><Text>Home</Text></View>;
      };
    });
    render(<BottomTabs />);
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('renders Explore screen', () => {
    jest.mock('../src/screens/Explore', () => { // Mock ONLY Explore
        return () => {
          const { View, Text } = require('react-native');
          return <View><Text>Explore</Text></View>;
        };
      });
    render(<BottomTabs />);
    expect(screen.getByText('Explore')).toBeTruthy();
  });

  // Repeat this pattern for Care, Daily, and Profile screens.
  it('renders Care screen', () => {
    jest.mock('../src/screens/Care', () => {
        return () => {
          const { View, Text } = require('react-native');
          return <View><Text>Care</Text></View>;
        };
      });
    render(<BottomTabs />);
    expect(screen.getByText('Care')).toBeTruthy();
  });
  it('renders Daily screen', () => {
    jest.mock('../src/screens/Daily', () => {
        return () => {
          const { View, Text } = require('react-native');
          return <View><Text>Daily</Text></View>;
        };
      });
    render(<BottomTabs />);
    expect(screen.getByText('Daily')).toBeTruthy();
  });
  it('renders Profile screen', () => {
    jest.mock('../src/screens/Profile', () => {
        return () => {
          const { View, Text } = require('react-native');
          return <View><Text>Profile</Text></View>;
        };
      });
    render(<BottomTabs />);
    expect(screen.getByText('Profile')).toBeTruthy();
  });

});
