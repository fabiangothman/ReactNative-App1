//Libraries
import React, { useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text, TextBold } from './Text';

//Images

const HeaderCentered = ({title, bgColor, txtColor, iconColor, ...props}) => {
    iconColor = (iconColor) ? iconColor : 'white';
    txtColor = (txtColor) ? txtColor : 'white';
    bgColor = (bgColor) ? bgColor : 'transparent';

    return (
        <View style={[styles.headerContainer, {backgroundColor: bgColor}]}>
            <TouchableOpacity style={styles.btnBack} {...props} >
                <AntDesign name={"arrowleft"} size={26} color={iconColor} />
            </TouchableOpacity>
            <TextBold style={[styles.title, {color: txtColor}]}>{title}</TextBold>
        </View>
    );
};
export default HeaderCentered;

const styles = StyleSheet.create({
    headerContainer:{
        paddingVertical: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
        btnBack:{
            paddingHorizontal: 5,
        },
        title:{
            fontSize: 23,
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            marginRight:36,
        },
});