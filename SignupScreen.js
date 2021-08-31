import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';  // will use for functionality

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Header } from 'react-native/Libraries/NewAppScreen';


export default class SignupScreen extends Component {

    render() {
      
      return (
  
        <View style={styles.container}> 
        <Text style={styles.heading}>CO2 Visualiser</Text>
        <Button
          title={'Login'}
          style={styles.input}
        />
      </View>
  
      );
    }
  }


  const styles = StyleSheet.create({
  
    heading: {
      color: 'white',
      marginBottom: 100,
      fontSize: 40,
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
    },
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
  
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      marginBottom: 10,
    },
  
  });