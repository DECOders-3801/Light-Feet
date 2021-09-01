import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'  // might use

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import JourneyScreen from './JourneyScreen';

// import React, { Component } from 'react';
// import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
// import * as SQLite from 'expo-sqlite';


// Manages screen stack
const navigator = createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen,
    Journey: JourneyScreen
  }, {
    initialRouteName: 'Login',

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
