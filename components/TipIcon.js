import Cash from "react-native-vector-icons/MaterialCommunityIcons";
import { View,StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale, deviceHeight, deviceWidth } from '../styles/Responsive';
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../styles/Colors";
export default function TipIcon() {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('PayPal')}>
        <Cash name="cash-fast" size={moderateScale(35)} color="white" />
      </TouchableOpacity>
    </View>

  );
}
TipIcon.navigationOptions = {
  title: 'tip',
};
const styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  container: {
    width: deviceWidth / 1.3,
    marginTop:moderateScale(30),
    alignItems:"flex-end",
    shadowColor:Colors.blue,
    shadowOpacity:1,
    shadowRadius:15
  },
});
