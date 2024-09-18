import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import VideoPlayer from '../components/VideoPlayer';
type LaunchDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;
type LaunchDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LaunchDetails'>;

interface Props {
  route: LaunchDetailsScreenRouteProp;
  navigation: LaunchDetailsScreenNavigationProp;
}

const LaunchDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { launch } = route.params;


  return (
    <View style={styles.container}>
      <Text>Date: {new Date(launch.date_utc).toLocaleDateString()}</Text>
    
      {launch.details && <Text>Details: {launch.details}</Text>}
      {launch.links.youtube_id && (
        <VideoPlayer youtubeId={launch.links.youtube_id}/>
      )}
      <Button
      title={launch.links.article? 'Read Article' : 'No article available'}
      disabled={!launch.links.article}
      onPress={() => navigation.navigate('WebViewScreen', { url: launch.links.article, webViewName: 'Article' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
   },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default LaunchDetailsScreen;
