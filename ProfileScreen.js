import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Restart } from 'fiction-expo-restart';

import styles from './Styles.js';
import profile from './assets/images/profile.png'; 

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
      <SafeAreaView style={profileStyles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color:'white', fontSize:40, fontWeight:'bold'}}>Profile</Text>
        </View>
        <View style={profileStyles.head}>
          <Image source={profile} style={profileStyles.portrait} /> 
          <Text style={profileStyles.heading}>{fname} {lname}</Text>

        </View>

        <View>
          <View style={profileStyles.column}>
            <Text style={profileStyles.contentHead}>Username</Text>
            <Text style={profileStyles.contents}>{username}</Text>
          </View>
          <View style={profileStyles.column}>
            <Text style={profileStyles.contentHead}>Email </Text>
            <Text style={profileStyles.contents}>{email}</Text>
          </View>
          <View style={profileStyles.column}>
            <Text style={profileStyles.contentHead}>First Name</Text>
            <Text style={profileStyles.contents}>{fname}</Text>
          </View>
          <View style={profileStyles.column}>
            <Text style={profileStyles.contentHead}>Last Name</Text>
            <Text style={profileStyles.contents}>{lname}</Text>
          </View>
        </View>
        <TouchableOpacity 
          activeOpacity={0.5}
          style={styles.redBtn}
          onPress={() => Restart()}>
            <Text style={styles.redBtnText}>
              Log Out
            </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

// Styles for profile screen
const profileStyles = StyleSheet.create({

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
    marginTop: 20, 
    marginLeft: 40
    // justifyContent: 'center'
  },

  walletIcon: {
    marginTop: 70,
    marginLeft: 50
  },

  column: {
    height: 70,
    padding: 5,
    borderTopWidth: 1,
    backgroundColor: '#11DB8F',
    borderRadius: 15,
    marginBottom: 10
  },

  contentHead:{
    color: 'white',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  },

  contents: {
    color: 'black',
    //fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 30
  },

  container: {
    flex: 1,
    backgroundColor: 'black'
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