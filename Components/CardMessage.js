//Libraries
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextBold } from './Text';

const CardMessage = ({title, message, preLoadedImageName, ...props}) => {
    let image = null;
    //No se pueden hacer llamados dinámicos a importar imágenes
    if(preLoadedImageName=='img_codVerificacion.png')
        image = require('../assets/images/img_codVerificacion.png');
    else if(preLoadedImageName=='img_testIdent.png')
        image = require('../assets/images/img_testIdent.png');
    else if(preLoadedImageName=='img_otrasNomina.png')
        image = require('../assets/images/img_otrasNomina.png');
    else if(preLoadedImageName=='img_otrasPresupuesto.png')
        image = require('../assets/images/img_otrasPresupuesto.png');
    else if(preLoadedImageName=='img_liquidacionRetiro.png')
        image = require('../assets/images/img_liquidacionRetiro.png');

    return(
        <View {...props}>
            <View style={styles.colsContainer}>
                <View style={styles.codigoLeft}>
                    <TextBold style={styles.titleText}>{title}</TextBold>
                    <Text style={styles.subtitleText}>{message}</Text>
                </View>
                <View style={[styles.codigoRight, {justifyContent:'center'}]}>
                    <Image source={image} style={styles.imgIcon} />
                </View>
            </View>
        </View>
    );
};
export default CardMessage;

const styles = StyleSheet.create({
    colsContainer: {
        flexDirection: "row",
        flex: 1,
    },
    codigoLeft: {
        flexDirection: "column",
        flex: 9,
    },
        titleText: {
            color: '#343BA7',
            fontSize: 22,
            textAlign: 'left',
        },
        subtitleText: {
            marginVertical: 5,
            color: '#707070',
            fontSize: 16,
        },
    codigoRight: {
        flexDirection: "column",
        flex: 3,
    },
        imgIcon:{
            width: '100%',
            height: 70,
            alignSelf: 'center',
            aspectRatio: 1,
            resizeMode: 'contain',
        },
});