//Libraries
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Text, TextBold } from './Text';


const FileOptionsButton = ({btnText, btnIcon, ...props}) => {
    return (
        <View style={styles.optionsContainer}>
            <View style={styles.topContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 style={styles.icon} name={btnIcon} size={24} color={'#379AF4'} />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} {...props} >
                        <Text style={styles.text}>{btnText}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomContainer}></View>            
        </View>
    );
};
export default FileOptionsButton;

const styles = StyleSheet.create({
    optionsContainer:{
        //flex:1,
    },
    topContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
        iconContainer:{
            width: 35,
            paddingHorizontal: 5,
        },
            icon:{
                textAlign: 'center',
            },
        btnContainer:{
            paddingHorizontal: 10,
            paddingVertical: 6,
        },
            btn:{
                //
            },
            text:{
                color: '#707070',
                textAlign: 'center',
                fontSize: 20,
            },
    bottomContainer:{
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#00000029',
        marginLeft: 50,
    },
});