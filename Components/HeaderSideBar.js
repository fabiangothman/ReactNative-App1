//Libraries
import React, { useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Images
import planeoLogo from '../assets/images/planeoLogo_smallNegro.png';

const HeaderSideBar = ({...props}) => {

    return (
        <View style={styles.headerContainer}>
            <View style={styles.imgCont}>
                <Image source={planeoLogo} style={styles.imgLogo} />
            </View>
            <TouchableOpacity style={styles.btnExpand} {...props} >
                <AntDesign name={"menu-unfold"} size={26} color={"#343BA7"} />
            </TouchableOpacity>
        </View>
    );
};
export default HeaderSideBar;

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
    },
        imgCont:{
            flexDirection: 'column',
            flex:10,
            alignSelf: 'center',
        },
            imgLogo:{
                width: 135,
                height: 36,
            },
        btnExpand:{
            padding:5,
            flexDirection: 'column',
            alignSelf: 'center',
        },
});