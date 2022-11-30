import { View, Text,StyleSheet,Button,Image } from 'react-native'
import React from 'react'
import { Video, AVPlaybackStatus } from 'expo-av';
import {deletePostFromDB} from "../firebase/firestore";

export default function PostItem({post}) {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  function onDelete(){
    deletePostFromDB(post.key);
  }
  return (
    <View style={styles.item}>
      <Text>Video/Image: </Text>
     {post.mediaType=="photo"&&
      <Image source={{uri: post.mediaUri}}  
       style={{width: 320, height: 400}}
      />   }
   {post.mediaType=="video"&&
      <View style={styles.container}>
        
    
       <Video
        ref={video}
        style={styles.video}
        source={{uri:post.mediaUri}}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> 
    </View>}
  
      <Text>PostTime: {post.postTime.toString()}</Text>
      <Text>Post User Id: {post.userId}</Text>
      <Text>Associated Event Id: {post.linkedEventId}</Text>
      <Text>Comment: {post.comment}</Text>
      <Button title={"Delete this post"} onPress={onDelete}/>
    </View>
  )
}

const styles = StyleSheet.create({
  item:{
    backgroundColor:"thistle",
    margin:15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
});