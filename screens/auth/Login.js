import { View, Text,ScrollView, TextInput,Item, StyleSheet, Alert, ImageBackground, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesome } from '@expo/vector-icons'; 

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
    <ScrollView>
      <ImageBackground 
          source={require("../../assets/images/bg.jpg")}
          style={{height:Dimensions.get("window").height/2.5}}
          >
        <View style={styles.brandView}>
          <FontAwesome name="signing" style={{color:'#fff', fontSize:100}}/>
          <Text style={styles.brandViewText}>Streets Ahead</Text>
        </View>
      {/* <View style={styles.authContent}>
        <View style={styles.greetings}>
      
        <Text>
            Welcome to StreesAhead!
          </Text>
        <Text>
            Log in to engage in street art!
          </Text>
        </View>
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
          <View style={styles.button}>
            <Button title="Log In" onPress={handleLogin} />
          </View>
          <View style={styles.button}>
            <Button
              title="New User? Create an account"
              onPress={() => navigation.replace("Signup")}
            />
          </View>
          </View> */}
      </ImageBackground>
      <View style={styles.bottomView}>
          <View style={{padding:40}}>
            <Text style={{color:"#000", fontSize:34}}>Welcome</Text>
              <Pressable
                onPress={() => navigation.replace("Signup")}
              >
                <Text>Need an account? Sign up</Text>
              </Pressable>
            <View style={{marginTop: 50}}>
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
                <Text style={styles.text}>Login</Text>
              </Pressable>
            </View>
          </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
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
  login: {
    height:100,
    justifyContent:"center",
    alignItems:"center",
  },
  loginBtn:{
    alignSelf:"center",
    backgroundColor:"yellow",
    borderRadius:50,
    width: Dimensions.get("window").width/4,
    height: Dimensions.get("window").height/18,
    justifyContent: "center"
  },
  text:{
    color:"black",
    justifyContent:"center",
    alignSelf:"center",
  },
  authContent: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color:"gray",
    marginBottom: 2,
    marginTop: 8,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: "black",
    borderBottomColor:"BLACK",
  },
  button: {
    marginTop: 5,
  },
  greetings:{
    alignItems:"center"
  }
});