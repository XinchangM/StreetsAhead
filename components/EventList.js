import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import EventItem from "./EventItem";

export default function EventList({ isAll }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "events")
      ,
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setEvents([]);
          return;
        }
        setEvents(
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
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.eventList}>

      {isAll ? (
        <FlatList
          data={events}
          renderItem={({ item }) => {
            return <EventItem event={item} option={3} />;
          }}
          //for android
          overScrollMode={"always"}
        />
      ) : (
        <FlatList
          data={events.filter((event) => {
            return event.userId == auth.currentUser.uid;
          })}
          renderItem={({ item }) => {
            return <EventItem event={item} option={2} />;
          }}
          //for android
          overScrollMode={"always"}
        />
      )}

    </View>
  )
}
const styles = StyleSheet.create({
  eventList: {
    flex: 1,
    padding: 20,
  },
});