import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
//import { Header } from 'react-native/Libraries/NewAppScreen';
import * as SQLite from 'expo-sqlite';


// const db = SQLite.openDatabase(
//   {
//       name: 'MainDB',
//       location: 'default',
//   },
//   () => { },
//   error => { console.log(error) }
// )

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };

    this.db = SQLite.openDatabase('MainDB.db');

    // SQL: IT WORKS!!!!!!!!!!!
    this.db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users "+
        "(UID INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "Username TEXT, " +
        "Password TEXT, " +
        "FName TEXT, " +
        "LName TEXT, " +
        "TotalCO2 INTEGER, " +
        "RewardPoints INTEGER);"
      ), [], (tx, results) => {Alert.alert('did')},
      (tx, error) => {Alert.alert('Error creating table')}
  });

  this.db.transaction(tx => {

    tx.executeSql(
        "INSERT INTO Users (Username, Password, FName, LName, TotalCO2, RewardPoints) VALUES (?,?,?,?,?,?)",
        ['mot', 'i', 'Mot', 'Wang', 300, 9],

        (tx, results) => {
          console.log('Created', results.rowsAffected, 'rows');
          if (results.rowsAffected > 0) {
            //Alert.alert('Data inserted successfully (user: mot, pass: i)');
          } else Alert.alert('Error creating user');
        }
      );
  });

  // db.transaction(tx => {
  //   // sending 4 arguments in executeSql
  //   tx.executeSql('SELECT * FROM Users', null, // passing sql query and parameters:null
  //     // success callback which sends two things Transaction object and ResultSet Object
  //     //(txObj, { rows: { _array } }) => this.setState({ data: _array })
  //     // failure callback which sends two things Transaction object and Error
  //     (txObj, error) => console.log('Error ', error)
  //     ) // end executeSQL
  // }) // end transaction
      
  }
  

  onLogin() {
    const { username, password } = this.state;

    //Alert.alert('Credentials', `${username} + ${password}`);

    // check if user exists
    this.db.transaction(tx => {

      tx.executeSql(
        //"SELECT * FROM Users WHERE Username = ?}", [`${username}`],
        "SELECT * FROM Users WHERE Username = 'mot'", [],
          (tx, results) => {
            console.log('Login probably succeeded', results.rows.length);
            if (results.rows.length > 0) {
              Alert.alert('User found with credentials', `${username} + ${password}`);
            } else Alert.alert('User not found');
          },
          (tx, error) => {console.log(error)}
        );
    });
  }


  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.heading}>CO2 Visualiser</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          color= 'white'
          placeholder={'Student ID'}
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