import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
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
        fname: '',
        lname: '',
        checked: false
      };

      this.db = SQLite.openDatabase('MainDB.db');

    }


    // When Sign Up button is clicked
    onSignup() {
      const { email, username, password, fname, lname } = this.state;
      
      // Handle invalid inputs before signing up - only handles existing username so far
      // Note: unreadable code
      this.db.transaction(tx => {

        // 1) Check if user already exists
        tx.executeSql(
          `SELECT * FROM Users WHERE Username = '${username}'`, [],
          (tx, results) => {
            if (results.rows.length > 0) {
              Alert.alert('Username is taken');

            } else {
                // Assume everything is valid so sign up
                tx.executeSql(
                  `INSERT INTO Users (UID, Username, Password, FName, LName, TotalCO2, RewardPoints) VALUES (NULL,?,?,?,?,?,?)`,
                  [`${username}`, `${password}`, `${fname}`, `${lname}`, 0, 0],
        
                  (tx, results) => {
                    console.log('Created', results.rowsAffected, 'user');
                    if (results.rowsAffected > 0) {
                      Alert.alert('Registration complete!');
                      this.props.navigation.navigate('Login')
                    } else Alert.alert('No user created');
                  },
          
                  (tx, error) => {console.log(error)}
                  );
            };
          },
        
        (tx, error) => {console.log(error)}
        );
      });
    }


    render() {
      
      return (
  
        <View style={styles.container}> 
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
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
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
      </View>
  
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