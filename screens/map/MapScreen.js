import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { firestore } from "../../firebase/firebase-setup";
import { collection, onSnapshot } from "firebase/firestore";
import Circulerbtn from "../../components/CirculerBtn";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { weather_api_key } from '@env';
import { deviceHeight, deviceWidth, moderateScale } from "../../styles/Responsive";
import Colors from "../../styles/Colors";
import MapStyle from "../../styles/MapStyle";


export default function MapScreen({ route, navigation }) {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 49.288, longitude: -123.1433 });
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
  const [weather, setWeather] = useState(null);
  const [mainWeather, setMainWeather] = useState();
  const initialRegion = {
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

  async function getWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weather_api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const temperature = data.main.temp;
      const celsius = parseFloat(temperature) - 273.15;
      const temp = celsius.toFixed(1);
      const mainWeather = data.weather[0].main
      setWeather(temp);
      setMainWeather(mainWeather);
    }
    catch (err) {
      console.log(err)
    }

  }


  const mapRef = useRef(null);
  const onCenter = () => { }
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
        onRegionChangeComplete={onRegionChangeComplete}
        userInterfaceStyle={'dark'}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle.ms}
        initialRegion={initialRegion}
        ref={mapRef}
      >

        {events.map((event, i) => {
          const endTimestamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
          const startTimestamp = event.startTime.seconds * 1000 + event.startTime.nanoseconds / 1000000;
          if (endTimestamp >= Date.now() && startTimestamp - 3600000 * 2 <= Date.now()) {
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
            onDragEnd={e => setCurrentLocation(e.nativeEvent.coordinate)}
            coordinate={currentLocation}
            image={require('../../assets/images/me.png')}
            key="mylocation"
          />}
      </MapView>

      {weather &&
        <View style={styles.weatherContainer}>
          {mainWeather == "Clear" && <View style={styles.icon}><Feather name="sun" size={24} color={Colors.pink} /></View>}
          {mainWeather == "Rain" && <View style={styles.icon}><Ionicons name="rainy" size={24} color={Colors.pink} /></View>}
          {mainWeather == "Snow" && <View style={styles.icon}><FontAwesome name="snowflake-o" size={24} color={Colors.pink} /></View>}
          {mainWeather == "Clouds" && <View style={styles.icon}><Entypo name="icloud" size={24} color={Colors.pink} /></View>}
          <View style={styles.weatherTextContainer}><Text style={styles.weatherText}>{weather} °C</Text></View>
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
  icon: {
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  weatherTextContainer: {
    padding: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    color: Colors.pink,
  },
  weatherText: {
    color: Colors.pink,
    fontSize: moderateScale(18),

  },
  weatherContainer: {
    padding: 5,
    borderRadius: 8,
    position: 'absolute',
    top: moderateScale(35),
    width: deviceWidth / 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapContainer: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  list: {
    height: "50%",
  },
  bottomView: {
    position: 'absolute',
    bottom: moderateScale(20),
    alignItems: 'center',
    alignSelf: "center",
  },
  navigationView: {
    width: 1,
    height: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});