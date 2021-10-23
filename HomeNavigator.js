import React, { Component } from 'react';
import { LogBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from './WelcomeScreen';
import JourneyRecorder from './JourneyRecorder';

// Manages screen stack for home screens (that is, Welcome and Journey recorder screens)
// https://codeflarelimited.com/blog/how-to-create-stack-navigator-using-a-class-component-in-react-native/
export default class HomeNavigator extends Component{
  constructor(props) {
    super(props);
    LogBox.ignoreLogs(['You should only render one navigator explicitly in your app']);
  }

  render() {
    const navigator = createStackNavigator({
      // Renamed from Welcome so that "Back" is shown in the Journey recorder
      Back: {
        screen: WelcomeScreen,
        navigationOptions: {
          headerShown: false,
        },
        params: { username: this.props.route.params.username, goalPoints: this.props.route.params.goalPoints }
      },
    
      JourneyRecorder: {
        screen: JourneyRecorder,
        navigationOptions:{
          headerTitle:'Journey recorder',
          headerStyle: {
            backgroundColor: '#24BA83',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        },
        params: { username: this.props.route.params.username,
                  totalPoints: this.props.route.params.totalPoints,
                  goalPoints: this.props.route.params.goalPoints }
      }
    },
    {
      initialRouteName: 'Back'
    });
    
    const AppContainer = createAppContainer(navigator)

    return(
      <AppContainer/>
    )
  }
}

// OLD VERSION
//
// const navigator = createStackNavigator({
//   Welcome: {
//     screen: WelcomeScreen,
//     navigationOptions:{
//       headerShown:false,
//     },
//     params: { username: this.props.navigation.state.params.username }
//   },

//   JourneyRecorder: {
//     screen: JourneyRecorder,
//     navigationOptions:{
//       headerTitle:'Journey recorder',
//       headerStyle: {
//         backgroundColor: '#24BA83',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       }
//     }
//   }
// },
// {
//   initialRouteName: 'Welcome'
// });

// const AppContainer = createAppContainer(navigator)