import { View, Text, Pressable, StyleSheet, ImageBackground,Alert } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Colors from './Colors';
import { deviceHeight, deviceWidth, moderateScale} from '../styles/responsive';


//event option = 1:linkable; 2:managable; 3:view only
export default function EventItem({ event, option }) {
  const startTimestamp = event.startTime.seconds * 1000 + event.startTime.nanoseconds / 1000000;
  const startTimeObject = new Date(startTimestamp);
  // To get year,month, day, hour.... use startTimeObject.getXXX()
  const endTimestamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
  const endTimeObject = new Date(endTimestamp);
  const monthNames = ["Jan. ", "Feb. ", "Mar. ", "Apr. ", "May ", "Jun. ",
  "Jul. ", "Aug. ", "Sept. ", "Oct. ", "Nov. ", "Dec. "];
  const startHour=startTimeObject.getHours()<10?("0"+startTimeObject.getHours().toString()):startTimeObject.getHours().toString();
  const startMinute=startTimeObject.getMinutes()<10?("0"+startTimeObject.getMinutes().toString()):startTimeObject.getMinutes().toString();
  const startTimeString=monthNames[startTimeObject.getMonth()]+startTimeObject.getDate() + ", " +startHour+":"+startMinute;
  const endHour=endTimeObject.getHours()<10?("0"+endTimeObject.getHours().toString()):endTimeObject.getHours().toString();
      const endMinute=endTimeObject.getMinutes()<10?("0"+endTimeObject.getMinutes().toString()):endTimeObject.getMinutes().toString();
    
  const endTimeString=monthNames[endTimeObject.getMonth()]+endTimeObject.getDate() + ", " +endHour+":"+endMinute;

  const timeString=startTimeString+" - "+endTimeString;
  
  

  const navigation = useNavigation();


  function eventItemPressed() {
    navigation.navigate("EventDetailPage", {
      eventId: event.key,
      isManagable: false
    });
  }
  function linkPressed() {
    Alert.alert("Successfully linked this event to your post!")
    navigation.navigate("CameraNextStepPage", {
      eventId: event.key
    });
  }

  function managePressed() {
    navigation.navigate("EventDetailPage", {
      eventId: event.key,
      isManagable: true
    });
  }
  return (
    <View style={styles.item}>
      {option == 1 &&
        <Pressable
          onPress={linkPressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <ImageBackground source={require("../assets/images/list.png")} style={styles.listBackground}>
            <View style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.eventName}</Text>
              <Text style={styles.eventPerformer}>{event.performer}</Text>
              <Text style={styles.eventTime}>{timeString}</Text>

            </View>
          </ImageBackground>
        </Pressable>
      }
      {option == 2 &&
        <Pressable
          onPress={managePressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <ImageBackground source={require("../assets/images/list.png")} style={styles.listBackground}>
            <View style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.eventName}</Text>
              <Text style={styles.eventPerformer}>{event.performer}</Text>
              <Text style={styles.eventTime}>{timeString}</Text>

            </View>
          </ImageBackground>
        </Pressable>
      }


      {option == 3 &&
        <Pressable
          onPress={eventItemPressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <ImageBackground source={require("../assets/images/list.png")} style={styles.listBackground}>
            <View style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.eventName}</Text>
              <Text style={styles.eventPerformer}> {event.performer}</Text>
              <Text style={styles.eventTime}>{timeString}</Text>

            </View>
          </ImageBackground>
        </Pressable>
      }

    </View>
  )
}
const styles = StyleSheet.create({
  listBackground:{
    width:deviceWidth/1.1,
    height:deviceHeight/7,
    marginBottom:moderateScale(15),
  },
  eventItem: {
    padding: moderateScale(5),
    margin: moderateScale(10)
  },
  pressed: {
    opacity: 0.75,
  },
  eventTitle:{
    marginTop: moderateScale(5),
    marginLeft:moderateScale(30),
    fontSize:moderateScale(24),
    color:Colors.pink,
    fontWeight:"bold"
  },
  eventTime:{
    marginTop: moderateScale(10),
    marginLeft:moderateScale(30),
    fontSize:moderateScale(15)
  },  
  eventPerformer:{
    marginTop:moderateScale(10),
    marginLeft:moderateScale(30),
    fontSize:moderateScale(15)
  },
  item:{
    alignSelf:"center"
  }
}); 