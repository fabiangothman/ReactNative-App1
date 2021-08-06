//Libraries
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, TextBold } from './Text';

const GastosCard = ({iconImage, text, value, ...props}) => {
    let image = null;
    //No se pueden hacer llamados dinámicos a importar imágenes
    if(iconImage=='presupuesto_vivienda.png')
        image = require('../assets/images/presupuesto_vivienda.png');
    else if(iconImage=='presupuesto_alimentacion.png')
        image = require('../assets/images/presupuesto_alimentacion.png');
    else if(iconImage=='presupuesto_transporte.png')
        image = require('../assets/images/presupuesto_transporte.png');
    else if(iconImage=='presupuesto_salud.png')
        image = require('../assets/images/presupuesto_salud.png');
    else if(iconImage=='presupuesto_deudas.png')
        image = require('../assets/images/presupuesto_deudas.png');
    else if(iconImage=='presupuesto_educacion.png')
        image = require('../assets/images/presupuesto_educacion.png');
    else if(iconImage=='presupuesto_recreacion.png')
        image = require('../assets/images/presupuesto_recreacion.png');
    else
        image = require('../assets/images/presupuesto_otro.png');

    return(
        <View {...props}>
            <View style={styles.cardContainer}>
                <Image source={image} style={styles.imgIcon} />
                <TextBold style={[styles.text, {color: "#102151"}]}>{text}</TextBold>
                <TextBold style={[styles.text, {color: "#707070"}]}>${(value) ? value : 0}</TextBold>
            </View>
        </View>
    );
};
export default GastosCard;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 5,
        width: 145,
        //height: 110,
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
        imgIcon: {
            width: '100%',
            height: 36,
            alignSelf: 'center',
            aspectRatio: 1,
            resizeMode: 'contain',
            marginBottom: 5,
        },
        text:{
            minHeight: 14,
            fontSize: 14,
            color: "#102151",
            textAlign: 'center',
        },
});