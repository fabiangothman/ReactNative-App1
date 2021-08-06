//Libraries
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { convertNumberToString } from '../Utils/Numbers';
import { Text, TextBold } from './Text';

const CardMessageBarra = ({image, title, subtitle, value, valueColor, showLine, percent, barColor, ...props}) => {
    //No se pueden hacer llamados dinámicos a importar imágenes
    if(image=='icon_cuentas.png')
        image = require('../assets/images/icon_cuentas.png');
    else if(image=='icon_billetes.png')
        image = require('../assets/images/icon_billetes.png');
    else
        image = require('../assets/images/icon_billetes.png');

    valueColor = (valueColor) ? valueColor : 'black';
    barColor = (barColor) ? barColor : '#4048CC';

    return (
        <TouchableOpacity {...props}>
            <View style={styles.cardContainer}>
                <View style={styles.supContainer}>
                    <View style={styles.colAuto}>
                        <Image source={image} style={styles.imgIcon} />
                    </View>
                    <View style={[styles.col, {flex: 1,}]}>
                        <TextBold style={styles.title}>{title}</TextBold>
                        <Text style={styles.subTitle}>{subtitle}</Text>
                    </View>
                    <View style={styles.col}>
                        <TextBold style={[styles.value, {color: valueColor}]}>${convertNumberToString(value)}</TextBold>
                    </View>
                </View>
                {showLine ? (
                    <View style={styles.infContainer}>
                        <View style={styles.barCont}>
                            <View style={[styles.barProgress, {width: percent, backgroundColor: barColor}]}></View>
                        </View>
                        <Text style={styles.barText}>{percent} de tus ingresos mensuales</Text>
                    </View>
                ) : null }
            </View>
        </TouchableOpacity>
    );
};
export default CardMessageBarra;

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    supContainer: {
        flexDirection: 'row',
    },
        colAuto: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        col: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
            imgIcon: {
                width: '100%',
                height: 45,
                alignSelf: 'center',
                aspectRatio: 1,
                resizeMode: 'contain',
                marginRight: 10,
            },
            title:{
                color: '#333333',
                fontSize: 15,
            },
            subTitle: {
                color: '#7C828A',
                fontSize: 13,
            },
            value: {
                //color: '#27DEBF',
                fontSize: 18,
                textAlign: 'right',
            },
    infContainer: {
        marginTop: 20,
    },
        barCont: {
            height: 8,
            backgroundColor: '#E2E7EE',
            borderRadius: 20,
            overflow: 'hidden',
        },
            barProgress: {
                width: '0%',
                height: '100%',
                borderRadius: 20,
                //backgroundColor: '#379AF4',
            },
        barText: {
            textAlign: 'right',
            color: '#707070',
            fontSize: 12,
        },
});