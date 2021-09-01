import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

// import React, { Component } from 'react';
// import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
// import * as SQLite from 'expo-sqlite';


// Manages screen stack
const navigator = createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
  }, {
    initialRouteName: "Login"
  //   defaultNavigationOptions: {
  //     title: "CO2"
  // }
});

export default createAppContainer(navigator);
