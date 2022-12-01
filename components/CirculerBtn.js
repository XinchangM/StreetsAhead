import React from 'react';
import colors from '../styles/colors';
import { moderateScale } from '../styles/responsive';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";

const Circulerbtn = ({
    text,
    onPress
}) => {
    return (
        <TouchableOpacity style={{}}>
{/* 
            <Image
                source={{ uri: 'https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg' }}
                style={styles.imgStyle}
            /> */}
            
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >

            <View style={styles.bottomView}>
                <Icon name="direction" size={20} color="black" />
            </View>
            </Pressable>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: colors.white,
        borderRadius: moderateScale(24),
        alignSelf: 'flex-start',
        padding: 4
    },
    textStyle: {
        alignSelf: 'center',
        color: colors.black,
    },
    imgStyle: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
});


export default Circulerbtn;
