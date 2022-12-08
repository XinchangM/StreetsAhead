import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { firestore } from "../../firebase/firebase-setup";
import { collection, onSnapshot } from "firebase/firestore";
import Circulerbtn from "../../components/CirculerBtn";
import { getWeather } from "../../util/Weather";
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { weather_api_key } from '@env';
import { deviceHeight, deviceWidth } from "../../styles/responsive";
import Colors  from "../../components/Colors";


export default function MapScreen({ route, navigation }) {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 49.288020, longitude: -123.143331 } );
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();

  const [region, setRegion] = useState();
  const [weather, setWeather] = useState(null);
  const [mainWeather, setMainWeather]=useState();


  async function getWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weather_api_key}`;

    try{
      const response = await fetch(url);
      const data = await response.json();
      const temperature = data.main.temp;
      const celsius = parseFloat(temperature)-273.15;
      const temp = celsius.toFixed(1);
      const mainWeather=data.weather[0].main
      setWeather(temp);
      setMainWeather(mainWeather);
    }
    catch(err){
console.log(err)
    }

  }

  
  const mapRef = useRef(null);
  const onCenter = () => {
    //console.log("1111", mapRef)

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
      currentPosition = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      setCurrentLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });

    } catch (err) {
      console.log("locate user ", err);
    }
  };

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
  }, [currentLocation]);

  useEffect(() => {

    if (currentLocation) {
      getWeather(currentLocation.latitude, currentLocation.longitude)
    }
  }, [currentLocation]);


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

  function onPressMarker(key) {
    navigation.navigate("EventDetailPage", {
      eventId: key
    });
  }


  return (
    <View style={styles.mapContainer}>
    
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation
            ? currentLocation.latitude
            : 49.288020,
          longitude: currentLocation
            ? currentLocation.longitude
            : -123.143331,
          latitudeDelta: 0.020,
          longitudeDelta: 0.020,
        }}
        ref={mapRef}>
           
       {events.map((event,i) => {
        const endTimestamp=event.endTime.seconds*1000+event.endTime.nanoseconds/1000000;
        const startTimestamp=event.startTime.seconds*1000+event.startTime.nanoseconds/1000000;
        if(endTimestamp>=Date.now()&&startTimestamp-3600000*2<=Date.now()){
          //only show ongoing ones & starting in 2 hours on the map
          return (
            <Marker key={event.key}
                  identifier={event.key}
                  coordinate={event.coordinate}
                  image={require('../../assets/images/loc.png')}
                  onPress={e => onPressMarker(e.nativeEvent.id)}
                  />)
        }              
                })}
     
      {currentLocation && 
      <Marker 
      draggable
      onDragEnd={e=>setCurrentLocation(e.nativeEvent.coordinate)}
        coordinate={currentLocation}
        pinColor={'#FFC400'}
        key="mylocation"
      />}
      </MapView> 

          {weather && 
        <View style={styles.weatherContainer}>

        { mainWeather=="Clear"&&<View style={styles.icon}><Feather name="sun" size={24} color={Colors.black}/></View>}
        { mainWeather=="Rain"&&<View style={styles.icon}><Ionicons name="rainy" size={24} color={Colors.black} /></View>}
        { mainWeather=="Snow"&&<View style={styles.icon}><FontAwesome name="snowflake-o" size={24} color={Colors.black} /></View>}
        { mainWeather=="Clouds"&&<View style={styles.icon}><Entypo name="icloud" size={24} color={Colors.black} /></View>}
        <View style={styles.weatherText}><Text>{weather} °C</Text></View>
        </View>}

        

      <View style={styles.bottomView}>

        <TouchableOpacity 
        onPress={onCenter} style={styles.navigationView} />
        <Circulerbtn onPress={locateUserHandler} />

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  icon:{
    paddingVertical:5,
    alignItems:"center",
    justifyContent:"center"
  },
  weatherText:{
    paddingVertical:5,
    justifyContent:"center",
    alignItems:"center",
  },
  weatherContainer:{
      backgroundColor:"white",
      padding:5,
      borderRadius:8,
    flexDirection:"column",
    position: 'absolute',
      top:50,
      left:(deviceWidth/2)-20,
      justifyContent:"center",
      alignItems:"center"
      
  },
  mapContainer: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  map: {
    // flex: 1,
    width: "100%",
    height: "100%",
  },
  list: {
    // flex: 1,
    height: "50%",
  },
  bottomView: {
    position: 'absolute',
    bottom: 60,
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