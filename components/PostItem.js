import { View, Text, StyleSheet, Button, Image, Pressable,Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Video, AVPlaybackStatus } from 'expo-av';
import { deletePostFromDB } from "../firebase/firestore";
import { firestore, auth } from "../firebase/firebase-setup";
import { AntDesign } from '@expo/vector-icons'; 
import { doc, collection, onSnapshot, query, where, documentId } from "firebase/firestore";
//postItem option=1:on event detail page, can not delete; 2:on postHistory, can delete
export default function PostItem({ post, option }) {
  const timestamp = post.postTime.seconds * 1000 + post.postTime.nanoseconds / 1000000;
  const date = new Date(timestamp);
  const dateString = date.toString();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const timeString = year.toString() + "/" + month.toString() + "/" + day.toString() + " " + hour.toString() + ":" + minute.toString() + ":" + second.toString();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [user, setUser] = useState();

  useEffect(() => {
    const uns = onSnapshot(
      query(
        collection(firestore, "users"),
        where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setUser([]);
          return;
        }

        setUser(querySnapshot.docs[0].data())

      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      uns();
    };
  }, []);

  const onDelete = async () => {
    Alert.alert(
      "Important",
      "Are you sure you want to delete this event?",
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: async() => {
            try {
              deletePostFromDB(post.key);
              alert("Successfully deleted!")
            } catch (err) {
              console.log(err)
            }
          },
        },
      ]
    );

  }
  return (
        <View style={styles.item}>
            <View style={styles.center}>
              <View style={styles.behind}>
                    <View >
                      {post.mediaType == "photo" &&
                        <Image source={{ uri: post.mediaUri }}
                          style={{ width: 320, height: 400 }}
                        />
                      }
                      {post.mediaType == "video" &&
                        <View style={styles.container}>
                          <Video
                            ref={video}
                            style={styles.video}
                            source={{ uri: post.mediaUri }}
                            useNativeControls
                            resizeMode="cover"
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                          /></View>
                      }
                    </View>
              </View>
              {<View style={styles.bottomSection}> 
                <View style={styles.info}>
                
                {user && <Text style={styles.text}>{user.userName}</Text>}
                <Text style={styles.text}>{post.comment}</Text>
                <Text style={styles.text}>{timeString}</Text>
                </View>
                <View style={styles.delete}> 
                  {option == 2 && 
                  <Pressable onPress={onDelete}>
                    <AntDesign name="delete" size={24} color="white" />
                  </Pressable>}
                  </View>
                       
              </View>}

            </View>
   
          </View>  


  )
}

const styles = StyleSheet.create({
bottomSection:{
flexDirection:"row",
justifyContent:"space-between"
},
info:{
  //flexDirection:"column",
  //justifyContent:"flex-start"
},
delete:{
  //flexDirection:"column",
  justifyContent:"center"
},
  con: {
  
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  center: {
   
    width: '100%',
    height: '100%',
    height:400,
    //alignItems: 'center',
    justifyContent: 'flex-end',
  
    flexDirection:'column',
    flex:"0.2",
    bottom:0
  },
  behind: {
    
    alignItems: 'center',
    //justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 400,

  },

  item: {
    
    margin: 15,
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width:320,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
   
  },
  video: {
    
    alignSelf: 'center',
    width: 320,
    height: 400,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:"white"
  }

});