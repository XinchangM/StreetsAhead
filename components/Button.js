import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Colors from "../styles/Colors";

export default function Button({ title, onPress, buttonColor }) {
  const bColor = buttonColor ? buttonColor : Colors.purple
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.container, { backgroundColor: buttonColor ? buttonColor : Colors.pink }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginVertical: 10

  },
  title: {
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});
