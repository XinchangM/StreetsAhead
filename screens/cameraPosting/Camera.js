import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground,StyleSheet,Button } from "react-native";
import { Camera } from "expo-camera";
import { Video } from 'expo-av';
import Icon from "react-native-vector-icons/Entypo";
import TypeIcon from "react-native-vector-icons/Entypo";
import NextButton from "../../components/NextButton";

export default function Camera({navigation}) {
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
    
    //Ask for permission
    useEffect(() => {
        const askPermission = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === "granted");
        };
        askPermission();
    }, []);
    if (hasPermission === null) {
        return <View/>;
      }
    if (hasPermission === false) {
        // Alert???
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
    <View style={styles.screen}>
        {(!preview&&!record)&&
        <Camera style={styles.camera} type={type} ref={camRef}>
            <View>
                <TouchableOpacity>
                    <Icon name="cycle" size={20} color="black" />
                </TouchableOpacity>
            </View>





            </Camera>}
      
    </View>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,    
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
    }
})