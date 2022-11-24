import { View, Text,Pressable,StyleSheet,TextInput, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import Button from '../components/Button';
import { useNavigation } from "@react-navigation/native";
import { storage } from "../firebase/firebase-setup";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, auth } from "../firebase/firebase-setup";
import { writePostToDB } from "../firebase/firestore";
import Colors from '../components/Colors';
export default function CameraNextStepPage({route,navigation}) {
  const [comment, setComment] = useState("");
  let postTime=new Date();
  let linkedEventId=route.params.eventId;
  const mediaUri="hhhh";


function onUpload()  {
   writePostToDB({mediaUri,postTime,linkedEventId,comment});
   Alert.alert("Success","You have successfully posted")
  };
  function onDownload(){}

  function linkEventPressed() {
    navigation.navigate("FindEventPage");
  }

  return (
    <View>
      <Text>CameraNextStepPage</Text>
      
    <Button
      onPress={linkEventPressed}
      title={"Link to an event"}/>

<TextInput
            style={styles.input}
            onChangeText={(newComment) => {
              setComment(newComment);
            }}
            value={comment}
            multiline={true}
            placeholder="Enter some comment"
          />

<Button
      onPress={onUpload}
      title={"Upload"}
      />
<Button
      onPress={onDownload}
      title={"Download"}
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
});