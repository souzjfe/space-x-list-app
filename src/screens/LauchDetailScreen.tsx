import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { WebView } from 'react-native-webview';
type LaunchDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;

interface Props {
  route: LaunchDetailsScreenRouteProp;
}

const LaunchDetailsScreen: React.FC<Props> = ({ route }) => {
  const { launch } = route.params;
  console.log(launch);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {launch.name}</Text>
      <Text>Date: {new Date(launch.date_utc).toLocaleDateString()}</Text>
      <WebView
        style={{ height: 300 }}
        originWhitelist={['*']}
        source={{ uri: `https://www.youtube.com/embed/${launch.links.youtube_id}` }}
      />
      <Text>Details: {launch.details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default LaunchDetailsScreen;
