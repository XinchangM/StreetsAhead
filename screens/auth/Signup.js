import React, { useState } from "react";
import { auth } from "../../firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveUserInfo } from "../../firebase/firestore";
import { moderateScale, deviceHeight, deviceWidth } from "../../styles/Responsive";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '../../styles/Colors';
import { View, Text, ScrollView, TextInput, Item, StyleSheet, Alert, ImageBackground, Dimensions, Pressable } from "react-native";


export default function Signup({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [userName, setUserName] = useState("");
  const handleSignup = async () => {
    // some check here
    if (userName.replace(/\s/g, "").length == 0) {
      Alert.alert("Please enter a username");
      return;
    }
    if (email == null || email.replace(/\s/g, "").length == 0 || email.includes("@") == false || email.includes(".com") == false) {
      Alert.alert("Please enter a valid email");
      return;
    }
    if (password.length < 6 || password.replace(/\s/g, "").length == 0) {
      Alert.alert("The password needs to be minimum 6 characters");
      return;
    }
    if (password !== confirmpassword) {
      Alert.alert("The password and confirmed password don't match");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      saveUserInfo(userName);
      //onsole.log(userCred);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.KeyboardAwareScrollView}>
      <View style={styles.screen}>
        <ImageBackground
          source={require("../../assets/images/bg.png")}
          style={{ height: Dimensions.get("window").height / 2.5 }}
        >
          <View style={styles.brandView}>
            {/* <FontAwesome name="signing" style={{color:'#fff', fontSize:100}}/>
          <Text style={styles.brandViewText}>Streets Ahead</Text> */}
          </View>
        </ImageBackground>
        <View style={styles.bottomView}>
          <View style={{ padding: 40 }}>
            <Text style={styles.welcome}> Welcome!</Text>
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => navigation.replace("Login")}>
              <Text style={styles.instruction}>Already registered? Log in</Text>
            </Pressable>
            <View style={styles.inputContainer}>
              {/* <Item floatingLabel style={{borderColor:"yellow"}}> */}
              {/* <Label>Email</Label> */}
              <Text style={styles.label}>UserName</Text>
              <TextInput
                placeholder="UserName"
                style={styles.input}
                onChangeText={(newName) => setUserName(newName)}
                value={userName}
              />

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={(newEmail) => setEmail(newEmail)}
                value={email}
                keyboardType="email-address"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(newPass) => setPassword(newPass)}
                value={password}
                placeholder="Password"
              />
              <Text style={styles.label}>Comfirm Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(newPass) => setConfirmPassword(newPass)}
                value={confirmpassword}
                placeholder="Confirm Password"
              />


              {/* </Item> */}
            </View>
            <View style={styles.login}>
              <Pressable
                style={({ pressed }) => pressed ? styles.pressedsignupBtn : styles.signupBtn}
                onPress={handleSignup}>
                <Text style={styles.signupText}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  instruction: {
    color: Colors.pink,
    alignSelf: "center"
  },
  KeyboardAwareScrollView: {
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
    // height: deviceHeight,
    // width: deviceWidth,
    backgroundColor: "#fff",
  },
  backgroundView: {
    height: deviceHeight / 2.5,
  },
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "white",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  welcome: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: "#000",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },
  login: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6
  },
  signupBtn: {
    alignSelf: "center",
    backgroundColor: "#F2288D",
    borderRadius: 5,
    width: deviceWidth / 1.2,
    height: deviceHeight / 20,
    justifyContent: "center",
    shadowColor: "#F2288D",
  },
  pressedsignupBtn: {
    opacity: 0.6,
    alignSelf: "center",
    backgroundColor: "#F2288D",
    borderRadius: 5,
    width: deviceWidth / 1.2,
    height: deviceHeight / 20,
    justifyContent: "center",
    shadowColor: "#F2288D",
  },
  signupText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
  authContent: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 30,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginLeft: deviceWidth * 0.02,
    color: "gray",
    marginBottom: 2,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  input: {
    width: deviceWidth / 1.2,
    height: deviceHeight / 20,
    paddingHorizontal: 5,
    fontSize: 16,
    borderColor: "gray",
    borderBottomColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
  },
  button: {
    marginTop: 5,
  },
  greetings: {
    alignItems: "center"
  }
});