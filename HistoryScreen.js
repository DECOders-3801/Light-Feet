import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import * as SQLite from 'expo-sqlite';

import styles from './Styles.js';

const MAX_ROWS = 50;    // Up to how many past journeys to display

// Historical journeys screen
export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Start', 'End', 'Mode'],
      widthArr: [120, 120, 120],
      tableData: [],
      username: ''
    }

    // Pass parameter
    this.state.username = this.props.route.params.username;

    this.db = SQLite.openDatabase('MainDB.db');
    this.updateData();
  }

  // Update the data when focusing on this screen again (clicking on the tab again)
  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.updateData();
      //this.props.navigation.navigate("History");
    });
  }

  // Not needed
  // // Remove listener
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  // Update past journeys based on database values
  updateData() {
    // Get journeys for the user ordered by latest first
    this.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Journeys WHERE Username = ? ORDER BY JID DESC`, [`${this.state.username}`],
        (tx, results) => {
          //console.log('Got journeys');

          var len = results.rows.length;
          if (len > 0) {

            //var data = [];
            this.state.tableData = [];
            // Get all rows up to 50 at most
            //console.log(len);
            //console.log(Math.min(len, MAX_ROWS));
            for (let i = 0; i < Math.min(len, MAX_ROWS); i++) {
              let row = results.rows.item(i);
              //console.log(row.JID);
              //console.log(row.Origin);

              // Get Journeys table data by pushing each row's attribute
              let dataRow = [];
              dataRow.push(row.Origin);
              dataRow.push(row.Destination);
              dataRow.push(row.Mode);
              this.state.tableData.push(dataRow);
            }

            //this.state.tableData = data;
          }
        },
        (tx, error) => {console.log(error)}
        );
      }
    );
  }

  // Removes journeys from database for the user and updates the state accordingly
  clearData() {
    this.db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM Journeys WHERE Username = ?`, [`${this.state.username}`],
        (tx, results) => {
          this.setState({tableData: []});
        }
      )
    },
      (tx, error) => {console.log(error)}
    );
  }

  render() {
    const state = this.state;

    return (
      <SafeAreaView style={historyStyles.container}>
        <View>
          <Text style={historyStyles.header}>
            History
          </Text>

          <Text style={{color: 'white', fontSize: 18, textAlign: 'center', marginBottom: 20}}>
            Here are your past journeys (up to 50)
          </Text>

          <TouchableOpacity 
            activeOpacity={0.5}
            style={styles.redBtn}
            onPress={() => this.clearData()}
            >
            <Text style={styles.redBtnText}>
            Clear history
            </Text>
          </TouchableOpacity>
        </View>
        
        <View>
          <Table borderStyle={{borderColor: '#C1C0B9'}}>
            <Row data={state.tableHead} widthArr={state.widthArr} 
            style={historyStyles.head} textStyle={historyStyles.text}/>
          </Table>
          <ScrollView style={historyStyles.dataWrapper}>
            <Table borderStyle={{borderColor: '#C1C0B9', borderWidth: 2}}>
                {
                  this.state.tableData.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={state.widthArr}
                      style={[historyStyles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={historyStyles.contentText}
                    />
                  ))
                }
            </Table>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

// Styles for history screen
const historyStyles = StyleSheet.create({

  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: 'black',
    alignItems:'center'
  },
  
  header: {
    color:'white',
    fontSize:40,
    textAlign:'center',
    fontWeight:'bold',
    marginBottom:30
  },

  head: {
    height: 50, 
    backgroundColor: '#11DB8F' 
  },

  text: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  contentText: {
    textAlign: 'center', 
    fontWeight: '200', 
    color: 'black'
  },

  dataWrapper: {
    marginTop: -1 
  },
  
  row: {
    height: 50, 
    backgroundColor: '#F7F8FA' 
  }

})