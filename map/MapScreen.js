import { View, Text, StyleSheet, Pressable,Image } from "react-native";
import Button from '../components/Button';
import EventList from '../components/EventList';
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
// import { getCurrentPositionAsync } from "expo-location";
import { MAPS_API_KEY } from '@env';

export default function MapScreen({route,navigation}) {
 
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
      const currentPosition = await Location.getCurrentPositionAsync();
      console.log(currentPosition);
      setCurrentLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  };


  function buttonPressed() {
    navigation.navigate("EventDetailPage");
  }
  return (
    <View>

      <Text>MapScreen</Text>
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && <Marker coordinate={currentLocation} />}
      </MapView>
<View style={styles.list}>
      <EventList isAll={true}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    height: "40%",
  },
  list: {
    // flex: 1,
    height: "50%",
  }

});