import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import LaunchDetailsScreen from './src/screens/LauchDetailScreen';
import { store } from './src/store';
import WebViewScreen from './src/screens/WebViewScreen';
import { LaunchData } from './src/dtos/spaceX/launches';

export type RootStackParamList = {
  Home: undefined;
  LaunchDetails: { launch: LaunchData };
  WebViewScreen: { url: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LaunchDetails" component={LaunchDetailsScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
