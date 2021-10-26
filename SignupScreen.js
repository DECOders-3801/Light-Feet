import React, { Component } from 'react';
import { Alert, Text, TextInput, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as SQLite from 'expo-sqlite';

import styles from './Styles.js';
import logo from './assets/images/icon.png';

// Signup can be accessed from LoginScreen
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

    // Check if text fields are empty - everything must be filled
    // Email required for purchasing vouchers
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

    // Don't require name for better privacy
    // if (fname === '') {
    //   Alert.alert('Please enter your first name');
    //   return;
    // }
    // if (lname === '') {
    //   Alert.alert('Please enter your first name');
    //   return;
    // }

    // Password does not match confirmed password
    if (password != confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (!this.validateEmail(email)) {
      Alert.alert('Please enter a valid email');
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
    // simply fail because of the unique constraint.
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
        `INSERT INTO Users (UID, Email, Username, Password, FName, LName, TotalPoints, GoalPoints) VALUES (NULL,?,?,?,?,?,?,?)`,
        [`${email}`, `${username}`, `${password}`, `${fname}`, `${lname}`, 0, 0],

        (tx, results) => {
          //console.log('Created', results.rowsAffected, 'user');
          if (results.rowsAffected > 0) {
            Alert.alert('Registration complete!');
            this.props.navigation.navigate('Login')  // go back to LoginScreen
          } else Alert.alert('No user created');
        },

        (tx, error) => {console.log(error)}
        );
      }
    );
  }

  // Retrieved from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // Returns true if email is in the form: string@string.string, else returns false
  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    
    return (
      <KeyboardAwareScrollView 
      contentContainerStyle={signupStyles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}> 

        <Image source={logo} style={signupStyles.image} /> 

        <Text style={signupStyles.heading}>
          Light Feet
        </Text>

        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          color= 'white'
          placeholder={'Email'}
          placeholderTextColor='white'
          style={signupStyles.input}
        />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          color= 'white'
          placeholder={'Username'}
          placeholderTextColor='white'
          style={signupStyles.input}
        />
        <TextInput 
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          color= 'white'
          placeholder={'Password'}
          placeholderTextColor='white'
          secureTextEntry={true}
          style={signupStyles.input}
        />
        <TextInput 
          value={this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          color= 'white'
          placeholder={'Confirm Password'}
          placeholderTextColor='white'
          secureTextEntry={true}
          style={signupStyles.input}
        />
        <TextInput 
          value={this.state.fname}
          onChangeText={(fname) => this.setState({ fname })}
          color= 'white'
          placeholder={'First Name'}
          placeholderTextColor='white'
          style={signupStyles.input}
        />
        <TextInput 
          value={this.state.lname}
          onChangeText={(lname) => this.setState({ lname })}
          color= 'white'
          placeholder={'Last Name'}
          placeholderTextColor='white'
          style={signupStyles.input}
        />

        <CheckBox 
          title={
            <Text 
              style={signupStyles.checkbox}>
              I agree with the Terms & Conditions
            </Text>
          }
          checked={this.state.checked}
          containerStyle ={{backgroundColor: 'transparent', borderWidth: 0}}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />

        <TouchableOpacity 
          activeOpacity={0.5}
          style={styles.blueBtn}
          onPress={this.onSignup.bind(this)}>
          <Text style={styles.blueBtnText}>
            Sign up
          </Text>
        </TouchableOpacity>
        
      </KeyboardAwareScrollView>
    );
  }
}

// Styles for signup screen
const signupStyles = StyleSheet.create({

  image: {
    width: 120,
    height: 150
  },

  heading: {
    color: 'white',
    marginBottom: 40,
    fontSize: 40,
    //fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },

  // Longer width than loginStyles.input
  input: {
    width: 260,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    borderRadius: 20
  },

  checkbox: {
    color: 'white', 
    fontWeight: 'normal'
  }

});