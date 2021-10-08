import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'  // might use

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import JourneyScreen from './JourneyScreen';
import AccountScreen from './AccountScreen';
import JourneyRecorder from './JourneyRecorder';

// import React, { Component } from 'react';
// import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
// import * as SQLite from 'expo-sqlite';


// Manages screen stack
const navigator = createStackNavigator({
    // Renamed Login to Home, as LoginScreen includes the Welcome back page
    Home: LoginScreen,
    Signup: SignupScreen,
    Journey: JourneyScreen,
    Account: AccountScreen,
    JourneyRecorder: JourneyRecorder,
  }, {
    initialRouteName: 'Home',

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#24BA83',
      },
      
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default createAppContainer(navigator);