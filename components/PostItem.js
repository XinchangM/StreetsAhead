import { View, Text,StyleSheet,Button,Image } from 'react-native'
import React from 'react'
import { Video, AVPlaybackStatus } from 'expo-av';
import {deletePostFromDB} from "../firebase/firestore";
//postItem option=1:on event detail page, can not delete; 2:on postHistory, can delete
export default function PostItem({post,option}) {
  const timestamp=post.postTime.seconds*1000+post.postTime.nanoseconds/1000000;
  const date=new Date(timestamp);

  const dateString=date.toString();
  const year=date.getFullYear();
  const month=date.getMonth();
  const day=date.getDay();
  const hour=date.getHours();
  const minute=date.getMinutes();
  const second=date.getSeconds();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const onDelete= async () => {
    try{
    deletePostFromDB(post.key);
    alert("Successfully deleted!")
    }catch(err){
      console.log(err)
    }
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
  
      <Text>PostTime: {dateString}</Text>
      <Text>TimeDetail: Year:{year} Month:{month} Day:{day} Hour:{hour} minute:{minute} second:{second}</Text>
      <Text>Post User Id: {post.userId}</Text>
      <Text>Associated Event Id: {post.linkedEventId}</Text>
      <Text>Comment: {post.comment}</Text>
      {option==2&&<Button title={"Delete this post"} onPress={onDelete}/>}
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