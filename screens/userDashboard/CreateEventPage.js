import { View, Text ,Pressable,StyleSheet,TextInput, Alert} from 'react-native'
import React from 'react'
import Button from '../../components/Button';
import Colors from '../../components/Colors';
import { useState } from "react";
import { writeEventToDB } from "../../firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firestore,auth } from "../../firebase/firebase-setup";

export default function CreateEventPage({route,navigation}) {
  const [performer, setPerformer] = useState("");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [coordinate, setCoordinate] = useState();
  const [isDatePicker1Visible, setDatePickerVisibility1] = useState(false);
  const [isDatePicker2Visible, setDatePickerVisibility2] = useState(false);


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
    console.log("A date has been picked: ", datetime);
    setStartTime(datetime);
    hideStartTimePicker();
  };
  const handleEndTimeConfirm = (datetime) => {
    console.log("A date has been picked: ", datetime);
    setEndTime(datetime);
    hideEndTimePicker();
  };



  function choosePositionPressed() {
    navigation.navigate("ChoosePositionPage");
    
  }

  function submitPressed() {
 
    navigation.goBack();
    writeEventToDB({      
      startTime:startTime,
      endTime:endTime,
      coordinate:route.params.coordinate,
      performer:performer,
      userId:auth.currentUser.uid,
      eventName:eventName}) 
  }

  return (
    <View>
      <Text>CreateEventPage</Text>
      <TextInput
            style={styles.input}
            onChangeText={(newPerformer) => {
              setPerformer(newPerformer);
            }}
            value={performer}
            multiline={true}
            placeholder="Enter names for 1 or more performer"
          />
            <TextInput
            style={styles.input}
            onChangeText={(newEventName) => {
              setEventName(newEventName);
            }}
            value={eventName}
            multiline={true}
            placeholder="Enter event name"
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
   
         <Button
      onPress={submitPressed}
      title={"submit"}
   />
      





    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightPurple,
    height: 30,
    borderRadius: 5,
    margin:10
  },
  pressed: {
    opacity: 0.75,
  },
});