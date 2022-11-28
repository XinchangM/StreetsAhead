import { View, Text,FlatList,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Button from '../components/Button';
import EventItem from "../components/EventItem"
import * as Location from "expo-location";

export default function FindEventPage({route,navigation}) {



  const [currentLocation, setCurrentLocation] = useState();
  const [permissionResponse, requestPermission] =Location.useForegroundPermissions();

  
  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const currentPosition = await Location.getCurrentPositionAsync({enableHighAccuracy:true});

      setCurrentLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  };


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
let isShow=false;
  if(currentLocation!=undefined){
    isShow=true;
  }





  return (
    <View>
      <Text>FindEventPage</Text>
      <Button onPress={locateUserHandler} title={"Find events near me"}/>
      <View style={styles.list}>
      {isShow&&
      <View>
      <Text>Hi</Text>
      <FlatList
          data={events.filter((event) => {
            return (Math.abs(event.coordinate.latitude-currentLocation.latitude)<20 && Math.abs(event.coordinate.longitude-currentLocation.longitude)<20) ;
          })}
          renderItem={({ item }) => {
            return <EventItem event={item} isLinkable={true}/>;
          }}
          //for android
          overScrollMode={"always"}
        /></View>}

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  list: {
    height:  "100%",
  },
});