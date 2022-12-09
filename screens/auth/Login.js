import { View, Text,ScrollView, TextInput,Item, StyleSheet, Alert, ImageBackground, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons'; 
import { deviceHeight, deviceWidth, moderateScale } from "../../styles/responsive";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from "../../components/Colors";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async () => {
    if (email==null||email.replace(/\s/g, "").length==0||email.includes("@")==false||email.includes(".com")==false) {
      Alert.alert("You must enter a valid email!");
      return;
    }
    if (password==null||password.replace(/\s/g, "").length==0) {
      Alert.alert("You must enter a valid password!");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      Alert.alert("Wrong credentials, try again!");
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.KeyboardAwareScrollView}>
    <View style={styles.screen}>
      <ImageBackground 
          source={require("../../assets/images/bg.png")}
          style={{height:Dimensions.get("window").height/2.5}}
          >
        <View style={styles.brandView}>
          {/* <FontAwesome name="signing" style={{color:'#fff', fontSize:100}}/>
          <Text style={styles.brandViewText}>Streets Ahead</Text> */}
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
          <View style={{padding:40}}>
            <Text style={styles.welcome}>Welcome Back</Text>
              <Pressable 
              style={({ pressed }) => pressed&&styles.pressed}
              onPress={() => navigation.replace("Signup")}>
                <Text style={styles.instruction}>Need an account? Sign up</Text>
              </Pressable>
            <View style={styles.inputContainer}>
              {/* <Item floatingLabel style={{borderColor:"yellow"}}> */}
                {/* <Label>Email</Label> */}
                <Text style={styles.label}>Account</Text>
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
              {/* </Item> */}
            </View>
            <View style={styles.login}>
              <Pressable 
              style={({ pressed }) => pressed?styles.pressedloginBtn:styles.loginBtn}
             onPress={handleLogin}>
                <Text style={styles.loginText}>Log in</Text>
              </Pressable>
            </View>
          </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  instruction:{
    color:Colors.pink,
    alignSelf:"center"
  },
  KeyboardAwareScrollView:{
    backgroundColor:"#fff",
  },
  screen:{
    flex:1,
    // height: deviceHeight,
    // width: deviceWidth,
    backgroundColor:"#fff",
  },
  backgroundView:{
    // flex:"50%",
    height: deviceHeight/2.5,
  },
  brandView: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  brandViewText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bottomView: {
    flex:1.5,
    backgroundColor: "white",
    bottom:50,
    borderTopStartRadius:60,
    borderTopEndRadius:60,
  },
  welcome:{
    justifyContent: 'center',
    alignSelf:'center',
    color:"#000", 
    fontSize:34,
    fontWeight: "bold",
    marginBottom:10,
  },
  login: {
    height:100,
    justifyContent:"center",
    alignItems:"center",
  },
  pressed:{
    opacity:0.6
  },
  loginBtn:{
    alignSelf:"center",
    backgroundColor:"#F2288D",
    borderRadius:5,
    width: deviceWidth/1.2,
    height: deviceHeight/20,
    justifyContent: "center",
    shadowColor: "#F2288D",
  },
  pressedloginBtn:{
      opacity:0.6,
      alignSelf:"center",
      backgroundColor:"#F2288D",
      borderRadius:5,
      width: deviceWidth/1.2,
      height: deviceHeight/20,
      justifyContent: "center",
      shadowColor: "#F2288D",
  },
  loginText:{
    color:"white",
    fontSize: 20,
    fontWeight:"bold",
    justifyContent:"center",
    alignSelf:"center",
  },
  authContent: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 50,
    marginVertical: 8,
    justifyContent:"center",
    alignItems:"center",
  },
  label: {
    marginLeft:deviceWidth*0.02,
    color:"gray",
    marginBottom: 2,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  input: {
    width: deviceWidth/1.2,
    height: deviceHeight/20,
    paddingHorizontal: 5,
    fontSize: 16,
    borderColor: "gray",
    borderBottomColor:"gray",
    borderWidth: 2,
    borderRadius: 5,
  },
  button: {
    marginTop: 5,
  },
  greetings:{
    alignItems:"center"
  }
});
