import { View, Text,StyleSheet } from 'react-native'

import Button from '../components/Button';
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function ChoosePositionPage({route,navigation}) {
  const [chosenLocation, setChosenLocation] = useState();
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

  const mapPressed = (event) => {
    // console.log(event.nativeEvent.coordinte.latitude);
    setChosenLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  function onConfirm(){
    navigation.navigate("CreateEventPage",{coordinate:chosenLocation});
  }
  return (
    <View>
      <Text>ChoosePositionPage</Text>
      <MapView
        onPress={mapPressed}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation
            ? currentLocation.latitude
            : 37.78825,
          longitude: currentLocation
            ? currentLocation.longitude
            : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && <Marker coordinate={currentLocation} />}
        {chosenLocation && <Marker coordinate={chosenLocation} />}
      </MapView>
      <Button onPress={onConfirm} title={"Confirm"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    height: "50%",
  },
});