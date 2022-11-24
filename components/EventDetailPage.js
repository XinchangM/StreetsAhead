import { View, Text,FlatList,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import { doc,collection, onSnapshot, query, where,documentId} from "firebase/firestore";
import PostItem from './PostItem';
export default function EventDetailPage({route,navigation}) {
  const [event, setEvent] = useState();
  const [posts, setPosts]=useState([]);
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

  let isDoc=false;
  if(event!=undefined){
    isDoc=true;
  }

  let isPost=false;
  if(posts!=[]){
    isPost=true;
  }

  return (
    <View>
      <Text>EventDetailPage</Text>
    
{isDoc&&
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

      {isPost&&
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
  v1: {
    height:'20%',
    backgroundColor:"lavender"
  },
  v2: {
    height:'80%',
    backgroundColor:"mistyrose"
  },
});