import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
//import { Header } from 'react-native/Libraries/NewAppScreen';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
)


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
      
    // SQL timeeeee
    db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS User"+
          "(UID INTEGER, " +
          "Username VARCHAR(255), " +
          "Password VARCHAR(255), " +
          "FName VARCHAR(15), " +
          "LName VARCHAR(15), " +
          "TotalCO2 REAL, " +
          "RewardPoints INTEGER);"
        )
    })

    db.transaction(tx => {

      tx.executeSql(
          "INSERT INTO Users (UID, Username, Password, FName, LName, TotalCO2, RewardPoints) VALUES (?,?,?,?,?,?,?)",
          [5, 'mot', 'i', 'Mot', 'Wang', 300, 9],

          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Data Inserted Successfully....');
            } else Alert.alert('Failed....');
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
    db.transaction(tx => {

      tx.executeSql(
        "SELECT * FROM USERS WHERE Username = ${username}}",
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rows.length > 0) {
              Alert.alert('Account found', 'Credentials', `${username} + ${password}`);
            } else Alert.alert('Failed....');
          }
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
export default App

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