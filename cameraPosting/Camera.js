import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";


export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef();
  const navigation = useNavigation();

  //#region layout options nav
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
    });
  }, []);
  //#endregion
  //#region camera permission
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
    return <Text>Accès refusé à la camera</Text>;
  }
  //#endregion
  //#region  take photo function
  const takePhoto = async () => {
    if (!camRef) return;
    try {
      const snap = await camRef.current?.takePictureAsync();
      setPreview(snap);
    } catch (err) {
      alert(err);
    }
  };
  //#endregion

  return (
    <View style={tw`items-center justify-center w-full h-full`}>
      {!preview ? (
        <Camera style={tw`h-full w-full`} type={type} ref={camRef}>
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
                style={tw`bg-black w-16 h-16 rounded-full`}
                onPress={() => takePhoto()}
              ></TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
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
            </TouchableOpacity>
          </View>
          {/* <SendButton
            disabled={false}
            bg={"bg-white"}
            onPress={() => navigation.navigate("SendScreen", { ...preview })}
          /> */}
          <ImageBackground
            source={{ uri: preview?.uri }}
            width={100}
            height={100}
            style={tw`flex-1`}
          />
        </View>
      )}
    </View>
  );
}
