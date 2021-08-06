//Libraries
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Images
import navIcon_certificado from '../assets/images/navIcon_certificado.png';
import navIcon_carpeta from '../assets/images/navIcon_carpeta.png';
import navIcon_subir from '../assets/images/navIcon_subir.png';
import navIcon_buscar from '../assets/images/navIcon_buscar.png';
import navIcon_envio from '../assets/images/navIcon_envio.png';
import { Text, TextBold } from './Text';

const NavigationTab = ({pressCertificado, pressCarpeta, pressSubir, pressBuscar, pressEnvio}) => (
    <View style={styles.generalCont}>
        <View style={styles.contTabs}>
            <TouchableOpacity style={styles.tab} onPress={pressCertificado}>
                <View>
                    <Image style={styles.imgIcon} source={navIcon_certificado} />
                    <TextBold style={styles.text}>Certificado</TextBold>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={pressCarpeta}>
                <View>
                    <Image style={styles.imgIcon} source={navIcon_carpeta} />
                    <TextBold style={styles.text}>Carpeta</TextBold>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={pressSubir}>
                <View>
                    <Image style={styles.imgIcon} source={navIcon_subir} />
                    <TextBold style={styles.text}>Subir</TextBold>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={pressBuscar}>
                <View>
                    <Image style={styles.imgIcon} source={navIcon_buscar} />
                    <TextBold style={styles.text}>Buscar</TextBold>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={pressEnvio}>
                <View>
                    <Image style={styles.imgIcon} source={navIcon_envio} />
                    <TextBold style={styles.text}>Envio</TextBold>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);
export default NavigationTab;

const styles = StyleSheet.create({
    generalCont:{
        width: '100%',
        elevation: 1,
        backgroundColor: 'white',
    },
    contTabs:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    tab:{
        flexDirection: 'column',
        flex:2,
        alignItems: 'center',
        marginHorizontal: 1,
    },
        imgIcon:{
            width: '100%',
            height: 22,
            alignSelf: 'center',
            aspectRatio: 1,
            resizeMode: 'contain',
        },
        text:{
            fontSize: 12,
            color: 'black',
            textAlign: 'center',
        },
});