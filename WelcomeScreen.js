import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryPie } from 'victory-native';

import * as SQLite from 'expo-sqlite';

import styles from './Styles.js';

//const POINTS_FACTOR = 100;  // Points obtained per journey
const MAX_POINTS = 500;     // Number of points until the bar is filled
const BONUS_POINTS = 200;   // Bonus points received when the bar is filled

// Appears after logging in
// Initial screen of the bottom tab navigator
export default class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    
    // Pass parameters
    const { username } = this.props.navigation.state.params;
    //const { username } = this.props.route.params

    // User data - points are retrieved from database later on
    this.state = { email: '', username: username, fname: '', lname: '', totalPoints: 0, goalPoints: 0 };
    this.updateData();

    //console.log(this.state.goalPoints);

    // OLD VERSION
    // this.db.transaction(tx => {
    //   tx.executeSql(
    //     `SELECT * FROM Journeys WHERE Username = '${username}';`, [],
    //     (tx, results) => {
    //       this.setState({goalPoints : results.rows.length * POINTS_FACTOR});
    //     },
        
    //     (tx, error) => {console.log(error)}
    //     );
    // });

  }

  // Check if goal reached for bonus points
  componentDidUpdate() {
    const { username, totalPoints, goalPoints } = this.state;

    // Maximum goal points reached - update total points and goal points
    if (goalPoints >= MAX_POINTS) {
      Alert.alert("Goal reached! 200 bonus points obtained");

      // Give bonus points (both state variable and database)
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE Users SET TotalPoints = TotalPoints + ${BONUS_POINTS} WHERE Username = '${username}';`, 
          [],
          (tx, results) => { },
          (tx, error) => { console.log(error) }
      )});
      this.setState({ totalPoints: totalPoints + BONUS_POINTS });

      // Reset goal points to 0 (both state variable and database)
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE Users SET GoalPoints = 0 WHERE Username = '${username}';`, [],
          (tx, results) => { },
          (tx, error) => { console.log(error) }
      )});
      this.setState({ goalPoints: 0 });
    }
  }

  // Update the data when focusing on this screen again (going back from JourneyRecorder)
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
      this.updateData();
    });
  }

  // Not needed
  // // Remove listener
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  // Update states based on the database entry for the user
  updateData() {
    const { username } = this.state;

    this.db = SQLite.openDatabase('MainDB.db');
    this.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE Username = '${username}';`, [],
        (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows.item(0);
            //console.log(row);
            this.setState({ totalPoints: row.TotalPoints });
            this.setState({ goalPoints: row.GoalPoints });
          }
        },
        (tx, error) => {console.log(error)}
    )});
  }

  render() {
    const { username, goalPoints } = this.state;
    const welcomeText = `Welcome back ${username}!`;

    const graphicData = [
      { x: 1, y: goalPoints },
      { x: 2, y: MAX_POINTS - goalPoints },
    ];
    const graphicColor = ['#11DB8F', 'white'];

    return (
      <SafeAreaView style={welcomeStyles.container}>

        <View style={welcomeStyles.headerContainer}>
          <Text style={welcomeStyles.header}>
            {welcomeText}
          </Text>
        </View>

        <View style={welcomeStyles.content}>

          <Text style={welcomeStyles.progressBarText}>
            {MAX_POINTS - goalPoints} points to go
          </Text>

          <Text style={welcomeStyles.explainText}>
            Reach the goal for {BONUS_POINTS} bonus points!
          </Text>

          <VictoryPie
            //standalone={false}
            animate={{ duration: 1000 }}
            width={300} height={300}
            data={graphicData}
            innerRadius={130}
            colorScale={graphicColor} 
            labels={() => null}
          />

        </View>

        <View>
          <TouchableOpacity 
              activeOpacity={0.5}
              style={styles.greenBtn}
              onPress={() => this.props.navigation.navigate('JourneyRecorder')}>
                <Text style={styles.greenBtnText}>
                  Start</Text>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}

// Styles for welcome screen
const welcomeStyles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },

  headerContainer: {
    color: 'white',
    marginBottom: 20,
    //fontFamily: 'Helvetica',
    fontWeight: 'bold',
    position:'relative',
  },

  header: {
    color: 'white',
    marginTop: 100,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center'
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressBarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 21,
    flex:-1,
    paddingVertical: 200,
    position: 'absolute',
    paddingTop: 200
  },

  explainText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    flex: -1,
    paddingVertical: 200,
    position: 'absolute',
    paddingTop: 510
  }

});