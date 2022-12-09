import { View, Text,ScrollView, TextInput,Item, StyleSheet, Alert, ImageBackground, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons'; 
import { deviceHeight, deviceWidth } from "../../styles/responsive";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };
  return (
    <ScrollView style={styles.screen}>
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
              <Pressable onPress={() => navigation.replace("Signup")}>
                <Text>Need an account? Sign up</Text>
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
              <Pressable style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>Log in</Text>
              </Pressable>
            </View>
          </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
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
    // flex:"50%",
    flex:1.5,
    // height: (deviceHeight/3)*2,
    backgroundColor: "white",
    // top:-50,
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
  loginBtn:{
    alignSelf:"center",
    // backgroundColor:"#FFC400",
    backgroundColor:"#F2288D",
    borderRadius:10,
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
    color:"gray",
    marginBottom: 2,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  input: {
    width: deviceWidth/1.2,
    height: deviceHeight/20,
    // paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    // borderBottomWidth: 2,
    borderColor: "gray",
    borderBottomColor:"gray",
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {
    marginTop: 5,
  },
  greetings:{
    alignItems:"center"
  }
});
