//Libraries
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Images

const HeaderEquiz = ({...props}) => {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.btnBack} {...props} >
                <AntDesign name={"close"} size={26} color={"#343BA7"} />
            </TouchableOpacity>
        </View>
    );
};
export default HeaderEquiz;

const styles = StyleSheet.create({
    headerContainer:{
        alignItems: 'flex-end',
    },
        btnBack:{
            padding: 5,
        },
});