import React, { Component, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Location  from 'expo-location';
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
      ],
      location: null,
      errorMsg: null,
    };

    //this.setOpen = this.setOpen.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setState = this.setState.bind(this);
  }
  // mapComponent(){
  //   const [location, setLocation] = useState(null);
  //   const [errorMsg, setErrorMsg] = useState(null);
  
  //   useEffect(() => {
  //     (async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== 'granted') {
  //         setErrorMsg('Permission to access location was denied');
  //         return;
  //       }
  
  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     })();
  //   }, []);
  // }

  

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

  async componentDidMount() {
    try{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error){
      console.log(error);
    }
    
  }

    render() {
      const {open, value, items, location, errorMsg} = this.state;
      // const [location, setLocation] = useState(null);
      // const [errorMsg, setErrorMsg] = useState(null);
    
      // useEffect(() => {
      //   (async () => {
      //     let { status } = await Location.requestForegroundPermissionsAsync();
      //     if (status !== 'granted') {
      //       setErrorMsg('Permission to access location was denied');
      //       return;
      //     }
    
      //     let location = await Location.getCurrentPositionAsync({});
      //     setLocation(location);
      //   })();
      // }, []);
      
      return (
        
      <View style={styles.container}> 
        <MapView style={styles.map}>
          {location ? (
            <Marker coordinate={location} title="My location">
              <FontAwesome name="map-marker" size={40} color="#B12A5B" />
            </Marker>
          ):
            <Text>{errorMsg}</Text>
          }
        </MapView>
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
    },

    map: {
      marginBottom: 30,
      width: 1000,
      height: 500,
    },
  });