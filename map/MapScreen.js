import { View, Text, StyleSheet, Pressable, Image,TouchableOpacity } from "react-native";
import Button from '../components/Button';
import EventList from '../components/EventList';
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState, useRef} from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from '@env';
import imagePath from "../constants/imagePath";
import { getEvent } from "../firebase/firestore";
import { firestore, auth } from "../firebase/firebase-setup";
import { collection, onSnapshot } from "firebase/firestore";

export default function MapScreen({route, navigation}) {
 
  const [currentLocation, setCurrentLocation] = useState();
  const [permissionResponse, requestPermission] =Location.useForegroundPermissions();
  const [region, setRegion] = useState();



  const mapRef = useRef(null)
  const onCenter = () => {
    console.log("1111",mapRef)
   
}
  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
let currentPosition;
//console.log("++++",currentLocation);
  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      currentPosition = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      setCurrentLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      //console.log("------",currentPosition);
      mapRef.current.animateToRegion({
        latitude:currentLocation.latitude,
        longitude:currentLocation.longitude,
        latitudeDelta: 0.020,
        longitudeDelta: 0.020,
      });
      console.log("++++",currentLocation);
    } catch (err) {
      console.log("locate user ", err);
    }
  };
 





  
  console.log("!!",region)
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
  
  function buttonPressed() {
    navigation.navigate("EventDetailPage");
  }
  return (
    <View>
      <Button title="Locate Me!" onPress={locateUserHandler} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation
            ? currentLocation.latitude
            : 49.26242,
          longitude: currentLocation
            ? currentLocation.longitude
            : -123.222,
          latitudeDelta: 0.020,
          longitudeDelta: 0.020,
        }}
        ref={mapRef}>
       {events.map((event,i) => {
          return (
          <Marker key={event.key}
                coordinate={event.coordinate}/>)})}
      {currentLocation && <Marker coordinate={currentLocation} />}
      </MapView> 

      
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    height: "100%",
  },
  list: {
    // flex: 1,
    height: "50%",
  },
  bottomView: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  navigationView: {
    width: 1,
    height: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center'
}
});