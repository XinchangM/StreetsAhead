import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FeatherIcon from "react-native-vector-icons/Feather";

export default SendButton = ({ onPress, bg, disabled }) => {
  return (
    <View
      style={tw.style(`w-12 h-12 ${bg} z-30 absolute rounded-full`, {
        bottom: "10%",
        right: "5%",
      })}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={tw`justify-center items-center h-full w-full`}
      >
       {/* <FeatherIcon name="Next" size={20} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
