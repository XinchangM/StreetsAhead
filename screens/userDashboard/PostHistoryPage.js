import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import PostList from '../../components/PostList';

export default function PostHistoryPage() {
  return (
    <View>

      <View style={styles.list}>
        <PostList/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    height: "100%",
  }

});