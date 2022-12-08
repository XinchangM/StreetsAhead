import { View, Text, FlatList, StyleSheet, Pressable, Alert, ImageBackground,SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import { deleteEventFromDB } from "../firebase/firestore";
import { doc, collection, onSnapshot, query, where, documentId } from "firebase/firestore";
import PostItem from './PostItem';
import Button from "./Button";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { deviceHeight, deviceWidth } from "../styles/responsive";

export default function EventDetailPage({ route, navigation }) {

  const [event, setEvent] = useState();
  const [startString, setStartString] = useState();
  const [endString, setEndString] = useState();
  const [timeString, setTimeString] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState()
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
          onPress: () => { },
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteEventFromDB(route.params.eventId);
              navigation.goBack();
              Alert.alert("Success","Successfully deleted!")
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
    //console.log(route.params.isManagable);
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
    if (event) {
      const startTimeStamp = event.startTime.seconds * 1000 + event.startTime.nanoseconds / 1000000;
      const startTimeObject = new Date(startTimeStamp);
      setStartString(startTimeObject.toString());
      const endTimeStamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
      const endTimeObject = new Date(endTimeStamp);
      setEndString(endTimeObject.toString());
      setStartTime(startTimeObject.getHours()+ " : " + startTimeObject.getMinutes());
      setEndTime(endTimeObject.getHours()+" : " + endTimeObject.getMinutes());
      setTimeString(startTimeObject.getFullYear() + "/" + (startTimeObject.getMonth() + 1).toString() + "/" + startTimeObject.getDate() + " " +
        startTimeObject.getHours() + ":" + startTimeObject.getMinutes() + " - " +
        endTimeObject.getFullYear() + "/" + (endTimeObject.getMonth() + 1).toString() +
        "/" + endTimeObject.getDate() + " " + endTimeObject.getHours() + ":" + endTimeObject.getMinutes());
    }
  }, [event]);

  return (
   
  
      <View>
 



      {isPostExist &&
        <View style={styles.postList}>
          <FlatList
            ListHeaderComponent= {    
              <View>
              {isEventExist &&
              <ImageBackground source={require("../assets/images/ticket.png")} style={{height: deviceHeight/1.5}}>
                <View style={styles.infos}>
                  <Text style={styles.title}>{event.eventName}</Text>
                  <Text style={styles.text}>Performers: {event.performer}</Text>
                  <View style={styles.timeBar}>
                    <View style={styles.timeWrap}>
                      <Text style={styles.timeText}>{startTime}</Text>
                      <Text style={styles.timeText}>{endTime}</Text>
                    </View>
                  </View>
            
                  </View>
                </ImageBackground>}


                {route.params.isManagable &&
        <View style={styles.buttonsContainer}>
          <Pressable onPress={onEditEvent}><FontAwesome name="edit" size={24} color="black" /></Pressable>
          <Pressable onPress={onDeleteEvent}><AntDesign name="delete" size={24} color="black" /></Pressable>
        </View>
      }
                </View>
            }
            data={posts}
            renderItem={({ item }) => {
         
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
  title: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    marginBottom:20,
  },
  text: {
    textAlign: 'center',
    // alignContent:"center",
  },
  timeBar: {
    height: deviceHeight/8,
    width: deviceWidth/1.5,
    borderRadius:10,
    backgroundColor: "white",
    alignSelf: 'center',
    marginBottom:20,
    marginTop:20,
  },
  timeWrap:{
    marginTop:20,
    alignItems:"stretch",
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  timeText: {
    fontSize:30,
  },
  buttonsContainer: {
    justifyContent: "space-around",
    flexDirection: 'row',
  },
  infos: {
    marginTop:100,
    marginHorizontal: 30,
    marginVertical: 10

  },
  postList: {
    marginVertical: 20,
    alignItems: 'center',
  },
});