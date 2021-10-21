import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, SafeAreaView, TouchableOpacity,View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import * as SQLite from 'expo-sqlite';
import {Image} from 'react-native' ; 
import logo from './assets/images/icon.png'; 
import { ScrollView } from 'react-native-gesture-handler';
import wallet from './assets/images/wallet.png';

// Screen for exchanging total points (not goal points) for rewards
export default class RewardScreen extends Component {

  constructor(props) {
    super(props);
    const { username } = this.props.route.params;  // Pass parameter
    this.state = { username: username, totalPoints: 0 };

    this.updateData();
  }

  // Update the data when focusing on this screen again (clicking on the tab again)
  componentDidMount(){
    this.subscribe = this.props.navigation.addListener('tabPress', () => {
      this.updateData();
    });
  }

  updateData() {
    // Get total points of user
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
        <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom:10}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:40}}>
              Rewards
            </Text> 
            <View style={{marginTop:20, flexDirection:'row'}}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:16, textAlign:'center',marginTop:20}}>
                You have {totalPoints} points
              </Text>
              <TouchableOpacity 
                activeOpacity={0.5}>
                <Image source={wallet} style={styles.walletIcon}/>
              </TouchableOpacity>
            </View>
          <ScrollView style={{width:360}}>

            <View style={{marginTop:10}}>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $5 Coles Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
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
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  600 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $5 Woolies Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
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
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  600 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                $5 UQU Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
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
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  550 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                $15 UQU Voucher</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  800 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $20 Apple Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  2000 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $30 Apple Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  3000 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $50 Apple Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  5000 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $10 Microsoft Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  1000 points</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.box}>
                <Text style={styles.contentText}>
                  $20 Microsoft Gift Card</Text>
                <TouchableOpacity 
                  activeOpacity={0.5}
                  style={styles.btn}
                  onPress={this.onPurchase.bind(this)}>
                  <Text style={styles.boxText}>
                  2000 points</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // When a voucher is purchased
  onPurchase(cost) {
    Alert.alert('Congrats!','Please check out the voucher in your wallet!');
  }
}

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
    fontSize:14, 
    color:'white', 
    fontWeight:'normal'
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
    flex:-1,
  },

  contentText: {
    width: 200,
    height: 40,
    padding: 10,
    borderRadius: 20,
    fontWeight:'bold',
    color:'white',
    fontSize:14
  },

  walletIcon: {
    marginLeft:20
  }
});