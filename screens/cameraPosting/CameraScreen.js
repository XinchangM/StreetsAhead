import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground,StyleSheet,Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Camera } from "expo-camera";
import { Video } from 'expo-av';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import TypeIcon from "react-native-vector-icons/Entypo";
import NextButton from "../../components/NextButton";


export default function CameraScreen({navigation}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [record, setRecord] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    askPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No Permission</Text>;
  }

  const takePhoto = async () => {
    if (!camRef) return;
    try {
      const snap = await camRef.current?.takePictureAsync();
      setPreview(snap);
    } catch (err) {
      alert(err);
    }
  };

  const takeVideo = async () => {
    if (!camRef) return;
    try {
      const data = await camRef.current?.recordAsync();
      setRecord(data.uri);
    } catch (err) {
      alert(err);
    }
  }

  const stopVideo = async () => {
    await camRef.current?.stopRecording();
  }

  function buttonPressed() {
    let uri;
    let mediaType;
    if(preview){
      uri=preview.uri;
      mediaType="photo";
    }
    if(record){
      uri=record;
      mediaType="video"
    }
    console.log(record);
    navigation.navigate("CameraNextStepPage",{mediaUri:uri,mediaType:mediaType});
  }

  return (
    <View style={styles.viewContainer}>
      {(!preview&&!record)&&
        <Camera style={styles.camera} type={type} ref={camRef}>
          <View
            style={tw.style(`z-30 w-10 absolute h-80`, {
              top: "20%",
              right: "5%",
            })}
          >
            <TouchableOpacity
              style={tw` absolute z-30 w-full h-10 bg-white rounded-full items-center justify-center`}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
            <Icon name="cycle" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={tw.style(`absolute w-full`, {
              bottom: "10%",
              left: "50%",
              transform: [{ translateX:-50}],
            })}
          >
          <View
              style={tw.style(
                `w-20 h-20  bg-white rounded-full justify-center items-center`
              )}
            >
              <TouchableOpacity
                style={tw`bg-white w-16 h-16 rounded-full`}
                onPress={() => takePhoto()}
                onLongPress={() => takeVideo()}
                onPressOut={() => stopVideo()}
              >
                <Icon name="circle" size={63}/>
                </TouchableOpacity>
            </View>
          </View>
        </Camera>
      }
      {preview&&
        <View style={tw`w-full h-full bg-transparent`}>
          <View
            style={tw.style(`w-12 h-12 bg-white z-30 absolute rounded-full`, {
              top: "20%",
              right: "5%",
            })}
          >
            <TouchableOpacity
              onPress={() => setPreview(null)}
              style={tw`justify-center items-center h-full w-full`}
            >
            <TypeIcon name="cross" size={40} color="black" />
            </TouchableOpacity>
            
          </View>
          <NextButton
            disabled={false}
            bg={"bg-white"}
            onPress={buttonPressed}
          />
          <ImageBackground
            source={{ uri: preview?.uri }}
            width={100}
            height={100}
            style={tw`flex-1`}
          />
          
        </View>
}
        {record&&
          <View style={tw`w-full h-full bg-transparent`}>
                <View
                  style={tw.style(`w-12 h-12 bg-white z-30 absolute rounded-full`, {
                    top: "20%",
                    right: "5%",
                  })}
                >
                  <TouchableOpacity
                    onPress={() => setRecord(null)}
                    style={tw`justify-center items-center h-full w-full`}
                  >
                  <TypeIcon name="cross" size={40} color="black" />
                  </TouchableOpacity>
                  
          </View>
                <NextButton
                  disabled={false}
                  bg={"bg-white"}
                  onPress={buttonPressed}
                />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: record,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
   <View style={styles.buttons}>
    <Button
      title={status.isPlaying ? 'Pause' : 'Play'}
      onPress={() =>
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
      }
    />
    </View>
  </View>
  }

    </View>
);
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems:"center",
    justifyContent: "center",
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  camera:{
    alignSelf: 'center',
    resizeMode: 'cover',
    width: "100%",
    height: "100%",
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },

});