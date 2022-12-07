import { View, Text, FlatList, StyleSheet, Pressable,Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import { deleteEventFromDB } from "../firebase/firestore";
import { doc, collection, onSnapshot, query, where, documentId } from "firebase/firestore";
import PostItem from './PostItem';
import Button from "./Button";
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
export default function EventDetailPage({ route, navigation }) {

  const [event, setEvent] = useState();
  const [startTimeString, setStartTimeString] = useState();
  const [endTimeString, setEndTimeString] = useState();
  const [timeString, setTimeString] = useState();
  const [posts, setPosts] = useState([]);
  function onEditEvent() {
    navigation.navigate("ManageEventPage", {
      eventId: route.params.eventId
    });
  }
  const onDeleteEvent = async () => {
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
              await deleteEventFromDB(route.params.eventId);
              navigation.goBack();
              alert("Successfully deleted!")
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );

  }
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "events", route.params.eventId),
      (doc) => {
        setEvent(doc.data());

      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(route.params.isManagable);
    const uns = onSnapshot(
      query(
        collection(firestore, "posts"),
        where("linkedEventId", "==", route.params.eventId)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setPosts([]);
          return;
        }
        setPosts(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      uns();
    };
  }, []);





  let isEventExist = false;

  if (event != undefined) {
    isEventExist = true;
  }


  let isPostExist = false;

  if (posts != []) {
    isPostExist = true;
  }




  useEffect(() => {
    if (event != undefined) {
      const startTimeStamp = event.startTime.seconds * 1000 + event.startTime.nanoseconds / 1000000;
      const startTimeObject = new Date(startTimeStamp);
      setStartTimeString(startTimeObject.toString());
      const endTimeStamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
      const endTimeObject = new Date(endTimeStamp);
      setEndTimeString(endTimeObject.toString());
      setTimeString(startTimeObject.getFullYear() + "/" + (startTimeObject.getMonth() + 1).toString() + "/" + startTimeObject.getDate() + " " +
      startTimeObject.getHours() + ":" + startTimeObject.getMinutes() + " - " +
       endTimeObject.getFullYear() + "/" + (endTimeObject.getMonth() + 1).toString() +
        "/" + endTimeObject.getDate() + " " + endTimeObject.getHours() + ":" + endTimeObject.getMinutes());
    }
  }, [event]);

  return (
    <View>
 
      {isEventExist &&
        <View style={styles.infos}>
          <Text style={styles.title}>{event.eventName}</Text>
          <Text style={styles.text}>Time: {timeString}</Text>
          {/* <Text>eventId: {route.params.eventId}</Text> */}

          {/*     <Text>Longitude: {event.coordinate.longitude}</Text>
      <Text>Latitude: {event.coordinate.latitude}</Text> */}
          <Text style={styles.text}>Performers: {event.performer}</Text>
          {/* <Text>User Id: {event.userId}</Text> */}
          
        </View>}

        {route.params.isManagable &&
        <View style={styles.buttonsContainer}>
<Pressable onPress={onEditEvent}><FontAwesome name="edit" size={24} color="black" /></Pressable>      
<Pressable onPress={onDeleteEvent}><AntDesign name="delete" size={24} color="black" /></Pressable> 
        </View>
      }

      {isPostExist &&
        <View style={styles.postList}>
          <FlatList
            data={posts}
            renderItem={({ item }) => {
              // console.log(item);
              return (
                <PostItem
                  post={item}
                  option={1}
                />
              );
            }}

          ></FlatList>
        </View>
      }


    </View>
  )
}

const styles = StyleSheet.create({
  title:{
    textAlign:"center",
    fontSize:24,
    padding:10,
  
  },
  text:{
    textAlign:'center'
  },
  buttonsContainer: {
  justifyContent:"space-around",
    flexDirection: 'row',

  },
  infos: {
    marginHorizontal:30,
    marginVertical:10
   
  },
  postList: {
    marginVertical:20,
    alignItems: 'center',

  },
});