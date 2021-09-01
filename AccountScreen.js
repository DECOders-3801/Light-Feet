import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';  // will use for functionality
import {Image} from 'react-native' ; 
import profile from './assets/images/profile.png'; 

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Header } from 'react-native/Libraries/NewAppScreen';


export default class AccountScreen extends Component {

    render() {
      
      return (
  
        <View style={styles.container}> 
            <View style={styles.head}>
                <Image source={profile} style={{ width: 120, height: 150 }} /> 
                <Text style={styles.heading}>First Name Last Name</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.contents}>Username</Text>
                <Text style={{color: 'grey', fontWeight: 'bold', marginBottom: 30}}>keston</Text>
                <Text style={styles.contents}>Email </Text>
                <Text style={{color: 'grey', fontWeight: 'bold', marginBottom: 30}}>keston</Text>
                <Text style={styles.contents}>First Name</Text>
                <Text style={{color: 'grey', fontWeight: 'bold', marginBottom: 30}}>keston</Text>
                <Text style={styles.contents}>Last Name</Text>
                <Text style={{color: 'grey', fontWeight: 'bold', marginBottom: 30}}>keston</Text>
            </View>
        </View>

      
  
      );
    }
  }


  const styles = StyleSheet.create({
  
    heading: {
      color: 'white',
      fontSize: 20,
      marginLeft: 20,
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      paddingTop: 50
    },

    head: {
        marginBottom: 60,
        fontWeight: 'bold',
        flexDirection:'row',
        justifyContent: 'center'
    },
    

    contents:{
        color: 'white',
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
  
    container: {
      flex: 1,
      paddingTop: 30,
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