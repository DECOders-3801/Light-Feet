# Run

The Light Feet mobile app was built using Expo in Visual Studio Code.
The Expo Go app on iOS or Android was used to test the app.

To run the app, enter one of the following in the terminal:
```shell
npm start
yarn start
expo start
```

A window will pop up with options on how to run the app:
- Run on Android device/emulator. For example, connect your Android device via USB and open the Expo Go app.
- Run on iOS simulator (XCode may need to be installed)
- Not applicable: Run in web browser
- RECOMMENDED: Scan the QR code on an iOS or Android device which will open the Expo Go app.

# Install

If this the 1st time you are running this project:

Assuming [Node.js/npm](https://nodejs.org/en/) is installed: change directory
to the project folder and run the following commands in your terminal:

```shell
npm install --global expo-cli
npm install --global yarn
npm install
expo install expo-sqlite
npm install @react-navigation/native
npm install @react-navigation/native-stack

npm install react-navigation
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install react-navigation-stack @react-native-community/masked-view
npm install react-native-elements

npm install react-native-dropdown-picker
npm install --save victory-native
react-native install react-native-svg

npm install @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons
npm install fiction-expo-restart
npm install react-native-table-component
npm install react-native-keyboard-aware-scroll-view
```


# Source code

The components (screens) are:
- HistoryScreen.js
- JourneyRecorder.js
- LoginScreen.js
- ProfileScreen.js
- RewardScreen.js
- SignupScreen.js
- WelcomeScreen.js

The screen navigators are:
- App.js
- BottomNavigator.js
- HomeNavigator.js


# Note: Edit README.md every time we use a new library/add-on or add new .js files.
