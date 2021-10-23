import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import {Image} from 'react-native' ; 
import { SafeAreaView } from 'react-native-safe-area-context';
import profile from './assets/images/profile.png'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Restart } from 'fiction-expo-restart';

// Screen for showing profile / account details
export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);  // this.props is used for navigation.navigate

    // Retrieve user-specific data from LoginScreen
    // Don't need to store password after logging in (better security)
    const { email, username, fname, lname } = this.props.route.params;

    // Now update the state of AccountScreen accordingly
    this.state = {
      email: email,
      username: username,
      fname: fname,
      lname: lname,
    };

    // don't need database as we're pasing params through screens
    //this.db = SQLite.openDatabase('MainDB.db');
  }

  render() {

    const { email, username, fname, lname } = this.state;
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color:'white', fontSize:40, fontWeight:'bold'}}>Profile</Text>
        </View>
        <View style={styles.head}>
          <Image source={profile} style={styles.portrait} /> 
          <Text style={styles.heading}>{fname} {lname}</Text>

        </View>

        <View>
          <View style={styles.column}>
            <Text style={styles.contentHead}>Username</Text>
            <Text style={styles.contents}>{username}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.contentHead}>Email </Text>
            <Text style={styles.contents}>{email}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.contentHead}>First Name</Text>
            <Text style={styles.contents}>{fname}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.contentHead}>Last Name</Text>
            <Text style={styles.contents}>{lname}</Text>
          </View>
        </View>
        <TouchableOpacity 
          activeOpacity={0.5}
          style={styles.redBtn}
          onPress={() => Restart()}>
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>
              Log Out
            </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  heading: {
    color: 'white',
    fontSize: 30,
    marginLeft: 40,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingTop: 70
  },

  head: {
    marginBottom: 60,
    fontWeight: 'bold',
    flexDirection:'row',
    marginTop:20, 
    marginLeft:40
    // justifyContent: 'center'
  },

  walletIcon: {
    marginTop:70,
    marginLeft:50
  },

  column: {
    height:70,
    padding:5,
    borderTopWidth:1,
    backgroundColor:'#11DB8F',
    borderRadius:15,
    marginBottom:10
  },

  contentHead:{
      color: 'white',
      marginBottom: 15,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft:20
  },

  contents: {
    color: 'black', 
    fontWeight: 'bold', 
    marginLeft:20, 
    marginBottom: 30
  },

  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'black'
  },

  redBtn: {
    width: 200,
    height: 50,
    padding: 10,
    borderWidth: 1,
    backgroundColor:'red',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:100
  },

  portrait: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 30,
    borderRadius: 100,
    position: 'relative',
  }

});