import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker,Callout } from "react-native-maps";
import React, { useEffect, useState, useRef} from "react";
import * as Location from "expo-location";
import { firestore } from "../../firebase/firebase-setup";
import { collection, onSnapshot } from "firebase/firestore";
import Circulerbtn from "../../components/CirculerBtn";

export default function MapScreen({route, navigation}) {
 
  const [currentLocation, setCurrentLocation] = useState({longitude:49.26242,latitude:-123.222});
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
      console.log("++++",currentLocation);
    } catch (err) {
      console.log("locate user ", err);
    }
  };

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude:currentLocation.latitude,
      longitude:currentLocation.longitude,
      latitudeDelta: 0.020,
      longitudeDelta: 0.020,
    });
  },[currentLocation]);

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
  

  function onPressMarker(key){
    navigation.navigate("EventDetailPage", {
      eventId: key
    });
  }
  return (
    <View>
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
                identifier={event.key}
                coordinate={event.coordinate}
                onPress={e => onPressMarker(e.nativeEvent.id)}
                />)})}
         
      {currentLocation && 
      <Marker 
      coordinate={currentLocation}
      pinColor="black"
      />}
      </MapView> 
      <View style={styles.bottomView}>
              {/* <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}> */}
                   
                    <TouchableOpacity onPress={onCenter} style={styles.navigationView}>
                        {/* <Image /> */}
                        
                    </TouchableOpacity>
                    <Circulerbtn onPress={locateUserHandler} />

                {/* </View> */}
            </View>
      
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
    alignItems: 'center',
  },
  navigationView: {
    width: 1,
    height: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center'
}
});