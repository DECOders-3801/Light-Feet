import React, { Component, useState } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';  // will use for functionality
import DropDownPicker from 'react-native-dropdown-picker';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Header } from 'react-native/Libraries/NewAppScreen';


export default class JourneyRecorder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      open: false,
      value: null,
      items: [
        {label: 'Scooter', value: 'sports'},
        {label: 'Bike', value: 'bike'},
      ]
    };

    //this.setOpen = this.setOpen.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setState = this.setState.bind(this);
  }

  // setOpen(open) {
  //   this.setState({
  //     open: !open
  //   });
  // }

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

    render() {
      const {open, value, items} = this.state;
      return (
        
      <View style={styles.container}> 
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
          color='white'
          placeholder={'Enter Destination'}
          placeholderTextColor='white'
          style={styles.input}
        />

        <DropDownPicker style={styles.dropdown}
          placeholder="Select a transportation mode"
          open={open}
          value={value}
          items={items}
          setOpen={() => this.setState({ open: !open })}
          setValue={this.setValue}
          setItems={this.setItems}
          onPress={() => this.setState({ open: !open })}
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
  
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      marginBottom: 10,
    },
    
    dropdown: {
      backgroundColor: "crimson"
    }
  });