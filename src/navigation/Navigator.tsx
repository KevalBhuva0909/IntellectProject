import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';

// Import Screens
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import Care from '../screens/Care';
import Daily from '../screens/Daily';
import Profile from '../screens/Profile';
import { Colors } from '../constants/Colors';
import { ICONS } from '../../assets/icons';
import { Fonts } from '../constants/Fonts';

// Define Tab Navigator
const Tab = createBottomTabNavigator();

/**
 * Screen Options for Bottom Tab Navigation
 * @param route - Current screen route
 */
const screenOptions = ({ route }: { route: any }) => ({
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    let iconSource: any;

    // Assign icons based on route name
    switch (route.name) {
      case 'Home':
        iconSource = ICONS.Home;
        break;
      case 'Explore':
        iconSource = ICONS.Explore;
        break;
      case 'Care':
        iconSource = ICONS.Care;
        break;
      case 'Daily':
        iconSource = ICONS.Daily;
        break;
      case 'Profile':
        iconSource = ICONS.Profile;
        break;
      default:
        iconSource = null;
    }

    return (
      <Image
        source={iconSource}
        style={[
          styles.icon,
          { tintColor: focused ? Colors.White : Colors.Gray }, // Active & Inactive Colors
        ]}
        testID={`${route.name}-icon`} // Add testID here!
      />
    );
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: Fonts.Regular400,
  },
  tabBarActiveTintColor: Colors.White,
  tabBarInactiveTintColor: Colors.Gray,
  tabBarStyle: styles.tabBar,
  headerShown: false,
});

/**
 * Bottom Tab Navigation Component
 */
const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="Daily">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Care" component={Care} />
        <Tab.Screen name="Daily" component={Daily} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;

/** Styles */
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  tabBar: {
    backgroundColor: Colors.DarkBlue,
    paddingBottom: 5,
    paddingTop: 5,
    height: 90,
  },
});

