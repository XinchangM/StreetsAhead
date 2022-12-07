import { View } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import Button from "./Button";
import Colors from "./Colors";

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
      alert("Success!")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Button
        title="Remind me at the start time of the event"
        onPress={scheduleNotificationHandler}
        buttonColor={Colors.gold}
      />
    </View>
  );
}