import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PostList from '../../components/PostList';
import Colors from '../../styles/Colors';


export default function PostHistoryPage() {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <PostList />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
container:{
flex:1
},
  list: {
    flex:1,
    backgroundColor: Colors.blue,
   // minHeight: deviceHeight,
  
  }

});