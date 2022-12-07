import { View, Text,StyleSheet } from 'react-native'

import Button from '../../components/Button';
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState,useRef } from "react";
import * as Location from "expo-location";

export default function ChoosePositionPage({route,navigation}) {
  const [chosenLocation, setChosenLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState({longitude:49.26242,latitude:-123.222});
  const [permissionResponse, requestPermission] =Location.useForegroundPermissions();
  const mapRef = useRef(null)

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
     // console.log("+",currentLocation);
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
 
  const mapPressed = (event) => {
    // console.log(event.nativeEvent.coordinte.latitude);
    setChosenLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  function onConfirm(){
    if(route.params.isCreateNew==true){
    navigation.navigate("CreateEventPage",{coordinate:chosenLocation});
  }else{
    console.log("hahaha",route.params.isCreateNew);
    navigation.navigate("ManageEventPage",{coordinate:chosenLocation});}
  }
  return (
    <View>
    
      <MapView
        onPress={mapPressed}
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
        ref={mapRef}
      >
        {      currentLocation && 
      <Marker 
      coordinate={currentLocation}
      pinColor={'#FFC400'}
      />}
        {chosenLocation && <Marker coordinate={chosenLocation} />}
      </MapView>
      <Button title="Locate Me!" onPress={locateUserHandler} />
      <Button onPress={onConfirm} title={"Confirm"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    height: "80%",
  },
});