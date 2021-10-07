import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Image} from 'react-native' ; 
import logo from './assets/images/icon.png';
import { CheckBox } from 'react-native-elements'; 

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Header } from 'react-native/Libraries/NewAppScreen';


export default class SignupScreen extends Component {

    constructor(props) {
      super(props);  // this.props is used for navigation.navigate
      
      this.state = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        fname: '',
        lname: '',
        checked: false
      };

      this.db = SQLite.openDatabase('MainDB.db');

    }


    // When Sign Up button is clicked
    onSignup() {
      const { email, username, password, confirmPassword, fname, lname, checked } = this.state;

      // Check for empty text fields
      // Comment out if you find it annoying
      if (email === '') {
        Alert.alert('Please enter your email');
        return;
      }
      if (username === '') {
        Alert.alert('Please enter your username');
        return;
      }
      if (password === '') {
        Alert.alert('Please enter your password');
        return;
      }
      if (confirmPassword === '') {
        Alert.alert('Please confirm your password');
        return;
      }
      if (fname === '') {
        Alert.alert('Please enter your first name');
        return;
      }
      if (lname === '') {
        Alert.alert('Please enter your first name');
        return;
      }

      // Password does not match confirmed password
      if (password != confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      // Checkbox is not checked
      if (!checked) {
        Alert.alert('Please accept the Terms & Conditions');
        return;
      }

      // Check if email already exists
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Users WHERE Email = '${email}'`, [],
            (tx, results) => {
              if (results.rows.length > 0) {
                Alert.alert('Email is taken');
              }
            }
          ), (tx, error) => {console.log(error)}
        }
      );

      // Check if username already exists
      // Note: the remaining code will still run if username already exists, but the signup will
      // just fail because of the unique constraint.
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Users WHERE Username = '${username}'`, [],
            (tx, results) => {
              if (results.rows.length > 0) {
                Alert.alert('Username is taken');
              }
            }
          ), (tx, error) => {console.log(error)}
        }
      );

      // Actual sign up
      this.db.transaction(tx => {

        // If username or email is taken, sign up will fail as the unique constraint is violated
        tx.executeSql(
          `INSERT INTO Users (UID, Email, Username, Password, FName, LName, TotalCO2, RewardPoints) VALUES (NULL,?,?,?,?,?,?,?)`,
          [`${email}`, `${username}`, `${password}`, `${fname}`, `${lname}`, 0, 0],

          (tx, results) => {
            //console.log('Created', results.rowsAffected, 'user');
            if (results.rowsAffected > 0) {
              Alert.alert('Registration complete!');
              this.props.navigation.navigate('Home')  // go back to LoginScreen
            } else Alert.alert('No user created');
          },
  
          (tx, error) => {console.log(error)}
          );
        }
      );
    }


    render() {
      
      return (
  
        <ScrollView contentContainerStyle={styles.container}> 
          <Image source={logo} style={{ width: 120, height: 150 }} /> 
          <Text style={styles.heading}>CO2 Visualiser</Text>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            color= 'white'
            placeholder={'Email'}
            placeholderTextColor='white'
            style={styles.input}
          />
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
          <TextInput 
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            color= 'white'
            placeholder={'Confirm Password'}
            placeholderTextColor='white'
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput 
            value={this.state.fname}
            onChangeText={(fname) => this.setState({ fname })}
            color= 'white'
            placeholder={'First Name'}
            placeholderTextColor='white'
            style={styles.input}
          />
          <TextInput 
            value={this.state.lname}
            onChangeText={(lname) => this.setState({ lname })}
            color= 'white'
            placeholder={'Last Name'}
            placeholderTextColor='white'
            style={styles.input}
          />
          <CheckBox 
            title={<Text style={{color: 'white', fontWeight: 'bold'}}>I agree with the Terms & Conditions</Text>}
            checked={this.state.checked}
            containerStyle ={{backgroundColor: 'transparent'}}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
          <Button
            title={'Sign Up'}
            style={styles.input}
            onPress={this.onSignup.bind(this)}
          />
      </ScrollView>
  
      );
    }
  }


  const styles = StyleSheet.create({
  
    heading: {
      color: 'white',
      marginBottom: 30,
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