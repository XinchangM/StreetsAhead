import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Colors from './Colors';
//event option = 1:linkable; 2:managable; 3:view only
export default function EventItem({ event, option }) {
  const startTimestamp = event.startTime.seconds * 1000 + event.startTime.nanoseconds / 1000000;
  const startTimeObject = new Date(startTimestamp);
  const startTimeString = startTimeObject.toString();
  // To get year,month, day, hour.... use startTimeObject.getXXX()
  const endTimestamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
  const endTimeObject = new Date(endTimestamp);
  const endTimeString = endTimeObject.toString();
  const timeString = startTimeObject.getFullYear() + "/" + (startTimeObject.getMonth() + 1).toString() + "/" + startTimeObject.getDate() + " " +
   startTimeObject.getHours() + ":" + startTimeObject.getMinutes() + " - " +
    endTimeObject.getFullYear() + "/" + (endTimeObject.getMonth() + 1).toString() +
     "/" + endTimeObject.getDate() + " " + endTimeObject.getHours() + ":" + endTimeObject.getMinutes();


  const navigation = useNavigation();


  function eventItemPressed() {
    navigation.navigate("EventDetailPage", {
      eventId: event.key,
      isManagable: false
    });
  }
  function linkPressed() {
    navigation.navigate("CameraNextStepPage", {
      eventId: event.key
    });
  }

  function managePressed() {
    navigation.navigate("EventDetailPage", {
      eventId: event.key,
      isManagable: true
    });
  }
  return (
    <View>
      {option == 1 &&
        <Pressable
          onPress={linkPressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.eventName}</Text>
            <Text>{timeString}</Text>
            <Text>Performers: {event.performer}</Text>
            {/*       <Text>eventId: {event.key}</Text>
      <Text>StartTime: {event.startTime.seconds}</Text>
      <Text>EndTime: {event.endTime.seconds}</Text>
      <Text>Longitude: {event.coordinate.longitude}</Text>
      <Text>Latitude: {event.coordinate.latitude}</Text>
      <Text>Performer: {event.performer}</Text>
      <Text>User Id: {event.userId}</Text>
      <Text>Event Name: {event.eventName}</Text> */}
          </View>
        </Pressable>
      }
      {option == 2 &&
        <Pressable
          onPress={managePressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.eventName}</Text>
            <Text>{timeString}</Text>
            <Text>Performers: {event.performer}</Text>
            {/*       <Text>eventId: {event.key}</Text>
      <Text>StartTime: {startTimeString}</Text>
      <Text>EndTime: {endTimeString}</Text>
      <Text>Longitude: {event.coordinate.longitude}</Text>
      <Text>Latitude: {event.coordinate.latitude}</Text>
      <Text>Performer: {event.performer}</Text>
      <Text>User Id: {event.userId}</Text>
      <Text>Event Name: {event.eventName}</Text> */}
          </View>
        </Pressable>
      }


      {option == 3 &&
        <Pressable
          onPress={eventItemPressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.eventName}</Text>
            <Text>{timeString}</Text>
            <Text>Performers: {event.performer}</Text>
            {/*         <Text>eventId: {event.key}</Text>
        <Text>StartTime: {event.startTime.seconds}</Text>
        <Text>EndTime: {event.endTime.seconds}</Text>
        <Text>Longitude: {event.coordinate.longitude}</Text>
        <Text>Latitude: {event.coordinate.latitude}</Text>
        <Text>Performer: {event.performer}</Text>
        <Text>User Id: {event.userId}</Text>
        <Text>Event Name: {event.eventName}</Text> */}
          </View>
        </Pressable>
      }

    </View>
  )
}
const styles = StyleSheet.create({

  eventItem: {
    backgroundColor: Colors.lightPurple,
    padding: 5,
    margin: 10
  },
  pressed: {
    opacity: 0.75,
  },
  eventTitle:{
    fontSize:24
  }
});