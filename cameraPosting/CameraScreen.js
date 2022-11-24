import { View, Text,Pressable,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Button from '../components/Button';
import { ref, uploadBytes } from "firebase/storage";
import ImageManager from "../components/ImageManager"

export default function CameraScreen({route,navigation}) {
  const [uri, setUri] = useState("");
  const imageHandler = (uri) => {
    console.log("imageHandler called", uri);
    setUri(uri);
  };

  
  function buttonPressed() {
    navigation.navigate("CameraNextStepPage",{uri});
  }

 
  return (
    <View>
      <Text>CameraScreen</Text>
      <ImageManager imageHandler={imageHandler} />

      <Button
      onPress={buttonPressed}
      title={"Next Step"}
      
      />
    </View>
  )
}
const styles = StyleSheet.create({

});