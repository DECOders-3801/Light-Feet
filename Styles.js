import { StyleSheet } from 'react-native';

// Contains styles for commonly used JSX elements
export default styles = StyleSheet.create({

  // For blue buttons such as 'Login' and 'Signup'
  blueBtn: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // For text on blue buttons
  blueBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },

  // For (big) green buttons such as 'Start' and + (add journey)
  greenBtn: {
    width: 200,
    height: 80,
    padding: 10,
    borderWidth: 1,
    backgroundColor:'#11DB8F',
    borderRadius: 20,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:100,
  },

  // For text on (big) green buttons
  greenBtnText: {
    fontSize: 36, 
    color: 'white', 
    fontWeight: 'bold'
  },

  // For red buttons such as 'Log out' and 'Clear history'
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

  redBtnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
  
});