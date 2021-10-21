import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite';

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

    this.state.username = this.props.route.params.username;
    this.updateData();
  }

  // Update the data when focusing on this screen again (clicking on the tab again)
  componentDidMount(){
    this.subscribe = this.props.navigation.addListener('tabPress', () => {
      this.updateData();
    });
  }

  // Update past journeys based on database values
  updateData() {
    this.db = SQLite.openDatabase('MainDB.db');

    // Get journeys for the user ordered by latest first
    this.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Journeys WHERE Username = ? ORDER BY JID DESC`, [`${this.state.username}`],
        (tx, results) => {
          //console.log('Got journeys');

          var len = results.rows.length;
          if (len > 0) {

            var data = [];
            // Get all rows up to 50 at most
            for (let i = 0; i < Math.min(len, MAX_ROWS); i++) {
              let row = results.rows.item(i);
              //console.log(row.JID);
              //console.log(row.Origin);

              // Get Journeys table data by pushing each row's attribute
              let dataRow = [];
              dataRow.push(row.Origin);
              dataRow.push(row.Destination);
              dataRow.push(row.Mode);
              data.push(dataRow);
            }

            this.state.tableData = data;
          }
        },
        (tx, error) => {console.log(error)}
        );
      }
    );
  }

  render() {
    const state = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.header}>
            History
          </Text>
          <Text style={{color:'white', fontSize:20, textAlign:'center', marginBottom:20}}>
            Here are your past journeys
          </Text>
        </View>
        
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  this.state.tableData.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={styles.contentText}
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: 'black',
    alignItems:'center'
  },
  header:{
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
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },

  contentText: {
    textAlign: 'center', 
    fontWeight: '200', 
    color:'black'
  },

  dataWrapper: { 
    marginTop: -1 
  },
  
  row: { 
    height: 50, 
    backgroundColor: '#F7F8FA' 
  }
});