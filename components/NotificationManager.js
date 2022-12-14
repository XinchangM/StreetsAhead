import { View,Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import Button from "./Button";
import Colors from "../styles/Colors";

export default function NotificationManager({startTime, eventName}) {
  const name = "Hello user";
  const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
      return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
      ios: {
        allowBadge: true,
      },
    });
    return requestedPermission.granted;
  };

  const scheduleNotificationHandler = async () => {
   if(startTime==undefined){
    Alert.alert("Please enter start time");
    return;
   }
   if(eventName==""){
    Alert.alert("Please enter event name");
    return;
   }
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Get ready!",
          body: `Your event ${eventName} is about to start!`,
          color: "red",
        },
        trigger: {
          date:startTime
        },
      });
      Alert.alert("Success","Successfully schedule the notification!")

    } catch (err) {
      Alert.alert("Must complete information above!");
      console.log(err);
    }
  };

  return (
    <View>
      <Button
        title="Remind me at the start time"
        onPress={scheduleNotificationHandler}
        buttonColor={Colors.green}
      />
    </View>
  );
}