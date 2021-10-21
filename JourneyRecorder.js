import React, { Component, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, Button, Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Location  from 'expo-location';
import * as SQLite from 'expo-sqlite';  // will use for functionality
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const POINTS_FACTOR = 100;  // How many points obtained per journey (not including bonus points)

// Appears when Start button is clicked on the welcome screen
export default class JourneyRecorder extends Component {
  
  constructor(props) {
    super(props);

    // Pass parameters
    const { username } = this.props.navigation.state.params;

    this.state = {
      // User data - points are retrieved from database later on
      username: username,
      totalPoints: 0,
      goalPoints: 0,

      // Values in text fields and drop down box
      origin: '',
      destination: '',
      mode: '',

      open: false,
      value: null,
      items: [
        {label: 'Scooter', value: 'scooter'},
        {label: 'Bike', value: 'bike'},
      ],

      region: null,
    };

    this.db = SQLite.openDatabase('MainDB.db'); 

    // Get most up-to-date goal points and total points
    this.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE Username = '${username}';`, [],
        (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows.item(0);
            this.state.totalPoints = row.TotalPoints;
            this.state.goalPoints = row.GoalPoints;
            // Don't use setState in constructor
            //this.setState({ totalPoints : row.TotalPoints });
            //this.setState({ goalPoints : row.GoalPoints });
          }
        },
        (tx, error) => {console.log(error)}
    )});

    //this.setOpen = this.setOpen.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setState = this.setState.bind(this);
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setItems(callback) {
    this.setState(status => ({
      items: callback(state.items)
    }));
  }


  // When 'Add journey' button is clicked
  onAddJourney() {

    // Get the entered text fields
    const { username, origin, destination, totalPoints, goalPoints } = this.state;

    // Handle empty text fields
    if (origin === "") {
      Alert.alert("Please enter a start location");
      return;
    }
    if (destination === "") {
      Alert.alert("Please enter an end location");
      return;
    }

    // Give user points towards total count - update database THEN state
    this.db.transaction(tx => {
      tx.executeSql(
        'UPDATE Users SET TotalPoints = ? WHERE Username = ?;',
        [`${totalPoints + POINTS_FACTOR}`, `${username}`],
        (tx, results) => { },
        (tx, error) => {console.log(error)}
        );
      }
    );

    // Give user points towards goal count - update database THEN state
    this.db.transaction(tx => {
      tx.executeSql(
        'UPDATE Users SET GoalPoints = ? WHERE Username = ?;',
        [`${goalPoints + POINTS_FACTOR}`, `${username}`],
        (tx, results) => { },
        (tx, error) => {console.log(error)}
        );
      }
    );
    
    // Insert journey into the Journeys table for the corresponding user
    this.db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO Journeys (JID, Username, Origin, Destination, Mode) VALUES (NULL,?,?,?,?)`,
        [`${username}`, `${origin}`, `${destination}`, `someMode`],

        (tx, results) => {
          //console.log('Created', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(`${POINTS_FACTOR} points received!`);
          } else Alert.alert('No journey added');
        },

        (tx, error) => {console.log(error)}
        );
      }
    );

    this.setState({ totalPoints: totalPoints + POINTS_FACTOR });
    this.setState({ goalPoints: goalPoints + POINTS_FACTOR });

    //this.props.navigation.navigate('WelcomeScreen');  // doesn't work
    this.props.navigation.popToTop();
  }

  render() {
    const {open, value, items} = this.state;    

    return (
      <View style={styles.container}> 
        <MapView style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        showsScale={true}
        initialRegion={{
          latitude: -27.495431,
          longitude: 153.01203,
          latitudeDelta: 0.0122, //previous num 0.0922
          longitudeDelta: 0.0121,//previous num 0.0421
        }}>

        <MapView.Marker
          coordinate={{ latitude : -27.495431, longitude : 153.01203 }}
          title={"University of Queensland"}
          description={"Queensland's No.1 University"}
        />
        </MapView>
        <View style={styles.content}>
        <TextInput
          value={this.state.origin}
          onChangeText={(origin) => this.setState({ origin })}
          color='white'
          placeholder={'Enter Starting Point'}
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput
          value={this.state.destination}
          onChangeText={(destination) => this.setState({ destination })}
          placeholder={'Enter Destination'}
          color='white'
          placeholderTextColor='white'
          style={styles.input}
        />
        <View>
          <DropDownPicker style={styles.dropdown}
            placeholder="Transportation Mode"
            color='white'
            placeholderStyle={{color:'white',textAlign:'center'}}
            open={open}
            value={value}
            items={items}
            setOpen={() => this.setState({ open: !open })}
            setValue={this.setValue}
            setItems={this.setItems}
            onPress={() => this.setState({ open: !open })}
            listItemContainerStyle={{backgroundColor:'#707070'}}
            listItemLabelStyle={{color:'white'}}
            selectedItemLabelStyle={{color:'white'}}
            
          />
        </View>
        <TouchableOpacity 
            activeOpacity={0.5}
            style={styles.btn}
            onPress={() => this.onAddJourney()}
            >
              <Text style={{fontSize:45, color:'white', fontWeight:'bold', textAlign:'center'}}>
              +
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#11DB8F',
    alignItems:'center',
  },

  map: {
    flex:1,
    width: 500,
    height: 300,
  },

  input: {
    width: 180,
    height: 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor:'#11DB8F',
    textAlign:'center',
    marginBottom:15
  },
  
  dropdown: {
    backgroundColor: "#11DB8F",
    borderRadius: 20,
    width:180,
    borderWidth:0
  },

  content: {
    width:'100%',
    padding:20,
    alignItems:'center',
    backgroundColor:'#707070'
  },

  btn: {
    marginTop:90,
    width: 100,
    height: 60,
    borderRadius: 20,
    backgroundColor:'#11DB8F',
    alignItems:'center',
    justifyContent:'center'
  }
  
});