import React, { Component } from 'react';
import { Alert, Text, SafeAreaView, TouchableOpacity,View, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as SQLite from 'expo-sqlite';

import wallet from './assets/images/wallet.png';

// Screen for exchanging total points (not goal points) for rewards
export default class RewardScreen extends Component {

  constructor(props) {
    super(props);
    const { username, email } = this.props.route.params;  // Pass parameters
    this.state = { username: username, email: email, totalPoints: 0 };
    this.updateData();

    // When voucher is purchased
    this.onPurchase = this.onPurchase.bind(this);
  }

  // Update the data when focusing on this screen again (clicking on the tab again)
  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('tabPress', () => {
      this.updateData();
    });
  }

  // Not needed
  // // Remove listener
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  // Update total points state based on database value
  updateData() {
    this.db = SQLite.openDatabase('MainDB.db');
    this.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE Username = '${this.state.username}';`, [],
        (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows.item(0);
            this.setState({ totalPoints: row.TotalPoints });
          }
        },
        (tx, error) => {console.log(error)}
    )});
  }
    
  render() {
    const { totalPoints } = this.state;

    return (
      <SafeAreaView style={{backgroundColor: 'black'}}>
        <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>

            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 40}}>
              Rewards
            </Text>

            <View style={{marginTop: 20, flexDirection: 'row', paddingBottom: 10}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, 
              textAlign: 'center', marginTop: 20}}>
                You have {totalPoints} points
              </Text>

              <TouchableOpacity
                activeOpacity={0.5}>
                <Image source={wallet} style={styles.walletIcon}/>
              </TouchableOpacity>
            </View>

          <ScrollView style={{width: 360}}
          contentContainerStyle={{paddingBottom: 130}}>

            <View style={{marginTop: 10}}>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $5 Coles Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(300)}>
                  <Text style={styles.boxText}>
                  300 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $10 Coles Voucher</Text>
                  <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(500)}>
                  <Text style={styles.boxText}>
                  500 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $5 Woolies Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(300)}>
                  <Text style={styles.boxText}>
                  300 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $10 Woolies Voucher</Text>
                  <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(500)}>
                  <Text style={styles.boxText}>
                  500 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                $5 UQU Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(300)}>
                  <Text style={styles.boxText}>
                  300 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                $10 UQU Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(500)}>
                  <Text style={styles.boxText}>
                  500 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                $15 UQU Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(700)}>
                  <Text style={styles.boxText}>
                  700 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $20 Apple Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(900)}>
                  <Text style={styles.boxText}>
                  900 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $30 Apple Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(1700)}>
                  <Text style={styles.boxText}>
                  1700 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $50 Apple Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(3000)}>
                  <Text style={styles.boxText}>
                  3000 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $10 Microsoft Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(500)}>
                  <Text style={styles.boxText}>
                  500 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $20 Microsoft Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={() => this.onPurchase(900)}>
                  <Text style={styles.boxText}>
                  900 points</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Check if user has enough points to purchase the item. 
  verifyPoints(cost) {
    if (this.state.totalPoints < cost) {
      Alert.alert(`Sorry! You do not have enough points to purchase this item.`);
    } else {
      Alert.alert(`Congrats! Please check your inbox: ${this.state.email}`);
      return true;
    }
  }

  // When a voucher is purchased
  onPurchase(cost) {
    if (this.verifyPoints(cost)) {
      // Update total points state
      this.setState({totalPoints: this.state.totalPoints - cost});

      // Update total points in database
      this.db = SQLite.openDatabase('MainDB.db');
      this.db.transaction(tx => {
        tx.executeSql(
          'UPDATE Users SET TotalPoints = ? WHERE Username = ?;',
          [`${this.state.totalPoints}`, `${this.state.username}`],
          (tx, results) => { },
          (tx, error) => {console.log(error)}
          );
        }
      );
    }
  }
}

// Styles for reward screen
const styles = StyleSheet.create({

  // Box style for each voucher description
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#515157',
    marginBottom: 14,
  },

  // Text style for each voucher description
  boxText: {
    fontSize: 14, 
    color: 'white', 
    fontWeight: 'normal'
  },
  
  // Button style for voucher purchase
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#11DB8F',
    flex: -1,
  },

  contentText: {
    width: 200,
    height: 40,
    padding: 10,
    borderRadius: 20,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14
  },

  walletIcon: {
    marginLeft: 20
  }

});