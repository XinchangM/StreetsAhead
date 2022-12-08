import { View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Colors from './Colors';
import { deviceHeight, deviceWidth, moderateScale} from '../styles/responsive';


//event option = 1:linkable; 2:managable; 3:view only
export default function EventItem({ event, option }) {
  const startTimestamp = event.startTime.seconds * 1000 + event.startTime.nanoseconds / 1000000;
  const startTimeObject = new Date(startTimestamp);
  const startTimeString = startTimeObject.toString();
  // To get year,month, day, hour.... use startTimeObject.getXXX()
  const endTimestamp = event.endTime.seconds * 1000 + event.endTime.nanoseconds / 1000000;
  const endTimeObject = new Date(endTimestamp);
  const endTimeString = endTimeObject.toString();
  const monthNames = ["Jan. ", "Feb. ", "Mar. ", "Apr. ", "May ", "Jun. ",
  "Jul. ", "Aug. ", "Sept. ", "Oct. ", "Nov. ", "Dec. "];
  const timeString =  monthNames[endTimeObject.getMonth()] + startTimeObject.getDate() + " " +
   startTimeObject.getHours() + ":" + startTimeObject.getMinutes() + " - " + monthNames[endTimeObject.getMonth()] + endTimeObject.getDate() + " " + endTimeObject.getHours() + ":" + endTimeObject.getMinutes();


  const navigation = useNavigation();


  function eventItemPressed() {
    navigation.navigate("EventDetailPage", {
      eventId: event.key,
      isManagable: false
    });
  }
  function linkPressed() {
    alert("Successfully linked this event to your post!")
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
    <View>
      {option == 1 &&
        <Pressable
          onPress={linkPressed}
          style={({ pressed }) => {
            return pressed && styles.pressed;
          }}
        >
          <ImageBackground source={require("../assets/images/list.png")} style={styles.listBackground}>
            <View style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.eventName}</Text>'
              <Text style={styles.eventPerformer}>Performers: {event.performer}</Text>
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
              <Text style={styles.eventPerformer}>Performers: {event.performer}</Text>
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
              <Text style={styles.eventPerformer}>Performers: {event.performer}</Text>
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
    marginLeft:moderateScale(20),
    fontSize:moderateScale(24),
    color:Colors.pink 
  },
  eventTime:{
    marginTop: moderateScale(10),
    marginLeft:moderateScale(20),
    fontSize:moderateScale(15)
  },  
  eventPerformer:{
    marginTop:moderateScale(10),
    marginLeft:moderateScale(20),
    fontSize:moderateScale(15)
  }
}); 