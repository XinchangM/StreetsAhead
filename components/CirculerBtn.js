import React from 'react';
import { moderateScale } from '../styles/Responsive';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../styles/Colors';

const Circulerbtn = ({
    text,
    onPress
}) => {
    return (
        <TouchableOpacity style={{}}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed} >

                <View style={styles.bottomView}>
                    <Icon name="locate" size={moderateScale(30)} color="black" />
                </View>
            </Pressable>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.2
    },
    bottomView: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(24),
        alignSelf: 'flex-start',
        padding: 4
    },
    textStyle: {
        alignSelf: 'center',
        color: Colors.black,
    },
    imgStyle: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
});


export default Circulerbtn;
