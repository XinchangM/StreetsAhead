import { View, Text,Pressable,StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../components/Button';

export default function ManageEventPage({route,navigation}) {
  function checkDetailPressed() {
    navigation.navigate("EventDetailPage"
    //{eventId: }
    );
  }

  function updatePressed() {

  }

  function deletePressed() {
 
  }
  return (
    <View>
      <Text>ManageEventPage</Text>
<Button onPress={checkDetailPressed} title={"Check event detail"}/>
<Button onPress={updatePressed} title={"Update Event Information"}/>
<Button onPress={deletePressed} title={"Delete event"}/>  


    </View>
  )
}

const styles = StyleSheet.create({

});