import { View, Text,Pressable,StyleSheet } from 'react-native'
import React,{useState, useRef, useLayoutEffect, useEffect} from 'react';
import { Camera } from "expo-camera";
import Button from '../components/Button';
import { ref, uploadBytes } from "firebase/storage";
import ImageManager from "../components/ImageManager"

export default function CameraScreen({route,navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [uri, setUri] = useState("");
  const imageHandler = (uri) => {
    console.log("imageHandler called", uri);
    setUri(uri);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
    });
  }, []);
 
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