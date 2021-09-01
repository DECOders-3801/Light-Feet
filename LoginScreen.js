import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Image} from 'react-native' ; 
import logo from './assets/images/icon.png'; 

// import SignupScreen from './SignupScreen';

// import { NavigationContainer } from '@react-navigation/native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { Header } from 'react-native/Libraries/NewAppScreen';


export default class LoginScreen extends Component {
    constructor(props) {
      super(props);  // this.props is used for navigation.navigate
      
      this.state = {
        username: '',
        password: '',
        authenticated: false  // checks if logged in or not
      };
      
      this.db = SQLite.openDatabase('MainDB.db');
  
      // SQL - make table
      // UID is annoying to use (but having USERNAME as primary key is not good either...)
      this.db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users "+
          "(UID INTEGER PRIMARY KEY, " +
          "Username TEXT, " +
          "Password TEXT, " +
          "FName TEXT, " +
          "LName TEXT, " +
          "TotalCO2 INTEGER, " +
          "RewardPoints INTEGER);"
        ), [], (tx, results) => {Alert.alert('Created Users table')},
        (tx, error) => {Alert.alert('Error creating Users table')}
    });
  
    // SQL - add random user
    const randomUser = 'yay'  // username
    const randomPass = 'y'    // password

    this.db.transaction(tx => {

      tx.executeSql(
          `INSERT INTO Users (UID, Username, Password, FName, LName, TotalCO2, RewardPoints) VALUES (?,?,?,?,?,?,?)`,
          [101, {randomUser}, {randomPass}, 'Mot', 'Wang', 300, 9],  // CHANGE UID (101) IF SQL ERROR OCCURS

          (tx, results) => {
            console.log('Created', results.rowsAffected, 'users');
            if (results.rowsAffected > 0) {
              Alert.alert(`Data inserted successfully (user: ${randomUser}}, pass: ${randomPass})`);
            } else Alert.alert('No user created');
          },

          (tx, error) => {console.log(error)}
        );
    });
        
    }
    
  
    onLogin() {
      const { username, password, authenticated } = this.state;
  
      // SQL - check if user exists upon logging in
      this.db.transaction(tx => {
  
        tx.executeSql(
          `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`, [],
            
          (tx, results) => {
              console.log('Login probably succeeded (check app)', results.rows.length);
              if (results.rows.length > 0) {
                this.setState({ authenticated: true });
                Alert.alert('User found with credentials', `${username} + ${password}`);
              } else Alert.alert('Username does not exist, or password is incorrect');
          },
          
          (tx, error) => {console.log(error)}
          );
      });
    }

  
    render() {
      if (this.state.authenticated) {
        return (
          <View style={styles.container}> 
          <Text style={styles.heading}>Welcome back!</Text>

          <Button
          title={'Log out'}
          style={styles.input}
          onPress={() => this.setState({ authenticated: false })}
          />

          </View>
        );

      } else {

        return (
    
          <View style={styles.container}> 
            <Image source={logo} style={{ width: 120, height: 150 }} /> 
            <Text style={styles.heading}>CO2 Visualiser</Text>
            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              color= 'white'
              placeholder={'Username'}
              placeholderTextColor='white'
              style={styles.input}
            />
            <TextInput 
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              color= 'white'
              placeholder={'Password'}
              placeholderTextColor='white'
              secureTextEntry={true}
              style={styles.input}
            />
            
            <Button
              title={'Login'}
              style={styles.input}
              onPress={this.onLogin.bind(this)}
            />
      
            <Button
              title={'Sign Up for an Account'}
              style={styles.input}
              //onPress={this.onSignup.bind(this)}
              onPress={() => this.props.navigation.navigate('Signup')}
            />
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
  
    heading: {
      color: 'white',
      marginBottom: 80,
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