import { MaterialIcons } from '@expo/vector-icons';
import Cash from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { moderateScale } from '../styles/responsive';
import React from "react";

export default function TipIcon({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return pressed && styles.pressed;
      }}
    >
      <View style={styles.container}>
        <Cash name="cash-fast" size={moderateScale(30)} color="white" />
        {/* <Text style={styles.text}>Tip</Text> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  container: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.75,
  },
});
