import { View, Text,FlatList,StyleSheet,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { firestore, auth } from "../../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Button from '../../components/Button';
import EventItem from "../../components/EventItem"
import * as Location from "expo-location";

export default function FindEventPage({route,navigation}) {
  const [events, setEvents] = useState([]);
  const [query, setQuery]=useState('');
  //const [currentLocation, setCurrentLocation] = useState();
  const [permissionResponse, requestPermission] =Location.useForegroundPermissions();

  
  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
/*   const locateUserHandler = async () => {
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
  }; */


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


/*   let isSearchByName=false;
  let isShowNearby=false;
  if(currentLocation!=undefined){
    isShowNearby=true;
  }
  useEffect(() => {
    if(query==""){
        isSearchByName=false;

    }else{
        isSearchByName=true;
        console.log("query:",query)
        isShowNearby=false;
        console.log(events.filter((event) => {
            return event.eventName.includes(query) }))
    }
}, [query]); */



  return (
    <View>
      <View style={styles.container}>
      <TextInput
      style={styles.searchInput}
      placeholder='Search here'
      onChangeText={(newQuery) => {
        setQuery(newQuery);
      }}
      value={query}
      />
      </View>
      {/* <Button onPress={locateUserHandler} title={"Find events near me"}/> */}
      <View style={styles.list}>
        <View style={styles.c1}>
    
      <FlatList
          data={events.filter((event) => {
            return event.eventName.toLowerCase().includes(query) })}
          renderItem={({ item }) => {
            return <EventItem event={item} option={1}/>;
          }}
          //for android
          overScrollMode={"always"}
        /></View>
{/*         <View>
      {isShowNearby&&
      <View style={styles.c2}>
      <Text>Nearby Events: </Text>
      <FlatList
          data={events.filter((event) => {
            return (Math.abs(event.coordinate.latitude-currentLocation.latitude)<20 && Math.abs(event.coordinate.longitude-currentLocation.longitude)<20) ;
          })}
          renderItem={({ item }) => {
            return <EventItem event={item} option={1}/>;
          }}
          //for android
          overScrollMode={"always"}
        /></View>}
</View> */}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  list: {
    height:  "100%",
  },
  container:{
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5
},
searchInput:{
    width: "100%",
    height:"100%",
    paddingLeft:8,
    fontSize:16
},
c1:{
    backgroundColor:"lightcyan"
},
c2:{
    backgroundColor:"cornsilk"
},
});