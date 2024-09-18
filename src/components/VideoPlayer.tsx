import { StyleSheet, View, } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export type VideoProps = {
    youtubeId: string
    
  }
const VideoPlayer: React.FC<VideoProps> = ({ youtubeId }) => {

  return (
    <View style={styles.contentContainer} testID="video-player">
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
});
export default VideoPlayer;