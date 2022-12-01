import { View, Text,FlatList,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import {deleteEventFromDB} from "../firebase/firestore";
import { doc,collection, onSnapshot, query, where,documentId} from "firebase/firestore";
import PostItem from './PostItem';
import Button from "./Button";
export default function EventDetailPage({route,navigation}) {
  const [event, setEvent] = useState();
  const [posts, setPosts]=useState([]);
  function onEditEvent(){
    navigation.navigate("ManageEventPage", {
      eventId: route.params.eventId
    });
  }
  const onDeleteEvent= async () => {
    try{
    await deleteEventFromDB(route.params.eventId);
    navigation.goBack();
    alert("Successfully deleted!")
    }catch(err){
      console.log(err);
    }
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
        where("linkedEventId", "==", route.params.eventId )
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

  let isEventExist=false;

  if(event!=undefined){
    isEventExist=true;
  }


  let isPostExist=false;

  if(posts!=[]){
    isPostExist=true;
  }

  return (
    <View>
    {route.params.isManagable&&
    <View style={styles.buttonsContainer}>
    <Button title={"Edit Event"}
    onPress={onEditEvent}
    />
    <Button title={"Delete Event"}
    onPress={onDeleteEvent}
    />
    </View>
    }
{isEventExist&&
<View style={styles.v1}>
      <Text>eventId: {route.params.eventId}</Text>
      <Text>StartTime: {event.startTime.seconds}</Text>
      <Text>EndTime: {event.endTime.seconds}</Text>
      <Text>Longitude: {event.coordinate.longitude}</Text>
      <Text>Latitude: {event.coordinate.latitude}</Text>
      <Text>Performer: {event.performer}</Text>
      <Text>User Id: {event.userId}</Text>
      <Text>Event Name: {event.eventName}</Text>
      </View>}

      {isPostExist&&
      <View style={styles.v2}>
        <Text>PostList</Text>
      <FlatList
      data={posts}
      renderItem={({ item }) => {
        // console.log(item);
        return (
          <PostItem
            post={item}
           
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
  buttonsContainer:{
    
    flexDirection:'row'
  },
  v1: {
  
    backgroundColor:"lavender"
  },
  v2: {
   
    backgroundColor:"mistyrose"
  },
});