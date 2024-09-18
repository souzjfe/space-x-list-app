import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Alert } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


export type VideoProps = {
    youtubeId: string
    
  }
const VideoPlayer: React.FC<VideoProps> = ({ youtubeId }) => {

  

  return (
    <View style={styles.contentContainer}>
       <YoutubePlayer
        height={275}
        webViewStyle={styles.video}
        videoId={youtubeId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 320,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
export default VideoPlayer;