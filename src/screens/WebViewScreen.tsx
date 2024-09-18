import React from 'react';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebViewScreen'>;

interface Props {
  route: WebViewScreenRouteProp;
}

const WebViewScreen: React.FC<Props> = ({ route }) => {
  const { url } = route.params;

  return <WebView source={{ uri: url }} />;
};

export default WebViewScreen;
