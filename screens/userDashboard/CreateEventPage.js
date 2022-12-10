import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import Button from '../../components/Button';
import Colors from "../../styles/Colors"
import { useState, useEffect } from "react";
import { writeEventToDB } from "../../firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firestore, auth } from "../../firebase/firebase-setup";
import NotificationManager from "../../components/NotificationManager";
import { requestPermissionsAsync } from 'expo-media-library';

export default function CreateEventPage({ route, navigation }) {
  const [performer, setPerformer] = useState("");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [coordinate, setCoordinate] = useState();
  const [isDatePicker1Visible, setDatePickerVisibility1] = useState(false);
  const [isDatePicker2Visible, setDatePickerVisibility2] = useState(false);

  useEffect(() => {
    if (route.params.coordinate != null) {
      setCoordinate(route.params.coordinate)
    }
  }, [route.params.coordinate]);

  const showStartTimePicker = () => {
    setDatePickerVisibility1(true);
  };

  const hideStartTimePicker = () => {
    setDatePickerVisibility1(false);
  };

  const showEndTimePicker = () => {
    setDatePickerVisibility2(true);
  };

  const hideEndTimePicker = () => {
    setDatePickerVisibility2(false);
  };

  const handleStartTimeConfirm = (datetime) => {
    //console.log("A date has been picked: ", datetime);
    setStartTime(datetime);
    hideStartTimePicker();
  };
  const handleEndTimeConfirm = (datetime) => {
    //console.log("A date has been picked: ", datetime);
    setEndTime(datetime);
    hideEndTimePicker();
  };



  function choosePositionPressed() {
    navigation.navigate("ChoosePositionPage", { isCreateNew: true });

  }

  const submitPressed = async () => {
    if (performer.replace(/\s/g, "").length == 0) {
      Alert.alert("You must specify the names of performers!");
      return;
    }
    if (eventName.replace(/\s/g, "").length == 0) {
      Alert.alert("You must specify the name of the event!");
      return;
    }
    if (startTime == undefined) {
      Alert.alert("You must specify a start time!");
      return;
    }
    if (endTime == undefined) {
      Alert.alert("You must specify an end time!");
      return;
    }

    if ((Date.parse(endTime) <= Date.parse(startTime))) {
      Alert.alert("End date should be greater than Start date");
      return;
    }
    if (coordinate == undefined) {
      Alert.alert("You must specify a location!");
      return;
    }

    try {
      await writeEventToDB({
        startTime: startTime,
        endTime: endTime,
        coordinate: coordinate,
        performer: performer,
        userId: auth.currentUser.uid,
        eventName: eventName
      });
      navigation.goBack();
      Alert.alert("You have succesfully created the event");

    } catch (err) {
      console.log(err)
    }
  };




  return (
    <View style={styles.container}>


      <TextInput
        style={styles.input}
        textAlign={'center'}
        onChangeText={(newEventName) => {
          setEventName(newEventName);
        }}
        value={eventName}
        multiline={true}
        placeholder=" Enter event name"
        placeholderTextColor={Colors.pink}
        color={Colors.pink}
      />

      <TextInput
        textAlign={'center'}
        style={styles.input}
        onChangeText={(newPerformer) => {
          setPerformer(newPerformer);
        }}
        value={performer}
        multiline={true}
        placeholder=" Enter names for the performers"
        placeholderTextColor={Colors.pink}
        color={Colors.pink}

      />

      <Button
        onPress={showStartTimePicker}
        title={"Choose start time"}
      />

      <DateTimePickerModal
        isVisible={isDatePicker1Visible}
        mode="datetime"
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />

      <Button
        onPress={showEndTimePicker}
        title={"Choose end time"}
      />

      <DateTimePickerModal
        isVisible={isDatePicker2Visible}
        mode="datetime"
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />

      <Button
        onPress={choosePositionPressed}
        title={"Choose position"}
      />

      <NotificationManager startTime={startTime} eventName={eventName} />

      <Button
        onPress={submitPressed}
        title={"Submit"}
        buttonColor={Colors.green}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    paddingVertical: 50
  },
  input: {
    backgroundColor: Colors.pinkOpacity50,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,

  },
  pressed: {
    opacity: 0.75,
  },
});