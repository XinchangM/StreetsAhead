import { View, Text ,Pressable,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import { firestore,auth } from "../../firebase/firebase-setup";
import Button from '../../components/Button';
import { doc,collection, onSnapshot, query, where,documentId} from "firebase/firestore";
import Colors from '../../components/Colors';

export default function DashboardScreen({route,navigation}) {
const[user,setUser]=useState();
  
useEffect(() => {
  const uns = onSnapshot(
    query(
      collection(firestore, "users"),
      where("userId", "==", auth.currentUser.uid )
    ),
    (querySnapshot) => {
      if (querySnapshot.empty) {
        setUser([]);
        return;
      }
  
      setUser( querySnapshot.docs[0].data())

    },
    (err) => {
      console.log(err);
    }
  );

  return () => {
    uns();
  };
}, []);

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
    <View style={styles.wholeContainer}>
      <View style={styles.topContainer}>
        {user&&<Text style={styles.greetings}>Welcome, {user.userName}</Text>}
    
  
      </View>
      <View style={styles.bottomContainer}>
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


    </View>
  )
}

const styles = StyleSheet.create({
  greetings:{
    color:Colors.gold,
fontSize:40,
textAlign:'center'
  },
wholeContainer:{
flex:1
},
topContainer:{
  flex:1,
  margin:20
},
bottomContainer:{
flex:6
}
});