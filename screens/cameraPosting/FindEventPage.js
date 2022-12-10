import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, auth } from "../../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Button from '../../components/Button';
import EventItem from "../../components/EventItem"
import * as Location from "expo-location";
import '../../styles/Colors'

export default function FindEventPage({ route, navigation }) {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState();
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();


  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "events"),
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
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder=' Search here'
          onChangeText={(newQuery) => {
            setQuery(newQuery.toLowerCase());
          }}
          value={query}
        />
      </View>
      <View style={styles.list}>
        <View style={styles.c1}>

          <FlatList
            data={events.filter((event) => {
              return event.eventName.toLowerCase().includes(query)
            })}
            renderItem={({ item }) => {
              return <EventItem event={item} option={1} />;
            }}
            //for android
            overScrollMode={"always"}
          /></View>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue
  },
  list: {
    height: "100%",
  },
  searchBar: {
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 8,
    fontSize: 16
  }
});