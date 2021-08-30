import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';
import * as SQLite from 'expo-sqlite';


const Stack = createNativeStackNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };

    //<this.Stack.Navigator initialRouteName="Login">
    <NavigationContainer>
      <Stack.Navigator> 
          <Stack.Screen name="Login" component={this.loginScreen} />
          <Stack.Screen name="Signup" component={this.signupScreen} />
      </Stack.Navigator>
    </NavigationContainer>

    this.db = SQLite.openDatabase('MainDB.db');

    // SQL - make table
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
  this.db.transaction(tx => {

    tx.executeSql(
        "INSERT INTO Users (UID, Username, Password, FName, LName, TotalCO2, RewardPoints) VALUES (?,?,?,?,?,?,?)",
        [1, 'mot', 'i', 'Mot', 'Wang', 300, 9],

        (tx, results) => {
          console.log('Created', results.rowsAffected, 'users');
          if (results.rowsAffected > 0) {
            //Alert.alert('Data inserted successfully (user: mot, pass: i)');
          } else Alert.alert('Error creating user');
        }
      );
  });
      
  }
  

  onLogin() {
    const { username, password } = this.state;

    // SQL - check if user exists upon logging in
    this.db.transaction(tx => {

      tx.executeSql(
        `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`, [],
          (tx, results) => {
            console.log('Login probably succeeded (check app)', results.rows.length);
            if (results.rows.length > 0) {
              Alert.alert('User found with credentials', `${username} + ${password}`);
            } else Alert.alert('Username does not exist, or password is incorrect');
          },
          (tx, error) => {console.log(error)}
        );
    });
  }


  // onSignup() {
  //   return (
  //     <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="Signup" component={this.signupScreen} />
  //     </Stack.Navigator>
  //     </NavigationContainer>);
  // }

  signupScreen ({navigation}) {
    return(
      <View style={styles.container}> 
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
    </View>
    );
  }



  loginScreen ({navigation}) {
    return (
      <View style={styles.container}> 
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
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    );
  }


  render() {
    return (

      <View style={styles.container}> 
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
        onPress={() => navigation.navigate('Signup')}
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