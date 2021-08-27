import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }

  onSignup() {
    return (
      <View style={styles.container}> 
        <Text style={styles.heading}>CO2 Visualiser</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          color= 'white'
          placeholder={'Username'}
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput 
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          color= 'white'
          placeholder={'Password'}
          placeholderTextColor='white'
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.heading}>CO2 Visualiser</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          color= 'white'
          placeholder={'Username'}
          placeholderTextColor='white'
          style={styles.input}
        />
        <TextInput 
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          color= 'white'
          placeholder={'Password'}
          placeholderTextColor='white'
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />

        <Button
          title={'Sign Up for an Account'}
          style={styles.input}
          onPress={this.onSignup.bind(this)}
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


});