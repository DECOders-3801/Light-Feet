import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Alert, Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView, LogBox } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SQLite from 'expo-sqlite';  // will use for functionality
import DropDownPicker from 'react-native-dropdown-picker';

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
      // Value is mode of transportation
      origin: '',
      destination: '',
      value: '',

      open: false,
      value: null,
      items: [
        // Can only do 4 at most, can't scroll to access the rest, bottom
        // navigator blocks it
        {label: 'Walking', value: 'Walking'},
        {label: 'Bike', value: 'Bike'},
        {label: 'Scooter', value: 'Scooter'},
        {label: 'Train', value: 'Train'},
        //{label: 'Bus', value: 'Bus'},
        //{label: 'Carpool', value: 'Carpool'}
      ],

      region: null
    };

    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

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
    const { username, origin, destination, totalPoints, value, goalPoints } = this.state;

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
        [`${username}`, `${origin}`, `${destination}`, `${value}`],

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
      <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>
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
          coordinate={{ latitude : -27.496878439852715, longitude : 153.01119664136527 }}
          title={"Biological Sciences Library"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.49962156722759, longitude : 153.0134807719256 }}
          title={"Hawken Building"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.49914159297527, longitude : 153.0154287724923 }}
          title={"Lakeside Cafe"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.497483483999577, longitude : 153.01594036860072 }}
          title={"REDROOM"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.496372272512442, longitude : 153.01234773260921 }}
          title={"UQ Art Museum"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.49601808141903, longitude : 153.01346000981016 }}
          title={"Central Library"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.495756268970155, longitude : 153.0159786368055 }}
          title={"UQ Centre"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.49498810368046, longitude : 153.01627126226276 }}
          title={"UQ Sport Aquatic Centre"}
        />
        <MapView.Marker
          coordinate={{ latitude : -27.498157733035118, longitude : 153.01137504255976 }}
          title={"Student Centre"}
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
          <View style={styles.content}>
            <DropDownPicker style={styles.dropdown}
              placeholder="Transportation Mode"
              color='white'
              placeholderStyle={{color: 'white', textAlign: 'center'}}
              open={open}
              value={this.state.value}
              items={this.state.items}
              setOpen={() => this.setState({ open: !open })}
              setValue={this.setValue}
              setItems={this.setItems}
              onChangeValue={(value) => this.setState({ value })}
              onPress={() => this.setState({ open: !open })}
              listItemContainerStyle={{backgroundColor: '#11DB8F'}}
              listItemLabelStyle={{color: 'white'}}
              selectedItemLabelStyle={{color: 'white'}}
              containerStyle={{width: 180}}
              labelStyle={{color: 'white'}}
              activeItemStyle={{alignItems: 'center'}}
            />

            <TouchableOpacity 
              activeOpacity={0.5}
              style={styles.btn}
              onPress={() => this.onAddJourney()}
              >
              <Text style={{fontSize: 45, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#11DB8F',
    alignItems: 'center',
  },

  map: {
    flex: 1,
    width: 500,
    height: 300,
  },

  input: {
    width: 180,
    height: 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#11DB8F',
    textAlign: 'center',
    marginBottom: 15
  },
  
  dropdown: {
    backgroundColor: "#11DB8F",
    borderRadius: 20,
    width: 180,
    borderWidth: 0,
  },

  content: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#707070'
  },

  btn: {
    marginTop:90,
    width: 100,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#11DB8F',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
});