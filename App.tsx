import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import LaunchesListScreen from './src/screens/LaunchesListScreen';
import LaunchDetailsScreen from './src/screens/LaunchDetailsScreen';
import { store } from './src/store';
import WebViewScreen from './src/screens/WebViewScreen';
import { LaunchData } from './src/dtos/spaceX/launches';

export type RootStackParamList = {
  LaunchesListScreen: undefined;
  LaunchDetails: { launch: LaunchData };
  WebViewScreen: { url: string, webViewName: string };
};
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LaunchesListScreen" component={LaunchesListScreen} options={{title: 'Space X launches'}}/>
          <Stack.Screen name="LaunchDetails" component={LaunchDetailsScreen} options={({ route }) => ({title: route.params.launch.name})} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={({ route }) => ({title: route.params.webViewName})} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
