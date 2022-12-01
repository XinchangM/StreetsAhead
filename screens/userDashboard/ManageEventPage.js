
import React from 'react'
import Button from '../../components/Button';
import { View, Text ,Pressable,StyleSheet,TextInput, Alert} from 'react-native'
import Colors from '../../components/Colors';
import { useState,useEffect } from "react";
import { updateEvent } from "../../firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firestore,auth } from "../../firebase/firebase-setup";

export default function ManageEventPage({route,navigation}) {
  const [performer, setPerformer] = useState("");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [id, setId] = useState("");
  const [coordinate, setCoordinate] = useState();
  const [isDatePicker1Visible, setDatePickerVisibility1] = useState(false);
  const [isDatePicker2Visible, setDatePickerVisibility2] = useState(false);
  useEffect(() => {
  if(route.params.eventId){
    setId(route.params.eventId);
  }
}, []);

  useEffect(() => {
    if(route.params.coordinate){
      setCoordinate(route.params.coordinate);
    }
  }, []);


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
    navigation.navigate("ChoosePositionPage",{
      isCreateNew:false
    });
    
  }
  const submitPressed= async () => {
    if(performer==""){
      alert("You must specify the names of performers!");
      return;
    }
    if(eventName==""){
      alert("You must specify the name of the event!");
      return;
    }
    if(startTime==undefined){
      alert("You must specify a start time!");
      return;
    }
    if(endTime==undefined){
      alert("You must specify an end time!");
      return;
    }

    if ((Date.parse(endTime) <= Date.parse(startTime))) {
      alert("End date should be greater than Start date");
      return;
    }
    if(route.params.coordinate==undefined){
      alert("You must specify a location!");
      return;
    }
    try{
    await updateEvent( {   
      key:id,
      startTime:startTime,
      endTime:endTime,
      coordinate:route.params.coordinate,
      performer:performer,
      eventName:eventName}) 
      navigation.goBack();

    }catch(err){
      console.log(err);
    }
  }



  return (
    <View>
      <Text>ManageEventPage</Text>
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
<Button onPress={submitPressed} title={"Submit"}/>


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