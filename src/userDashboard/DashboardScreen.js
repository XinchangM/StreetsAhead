import { View, Text ,Pressable,StyleSheet} from 'react-native'
import React from 'react'
import { auth } from "../firebase/firebase-setup";
import Button from '../components/Button';

export default function DashboardScreen({route,navigation}) {
  function createEventPressed() {
    navigation.navigate("CreateEventPage");
  }
  function postHistoryPressed() {
    navigation.navigate("PostHistoryPage");
  }
  function eventHistoryPressed() {
    navigation.navigate("EventHistoryPage");
  }
  return (
    <View>
      <Text>DashboardScreen</Text>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>

<Button 
   onPress={createEventPressed}
   title={"Create an Event"}/>
      
      <Button 
   onPress={postHistoryPressed}
   title={"View Post History"}/>

   <Button 
   onPress={eventHistoryPressed}
   title={"View Event History"}/>
      



    </View>
  )
}

const styles = StyleSheet.create({

});