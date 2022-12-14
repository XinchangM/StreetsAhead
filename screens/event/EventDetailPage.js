import { View, Text, FlatList, StyleSheet, Pressable, Alert, ImageBackground, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, auth } from "../../firebase/firebase-setup";
import { deleteEventFromDB } from "../../firebase/firestore";
import { doc, collection, onSnapshot, query, where, documentId } from "firebase/firestore";
import PostItem from '../../components/PostItem';
import TipIcon from "../../components/TipIcon";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { deviceHeight, deviceWidth, moderateScale } from "../../styles/Responsive";
import Colors from '../../styles/Colors';

export default function EventDetailPage({ route, navigation }) {

  const [event, setEvent] = useState();

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
              Alert.alert("Success", "Successfully deleted!")
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
      const endTimeStamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
      const endTimeObject = new Date(endTimeStamp);
      const monthNames = ["JAN. ", "FEB. ", "MAR. ", "APR. ", "MAY ", "JUN. ",
        "JUL. ", "AUG. ", "SEPT. ", "OCT. ", "NOV. ", "DEC. "];

      const startHour = startTimeObject.getHours() < 10 ? ("0" + startTimeObject.getHours().toString()) : startTimeObject.getHours().toString();
      const startMinute = startTimeObject.getMinutes() < 10 ? ("0" + startTimeObject.getMinutes().toString()) : startTimeObject.getMinutes().toString();
      setStartTime(startHour + ":" + startMinute);
      const startTimeDateString = startTimeObject.getDate() < 10 ?
        ("0" + startTimeObject.getDate().toString()) :
        startTimeObject.getDate().toString();
      setStartDate(monthNames[endTimeObject.getMonth()] + startTimeDateString);
      const endTimeDateString = endTimeObject.getDate() < 10 ?
        ("0" + endTimeObject.getDate().toString()) :
        endTimeObject.getDate().toString();
      setEndDate(monthNames[endTimeObject.getMonth()] + endTimeDateString);
      const endHour = endTimeObject.getHours() < 10 ? ("0" + endTimeObject.getHours().toString()) : endTimeObject.getHours().toString();
      const endMinute = endTimeObject.getMinutes() < 10 ? ("0" + endTimeObject.getMinutes().toString()) : endTimeObject.getMinutes().toString();
      setEndTime(endHour + ":" + endMinute);
    }
  }, [event]);

  return (

    <View style={styles.container}>
      {isPostExist &&
        <View style={styles.postList}>
          <FlatList
            ListHeaderComponent={
              <View>
                {isEventExist &&
                  <ImageBackground source={require("../../assets/images/ticket.png")} style={{ height: deviceHeight / 1.5 }}>
                    <TipIcon />
                    <View style={styles.infos}>
                      <Text style={styles.title}>{event.eventName}</Text>
                      <Text style={styles.text}>{event.performer}</Text>
                      <View style={styles.timeBar}>
                        <View style={styles.timeWrap}>
                          <Text style={styles.timeText}>{startTime}</Text>
                          <Text style={styles.timeText}>{endTime}</Text>
                        </View>
                        <View style={styles.dateWrap}>
                          <Text style={styles.dateText}>{startDate}</Text>
                          <Text style={styles.dateText}>{endDate}</Text>
                        </View>
                      </View>
                    </View>
                    {route.params.isManagable &&
                      <View style={styles.buttonsContainer}>
                        <Pressable
                          style={({ pressed }) => pressed ? styles.pressed : styles.management}
                          onPress={onEditEvent}><MaterialCommunityIcons name="data-matrix-edit" size={30} color={Colors.pink} />
                          <Text style={styles.manageText}>Edit Event</Text>
                        </Pressable>
                        <Pressable
                          style={({ pressed }) => pressed ? styles.pressed : styles.management}
                          onPress={onDeleteEvent}><MaterialIcons name="delete-forever" size={30} color={Colors.pink} />
                          <Text style={styles.manageText}>Delete Event</Text>
                        </Pressable>
                      </View>
                    }
                  </ImageBackground>}


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
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  title: {
    textAlign: "center",
    fontSize: moderateScale(40),
    padding: moderateScale(5),
    fontWeight: "bold",
    bottom: moderateScale(80),
    marginBottom: moderateScale(5),
    color: Colors.pink,
    position: "relative"
  },
  text: {
    width: 200,
    textAlign: 'center',
    // alignContent:"center",
    bottom: moderateScale(70),
    fontSize: moderateScale(16),
    color: Colors.white,
  },
  timeBar: {
    bottom: moderateScale(60),
    height: deviceHeight / 7,
    width: deviceWidth / 1.5,
    borderRadius: 5,
    backgroundColor: Colors.whiteOpacity50,
    alignSelf: 'center',
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20)
  },
  timeWrap: {
    marginTop: moderateScale(20),
    padding: moderateScale(10),
    alignItems: "stretch",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeText: {
    fontSize: moderateScale(30),
    color: Colors.pink
  },
  dateText: {
    fontSize: moderateScale(17),
    color: Colors.pink
  },
  dateWrap: {
    padding: moderateScale(10),
    alignItems: "stretch",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    height: deviceHeight / 8,
    width: deviceWidth / 1.5,
    backgroundColor: Colors.green,
    alignSelf: 'center',

    justifyContent: "space-around",
    flexDirection: 'row',

  },
  infos: {
    marginTop: moderateScale(100),
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center'

  },
  postList: {
    marginVertical: 20,
    alignItems: 'center'
  },
  management: {
    alignItems: "center",
    backgroundColor: Colors.green,
    width: 100,
    paddingVertical: 10,
    borderRadius: 5

  },
  manageText: {
    color: Colors.pink
  },
  pressed: {
    opacity: 0.5,
    alignItems: "center",
    backgroundColor: Colors.pinkOpacity50,
    width: 100,
    paddingVertical: 10,
    borderRadius: 5
  }
});