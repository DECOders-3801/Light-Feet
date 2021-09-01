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
        uid: 0,
        email: '',
        username: '',
        password: '',
        fname: '',
        lname: '',
        authenticated: false  // checks if logged in or not
      };
      
      this.db = SQLite.openDatabase('MainDB.db');
  
      // SQL - make table
      // UID has AUTOINCREMENT so if you want to insert a row, specify UID as NULL.
      this.db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users "+
          "(UID INTEGER PRIMARY KEY AUTOINCREMENT, " +
          "Username TEXT UNIQUE, " +
          "Password TEXT, " +
          "FName TEXT, " +
          "LName TEXT, " +
          "TotalCO2 INTEGER, " +
          "RewardPoints INTEGER);"
        ), [], (tx, results) => {Alert.alert('Created Users table')},
        (tx, error) => {Alert.alert('Error creating Users table')}
      });
    }
    
  
    onLogin() {
      const { username, password, authenticated } = this.state;
  
      // SQL - check if user exists upon logging in
      this.db.transaction(tx => {
  
        tx.executeSql(
          `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`, [],
            
          (tx, results) => {
              //console.log(results.rows.length);
              if (results.rows.length > 0) {
                this.setState({ authenticated: true });
                
                results.rows.items(0)

                //Alert.alert('User found with credentials', `${username} + ${password}`);
              } else Alert.alert('Username does not exist, or password is incorrect');
          },
          
          (tx, error) => {console.log(error)}
          );
      });
    }

  
    render() {
      if (this.state.authenticated) {
        // Welcome page (user is authenticated)
        const welcomeText = `Welcome back, ${this.state.username}!`;
        return (
          <View style={styles.container}> 
          <Text style={styles.heading}>{welcomeText}</Text>

          <Button
          title={'My Journeys'}
          style={styles.input}
          onPress={() => this.props.navigation.navigate('Journey')}
          />

          <Button
          title={'Log out'}
          style={styles.input}
          onPress={() => this.setState({ authenticated: false })}
          />

          </View>
        );

      } else {
        // Login screen (user is not logged in yet)
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