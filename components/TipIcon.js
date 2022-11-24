

import { MaterialIcons } from '@expo/vector-icons';

import { View, Text, Pressable, StyleSheet } from "react-native";

import React from "react";

export default function TipIcon({ size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return pressed && styles.pressed;
      }}
    >
      <View style={styles.container}>
      {/* <MaterialIcons name="attach-money" size={size} color={color} /> */}
    <Text style={styles.text}>Tip</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text:{
    color:'white'
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
