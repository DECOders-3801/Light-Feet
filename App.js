import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import JourneyScreen from './JourneyScreen';

// import React, { Component } from 'react';
// import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
// import * as SQLite from 'expo-sqlite';


// Manages screen stack
const navigator = createStackNavigator({
    Home: LoginScreen,
    Signup: SignupScreen,
    Journey: JourneyScreen
  }, {
    initialRouteName: "Home"
  //   defaultNavigationOptions: {
  //     title: "CO2"
  // }
});

export default createAppContainer(navigator);
