import { View, Text,StyleSheet } from 'react-native'
import Button from '../../components/Button';
import MapView, { Marker,PROVIDER_GOOGLE  } from "react-native-maps";
import MapStyle from '../../styles/MapStyle';
import React, { useEffect, useState,useRef } from "react";
import * as Location from "expo-location";
import Colors from '../../components/Colors';

export default function ChoosePositionPage({route,navigation}) {
  const [chosenLocation, setChosenLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState({longitude:49.26242,latitude:-123.222});
  const [permissionResponse, requestPermission] =Location.useForegroundPermissions();
  const mapRef = useRef(null)


  const initialRegion={
    latitude: 49.288020,
    longitude: -123.143331,
    latitudeDelta: 0.020,
    longitudeDelta: 0.020,
  }
  const [loaded, setLoaded] = useState(false)
  
  const onRegionChangeComplete = (region) => { 
    if (!loaded) { 
      if (region.latitude != initialRegion.latitude || region.longitude != initialRegion.longitude) {
        mapRef.current.animateToRegion(initialRegion, 1)
      }
      setLoaded(true)
    } 
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
    //console.log("hahaha",route.params.isCreateNew);
    navigation.navigate("ManageEventPage",{coordinate:chosenLocation});}
  }
  return (
    <View style={styles.container}>

<MapView
      onPress={mapPressed}
      onRegionChangeComplete={onRegionChangeComplete}
        userInterfaceStyle={'dark'}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle.ms}
        initialRegion={initialRegion}
        ref={mapRef}
        >
  
        { currentLocation && 
      <Marker 
      coordinate={currentLocation}
      image={require('../../assets/images/me.png')}
      />}
        {chosenLocation && <Marker coordinate={chosenLocation} pinColor={Colors.pink}/>}
      </MapView>





      <Button title="Locate Me!" onPress={locateUserHandler} />
      <Button onPress={onConfirm} title={"Confirm"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.blue
  },
  map: {
    // flex: 1,
    height: "80%",
  },
});