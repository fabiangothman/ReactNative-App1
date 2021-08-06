//Libraries
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text, TextBold } from './../Components/Text';

const FeatureCard = ({title, bgColor, cardWidth, cardHeight, preLoadedImageName, notificationsNumber, filesNumber, ...props}) => {
    let image = null;
    //No se pueden hacer llamados dinámicos a importar imágenes
    if(preLoadedImageName=='iconDocumentos.png')
        image = require('../assets/images/iconDocumentos.png');
    else if(preLoadedImageName=='iconCertificados.png')
        image = require('../assets/images/iconCertificados.png');
    else if(preLoadedImageName=='iconEnvio.png')
        image = require('../assets/images/iconEnvio.png');
    else if(preLoadedImageName=='iconNomina.png')
        image = require('../assets/images/iconNomina.png');

    const styles = StyleSheet.create({
        cardContainer: {
            height: (cardHeight) ? cardHeight : 150,
            width: (cardWidth) ? cardWidth : 155,
            padding:15,
            borderRadius: 18,
        },
    
        supContainer:{
            flexDirection: 'row',
        },
            notifCont:{
                flexDirection: 'column',
                flex: 4,
            },
                notifField:{
                    paddingVertical: 2,
                    borderRadius: 15,
                    backgroundColor: '#D60000',
                    maxWidth: 40,
                    flexDirection: 'row',
                    justifyContent: 'center'
                },
                    notifIcon:{
                        flexDirection: 'column',
                        alignSelf: 'center',
                    },
                    notifNumber:{
                        color: 'white',
                        flexDirection: 'column',
                    },
            imgCont:{
                flexDirection: 'column',
                flex: 10,
            },
                imgIcon: {
                    width: '100%',
                    height: 60,
                    alignSelf: 'flex-end',
                    aspectRatio: 1,
                    resizeMode: 'contain',
                },
        infContainer:{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
        },
            titleText: {
                color: 'white',
                fontSize: 19,
                textAlign: 'left',
            },
            filesText: {
                color: 'white',
                fontSize: 15,
                textAlign: 'left',
            },
    });

    return(
        <View {...props}>
            <View style={[styles.cardContainer, {backgroundColor: bgColor}]}>
                <View style={styles.supContainer}>
                    <View style={styles.notifCont}>
                        {(notificationsNumber && notificationsNumber>0) ? (
                            <View style={styles.notifField}>
                                <AntDesign style={styles.notifIcon} name={"bells"} size={15} color={"white"} />
                                <Text style={styles.notifNumber}>{notificationsNumber}</Text>
                            </View>
                        ) : null }
                    </View>
                    <View style={styles.imgCont}>
                        <Image source={image} style={styles.imgIcon} />
                    </View>
                </View>
                <View style={styles.infContainer}>
                    <TextBold style={styles.titleText} textBreakStrategy='simple'>{title}</TextBold>
                    {filesNumber===undefined ? null : (
                    <Text style={styles.filesText} textBreakStrategy='simple'>{filesNumber} archivos</Text>
                    ) }
                </View>
            </View>
        </View>
    );
};
export default FeatureCard;