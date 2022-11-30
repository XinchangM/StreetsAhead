import { View, Text,Pressable,StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../components/Button';
import EventList from '../../components/EventList';

export default function EventHistoryPage({route,navigation}) {
  function eventPressed() {
    navigation.navigate("ManageEventPage"
    //{eventId: }
    );
  }
  return (
    <View>
      <Text>EventHistoryPage</Text>
      <View style={styles.list}>
      <EventList isAll={false}/>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  list:{
    height:  "100%",
   
  },
  pressed: {
    opacity: 0.75,
  },
});