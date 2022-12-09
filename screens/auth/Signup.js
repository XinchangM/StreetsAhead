import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveUserInfo } from "../../firebase/firestore";
import { moderateScale, deviceHeight, deviceWidth} from "../../styles/responsive";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from "../../components/Colors";

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
<KeyboardAwareScrollView>
    <View style={styles.authContent}>
      <View style={styles.greetings}>
        <Text style={styles.greetingText}>
          Welcome to StreesAhead!
        </Text>
        <Text style={styles.greetingText}>
          Sign up to join the community!
        </Text>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
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
      <Text style={styles.label}>password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setPassword(newPass)}
        value={password}
        placeholder="Password"
      />
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(newPass) => setConfirmPassword(newPass)}
        value={confirmpassword}
        placeholder="Password"
      />
      <Button title="Register" onPress={handleSignup} />
      <Button
        title="Already Registered? Login"
        onPress={() => navigation.replace("Login")}
      />

    </View>

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  authContent: {
    height:deviceHeight,
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 5,
    fontSize: 16,
    borderColor: "black",
    borderWidth: 2,
  },
  greetings: {
    alignItems: "center",
  },
  greetingText:{
    fontSize:20,
    color:Colors.pink
  }
});