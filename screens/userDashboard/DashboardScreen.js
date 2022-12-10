import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firestore, auth } from "../../firebase/firebase-setup";
import Button from '../../components/Button';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Colors from '../../styles/Colors';
import { moderateScale, deviceHeight, deviceWidth } from '../../styles/Responsive';
import { Video } from 'expo-av';
import Avatars from '../../components/Avatars'

export default function DashboardScreen({ route, navigation }) {
  const [user, setUser] = useState();
  const randomNum = Math.floor(Math.random() * 4);
  const avatar = Avatars[randomNum].src;
  useEffect(() => {
    const uns = onSnapshot(
      query(
        collection(firestore, "users"),
        where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setUser([]);
          return;
        }

        setUser(querySnapshot.docs[0].data());
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      uns();
    };
  }, []);

  function createEventPressed() {
    navigation.navigate("CreateEventPage", { coordinate: null });
  }
  function postHistoryPressed() {
    navigation.navigate("PostHistoryPage");
  }
  function eventHistoryPressed() {
    navigation.navigate("EventHistoryPage");
  }
  return (
    <View style={styles.wholeContainer}>
      <View style={styles.topContainer}>
        {user && <View style={styles.userContainer}>
          <Text style={styles.greetings}>Welcome, {user.userName}</Text>
          <Video
            source={avatar}
            rate={0.7}
            style={{ height: moderateScale(190) }} shouldPlay isLooping isMuted shouldCorrectPitch

          />
        </View>
        }

      </View>
      <View style={styles.bottomContainer}>
        <Button
          onPress={createEventPressed}
          title={"Create an Event"} />

        <Button
          onPress={postHistoryPressed}
          title={"View Post History"} />

        <Button
          onPress={eventHistoryPressed}
          title={"View Event History"} />

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  greetings: {
    color: Colors.green,
    fontSize: 40,
    textAlign: 'center'
  },
  userContainer: {
    height: deviceHeight,

  },
  wholeContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  topContainer: {
    flex: 1,
    margin: 40,
    height: deviceHeight,
  },
  bottomContainer: {
    flex: 2,
    marginVertical: 30
  }
});