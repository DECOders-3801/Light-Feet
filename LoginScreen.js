import React, { Component } from 'react';
import { Alert, Text, TextInput, ScrollView, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

import logo from './assets/images/icon.png'; 

// Screen for logging in as a user
// Can also access signup screen from here
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);  // this.props is used for navigation.navigate
    
    this.state = {
      // to store user data from database
      uid: 0,
      email: '',
      username: '',
      password: '',
      fname: '',
      lname: '',
      totalPoints: 0,
      goalPoints: 0,

      userText: '',         // entered username
      passText: '',         // entered password
      authenticated: false  // checks if logged in or not
    };
    
    this.db = SQLite.openDatabase('MainDB.db');

    // Uncomment below to delete old Users table

    // this.db.transaction(tx => {
    //   tx.executeSql(
    //     "DROP TABLE Users;"
    //   ), [], (tx, results) => {Alert.alert('deleted')},
    //   (tx, error) => {Alert.alert('Error deleting')}
    // });

    // SQL - make Users and Journeys tables (if they don't already exist)
    // UID has AUTOINCREMENT so if you want to insert a row, specify UID as NULL.
    this.db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users "+
        "(UID INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "Email TEXT UNIQUE, " +
        "Username TEXT UNIQUE, " +
        "Password TEXT, " +
        "FName TEXT, " +
        "LName TEXT, " +
        "TotalPoints INTEGER, " +
        "GoalPoints INTEGER);"
      ), [], (tx, results) => {Alert.alert('Created Users table')},
      (tx, error) => {Alert.alert('Error creating Users table')}
    });

    // Uncomment below to delete old Journeys table

    // this.db.transaction(tx => {
    //   tx.executeSql(
    //     "DROP TABLE Journeys;"
    //   ), [], (tx, results) => {Alert.alert('deleted')},
    //   (tx, error) => {Alert.alert('Error deleting')}
    // });

    // Journeys table
    this.db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Journeys "+
        "(JID INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "Username TEXT, " +
        "Origin TEXT, " +
        "Destination TEXT, " +
        "Mode TEXT);"
      ), [], (tx, results) => {Alert.alert('Created Journeys table')},
      (tx, error) => {Alert.alert('Error creating Journeys table')}
    });
  }

  // When Login button clicked
  onLogin() {
    const { userText, passText } = this.state;

    // SQL - check if user exists upon logging in
    this.db.transaction(tx => {

      tx.executeSql(
        `SELECT * FROM Users WHERE Username = '${userText}' AND Password = '${passText}'`, [],
          
        (tx, results) => {
          //console.log(results.rows.length);
          if (results.rows.length > 0) {
            let row = results.rows.item(0);

            this.setState({ authenticated: true });
            
            // Get database values
            this.setState({ email: row.Email });
            this.setState({ username: row.Username });
            this.setState({ password: row.Password });
            this.setState({ fname: row.FName });
            this.setState({ lname: row.LName });
            this.setState({ totalPoints: row.TotalPoints });
            this.setState({ goalPoints: row.GoalPoints });

            //const {navigate} = this.props.navigation;
            this.props.navigation.navigate('BottomNavigator', 
            {email: this.state.email,
              username: this.state.username,
              fname: this.state.fname,
              lname: this.state.lname,
              totalPoints: this.state.totalPoints,
              goalPoints: this.state.goalPoints
            });

          } else {
            Alert.alert('Please check your details again');
          }
        },
        
        (tx, error) => {console.log(error)}
        );
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={loginStyles.container}> 
        <Image source={logo} style={{ width: 120, height: 150 }} /> 
        <Text style={loginStyles.heading}>Light Feet</Text>
        <TextInput
          value={this.state.userText}
          onChangeText={(userText) => this.setState({ userText })}
          color= 'white'
          placeholder={'Username'}
          placeholderTextColor='white'
          style={loginStyles.input}
        />
        <TextInput 
          value={this.state.passText}
          onChangeText={(passText) => this.setState({ passText })}
          color= 'white'
          placeholder={'Password'}
          placeholderTextColor='white'
          secureTextEntry={true}
          style={loginStyles.input}
        />
        <TouchableOpacity 
          activeOpacity={0.5}
          style={loginStyles.loginBtn}
          onPress={this.onLogin.bind(this)}>
            <Text style={loginStyles.loginBtnText}>
              Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          activeOpacity={0.5}
          style={loginStyles.signupBtn}
          onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={{fontSize: 16, color: 'white', fontWeight: 'normal', 
              textDecorationLine: 'underline', textDecorationColor: 'white', textDecorationStyle: 'dotted'}}>
              Sign Up for an Account
            </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

// Styles for login screen
const loginStyles = StyleSheet.create({

  heading: {
    color: 'white',
    marginBottom: 80,
    fontSize: 40,
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },

  input: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    borderRadius: 20
  },

  loginBtn: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    backgroundColor:'skyblue',
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  loginBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },

  signupBtn: {
    width: 200,
    height: 30,
    marginTop: 120,
    alignItems: 'center',
    justifyContent: 'center'
  }

});