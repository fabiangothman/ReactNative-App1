//Libraries
import React from 'react';
import { View, StyleSheet, Switch, Platform } from 'react-native';
import { Text, TextBold } from './Text';

const CustomSwitch = ({text, textColor, ...props}) => {
    const txtColor = (textColor) ? textColor : 'black';

    return (
        <View style={styles.boxContainer}>
            <Switch style={styles.switch} {...props} />
            <Text style={[styles.text, {color: txtColor}]}>{text}</Text>
        </View>
    );
};
export default CustomSwitch;

const styles = StyleSheet.create({
    boxContainer:{
        width: '100%',
        flexDirection: 'row',
    },
    switch:{
        flexDirection: 'column',
        transform: (Platform.OS == 'ios') ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1.0 }, { scaleY: 1.0 }],
    },
    text:{
        flex: 9,
        flexDirection: 'column',
        textAlign: 'left',
        alignSelf: 'center',
        paddingLeft: 10,
        fontSize: 15,
    }
});