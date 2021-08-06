//Libraries
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text, TextBold } from './Text';
//Images

const HeaderBreadcrumb = ({pageTitle, pageSubtitle, ...props}) => {

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.btnBack} {...props} >
                <AntDesign name={"arrowleft"} size={26} color={"#343BA7"} />
            </TouchableOpacity>
            <View style={styles.textCont}>
                <TextBold style={styles.pageTitle}>{pageTitle}</TextBold>
                <Text style={styles.pageSubtitle}>{pageSubtitle}</Text>
            </View>
        </View>
    );
};
export default HeaderBreadcrumb;

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
    },
        btnBack:{
            flexDirection: 'column',
            flex: 1.5,
            justifyContent: 'center',
        },
        textCont:{
            flexDirection: 'column',
            flex: 10,
        },
            pageTitle:{
                fontSize: 24,
                fontWeight: '500',
                color: 'black',
            },
            pageSubtitle:{
                fontSize: 15,
                color: '#ABB0B7',
            },
});