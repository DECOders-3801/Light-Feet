import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeNavigator from './HomeNavigator';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import RewardScreen from './RewardScreen';

// Manages bottom tab screens (Home stack, History, Rewards, Account details)
export default class BottomNavigator extends Component {
    
    constructor(props) {
      super(props);
      const { email, username, fname, lname } = this.props.navigation.state.params;
      this.state = {
        // to store data from database
        email: email,
        username: username,
        fname: fname,
        lname: lname,
      };
    }
  
    render() {
        const Tab = createMaterialBottomTabNavigator();
        return (
            <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#11DB8F"
                inactiveColor="white"
                barStyle={{ 
                backgroundColor: '#707070',
                height:80,
                alignItems: 'center',
                justifyContent:'center' }}>
            <Tab.Screen
                name="Home" 
                component={HomeNavigator} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    )
                }}
                initialParams={{ username: this.state.username }}
                />
            <Tab.Screen 
                name="History" 
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" color={color} size={26} />
                    )
                }}
                initialParams={{ username: this.state.username }}
                />
            <Tab.Screen 
                name="Rewards" 
                component={RewardScreen} 
                options={{
                    tabBarLabel: 'Rewards',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="gift" color={color} size={26} />
                    )
                }}
                initialParams={{ email: this.state.email, username: this.state.username,
                    fname: this.state.fname, lname: this.state.lname }}
            />
            <Tab.Screen 
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    )
                }} 
                initialParams={{ email: this.state.email, username: this.state.username,
                                 fname: this.state.fname, lname: this.state.lname }}
            />
            </Tab.Navigator>
        </NavigationContainer>
        );
    }
}