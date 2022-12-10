import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Video } from 'expo-av';

import Circle from "react-native-vector-icons/Entypo";
import Flip from "react-native-vector-icons/MaterialIcons";
import Close from "react-native-vector-icons/AntDesign";
import Next from "react-native-vector-icons/FontAwesome";
import { moderateScale, deviceHeight, deviceWidth } from "../../styles/Responsive";
import Colors from "../../styles/Colors";

export default function CameraScreen({ navigation }) {

  const video = React.useRef(null);
  const [isLongPress, setIsLongPress] = useState(false);
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
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (err) {
        console.log(err)
      }
    };
    askPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    Alert.alert("No camera permission!");
    return <Text>No Permission</Text>;
  }

  const takePhoto = async () => {
    if (!camRef) return;
    try {
      const snap = await camRef.current?.takePictureAsync();
      setPreview(snap);
    } catch (err) {
      console.log(err)
    }
  };

  const takeVideo = async () => {
    if (!camRef) return;
    try {
      const data = await camRef.current?.recordAsync();
      setRecord(data.uri);
      setIsLongPress(true);
    } catch (err) {
      console.log(err);
    }
  }

  const stopVideo = async () => {
    if (!isLongPress) {
      return;
    }
    try {
      await camRef.current?.stopRecording();
    } catch (err) {
      console.log(err);
    }

  }

  function buttonPressed() {
    let uri;
    let mediaType;
    if (preview) {
      uri = preview.uri;
      mediaType = "photo";
    }
    if (record) {
      uri = record;
      mediaType = "video"
    }
    //console.log(record);
    navigation.navigate("CameraNextStepPage", { mediaUri: uri, mediaType: mediaType });
    setPreview(null);
    setRecord(null);
  }

  return (
    <View style={styles.viewContainer}>
      {(!preview && !record) &&
        <Camera style={styles.camera} type={type} ref={camRef}>
          <View style={styles.flipContainer}>
            <TouchableOpacity
              style={styles.flipBtn}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Flip name="flip-camera-android" size={moderateScale(30)} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.circleContainer}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => takePhoto()}
              onLongPress={() => takeVideo()}
              onPressOut={() => stopVideo()}
            >
              <Circle name="circle" size={moderateScale(90)} color="white" />
            </TouchableOpacity>
          </View>

        </Camera>
      }

      {preview &&
        <View style={styles.previewContainer}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => setPreview(null)}
              style={styles.closeBtn}
            >
              <Close name="close" size={moderateScale(30)} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.nextContainer}>
            <TouchableOpacity onPress={buttonPressed}
              style={styles.nextBtn}
            >
              <Next name="send" size={moderateScale(30)} color="white" />
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={{ uri: preview?.uri }}
            width={100}
            height={100}
            style={styles.imageBackground}
          />
        </View>}
      {record &&
        <View style={styles.previewContainer}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              onPress={() => setRecord(null)} style={styles.closeBtn}>
              <Close name="close" size={moderateScale(30)} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.nextContainer}>
            <TouchableOpacity onPress={buttonPressed} style={styles.nextBtn}>
              <Next name="send" size={moderateScale(30)} color="white" />
            </TouchableOpacity>
          </View>
          <Video

            useNativeControls={true}
            ref={video} style={styles.video} source={{
              uri: record,
            }}

            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View style={styles.buttons}>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  camera: {
    alignSelf: 'center',
    resizeMode: 'cover',
    width: "100%",
    height: "100%",
  },
  video: {
    top: moderateScale(19),
    alignSelf: 'center',
    width: deviceWidth,
    height: deviceHeight - moderateScale(77),
  },
  flipContainer: {
    alignSelf: "center",
    borderRadius: moderateScale(25),
    width: moderateScale(50),
    left: deviceWidth / 2.3,
    top: deviceHeight / 13,
    zIndex: 1
  },
  flipBtn: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grayOpacity50,
  },
  previewContainer: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: "transparent",
  },
  closeContainer: {
    alignSelf: "center",
    borderRadius: moderateScale(55),
    width: moderateScale(55),
    right: deviceWidth / 2.5,
    top: deviceHeight / 1.2,
    zIndex: 1
  },
  closeBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    backgroundColor: Colors.grayOpacity50
  },
  nextContainer: {
    alignSelf: "center",
    borderRadius: moderateScale(55),
    width: moderateScale(55),
    left: deviceWidth / 2.2,
    top: deviceHeight / 1.2,
    zIndex: 1,
  },
  nextBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grayOpacity50,
    padding: 5,
    borderRadius: 20
  },
  imageBackground: {
    flex: 1,
  },
  circleContainer: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: moderateScale(90),
    width: moderateScale(90),
    bottom: deviceHeight / 8,
    backgroundColor: "white",
  },
  circleBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",

  }


});