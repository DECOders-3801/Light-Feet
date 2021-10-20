import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import BottomNavigator from './BottomNavigator'

// Manages initial screen stack (Login, Signup, Bottom tab navigator - which includes more navigators)
const navigator = createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions:{
        headerShown:false,
      }
    },
      
    Signup: {
      screen: SignupScreen,
      navigationOptions:{
        headerTitle:'Sign up',
        headerStyle: {
          backgroundColor: '#24BA83',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    },

    BottomNavigator: {
      screen: BottomNavigator,
      navigationOptions:{
        headerShown:false,
      }
    }
  }
);

export default createAppContainer(navigator);