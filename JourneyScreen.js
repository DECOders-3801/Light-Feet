import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet, RecyclerViewBackedScrollViewBase } from 'react-native';
import * as SQLite from 'expo-sqlite';  // will use for functionality

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Header } from 'react-native/Libraries/NewAppScreen';


export default class JourneyScreen extends Component {

  constructor(props) {
    super(props);
    const { username } = this.props.navigation.state.params;

    this.state = {
      username: username,
      start: '',
      end: '',
      mode: ''
    }

    this.db = SQLite.openDatabase('MainDB.db');

          // Get journeys for this user
          this.db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM Journeys WHERE Username = ?`, [`${username}`],
              (tx, results) => {
                console.log('Got journeys');
    
                var len = results.rows.length;
                if (len > 0) {
                  for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log(row.start);
                    this.setState({ start: row.Origin });
                    this.setState({ end: row.Destination });
                    this.setState({ mode: row.Mode });
                    // this.setState({output:row.Name})
                    //this.setState((prevState) => ({ data : prevState.data.push(row.Name)}))
                  }
            }
            
            },
              (tx, error) => {console.log(error)}
              );
            }
          );
  }

    render() {

      const { username, start, end, mode } = this.state;
      
      return (
  
        <View style={styles.container}> 
        <Text style={styles.heading}>My Journeys</Text>

        <Text style={styles.contents}>Start            End            Mode</Text>

        <Text style={styles.contents}>{start}            {end}            {mode}</Text>

        <Button
          title={'Start a Journey'}
          style={styles.input}
          onPress={() => this.props.navigation.navigate('JourneyRecorder', {username : this.state.username})}
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

    contents:{
      color: 'white',
      marginBottom: 15,
      fontSize: 20,
      fontWeight: 'bold'
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