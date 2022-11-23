import { View, Text,Pressable,StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Colors from './Colors';
export default function EventItem({event,isLinkable}) {
  const navigation = useNavigation();
  
  function eventItemPressed() {
    navigation.navigate("EventDetailPage", {
      eventId: event.key
    });
  }
  function linkPressed() {
    navigation.navigate("CameraNextStepPage", {
      eventId: event.key
    });
  }

  function managePressed() {
    navigation.navigate("ManageEventPage", {
      eventId: event.key
    });
  }
  return (
    <View>
      {isLinkable?
      <Pressable
      onPress={linkPressed}
      style={({ pressed }) => {
        return pressed && styles.pressed;
      }}
    >
       <View style={styles.eventItem}>
      <Text>eventId: {event.key}</Text>
      <Text>StartTime: {event.startTime.seconds}</Text>
      <Text>EndTime: {event.endTime.seconds}</Text>
      <Text>Longitude: {event.coordinate.longitude}</Text>
      <Text>Latitude: {event.coordinate.latitude}</Text>
      <Text>Performer: {event.performer}</Text>
      <Text>User Id: {event.userId}</Text>
      <Text>Event Name: {event.eventName}</Text>
      </View>
      </Pressable>
      :


        
        
        <Pressable
        onPress={eventItemPressed}
        style={({ pressed }) => {
          return pressed && styles.pressed;
        }}
      >
         <View style={styles.eventItem}>
        <Text>eventId: {event.key}</Text>
        <Text>StartTime: {event.startTime.seconds}</Text>
        <Text>EndTime: {event.endTime.seconds}</Text>
        <Text>Longitude: {event.coordinate.longitude}</Text>
        <Text>Latitude: {event.coordinate.latitude}</Text>
        <Text>Performer: {event.performer}</Text>
        <Text>User Id: {event.userId}</Text>
        <Text>Event Name: {event.eventName}</Text>
        </View>
        </Pressable>
      }
          
    </View>
  )
}
const styles = StyleSheet.create({
  eventItem:{
    backgroundColor:Colors.lightPurple,
    padding:5,
    margin:10
  },
  pressed: {
    opacity: 0.75,
  },
});