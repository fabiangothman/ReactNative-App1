//Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import FileOptionsButton from './FileOptionsButton';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";
import FormInputText from './FormInputText';
import { FormButtonAuto } from './FormButton';
import { Text, TextBold } from './Text';

const GastoModal = ({modalVisible, setModalVisible, image, title, text, gastos, setGastos, propertyToEdit, ...props}) => {
    //No se pueden hacer llamados dinámicos a importar imágenes
    if(image=='presupuesto_vivienda_grande.png')
        image = require('../assets/images/presupuesto_vivienda_grande.png');
    else if(image=='presupuesto_alimentacion_grande.png')
        image = require('../assets/images/presupuesto_alimentacion_grande.png');
    else if(image=='presupuesto_transporte_grande.png')
        image = require('../assets/images/presupuesto_transporte_grande.png');
    else if(image=='presupuesto_salud_grande.png')
        image = require('../assets/images/presupuesto_salud_grande.png');
    else if(image=='presupuesto_deudas_grande.png')
        image = require('../assets/images/presupuesto_deudas_grande.png');
    else if(image=='presupuesto_educacion_grande.png')
        image = require('../assets/images/presupuesto_educacion_grande.png');
    else if(image=='presupuesto_recreacion_grande.png')
        image = require('../assets/images/presupuesto_recreacion_grande.png');
    else
        image = require('../assets/images/presupuesto_otro_grande.png');
    
    const handleSetGastos = async (value) => {
        gastos[propertyToEdit] = value;
        setGastos({...gastos});
    }

    useEffect(() => {
        //setModalVisible(true);
    }, [setModalVisible, setGastos]);
    
    return (modalVisible) ? (
        <Modal {...props} animationType="fade" style={{flex: 1}}
            transparent={true}
            visible={true} >
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.generalCont}>
                    <View style={styles.topCont}></View>
                    <View style={styles.centeredCont}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.contentContainer}>
                                <SafeAreaView style={{width: '100%'}}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Image source={image} style={styles.imgIcon} />
                                        <TextBold style={styles.title}>{title}</TextBold>
                                        <Text style={styles.subTitle}>{text}</Text>

                                        <FormInputText
                                            labelValue={(gastos[propertyToEdit]) ? gastos[propertyToEdit].toString() : ""}
                                            onChangeText={(val) => handleSetGastos(val)}
                                            onEndEditing={() => {}}
                                            placeholderText="Valor mensual apoximado *"
                                            antIconType="form"
                                            iconColor="#379AF4"
                                            fontSize={16}
                                            color='black'
                                            fontWeight='normal'
                                            marginUp={5}
                                            marginDown={5}
                                            keyboardType="numeric"
                                            autoCapitalize="none"
                                            autoCorrect={false} />
                                        
                                        <FormButtonAuto
                                            buttonTitle="AGREGAR"
                                            style={styles.formButtonAuto}
                                            borderLine={0}
                                            textSize={18}
                                            textColor={'white'}
                                            onPress={() => setModalVisible(false)} />
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.bottomCont}></View>
                </TouchableOpacity>
            </View>
        </Modal>
    ) : null;
};
export default GastoModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    generalCont:{
        flex: 1,
        flexDirection: 'column',
    },
    topCont:{
        flex: 1,
    },
    centeredCont: {
        width: '90%',
        minWidth: 200,
        alignSelf: 'center',
    },
        contentContainer:{
            //flex: 1,
            width: '100%',
            backgroundColor: 'white',
            paddingVertical: 30,
            paddingHorizontal: 40,
        },
            imgIcon: {
                width: '100%',
                height: 108,
                alignSelf: 'center',
                aspectRatio: 1,
                resizeMode: 'contain',
                marginBottom: 5,
            },
            title:{
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                marginBottom: 15,
            },
            subTitle:{
                textAlign: 'center',
                fontSize: 14,
                color: 'gray',
                marginBottom: 15,
            },
            formButtonAuto: {
                backgroundColor: '#343BA7',
                paddingVertical: 10,
                paddingHorizontal: 70,
                marginVertical: 20,
            },
    bottomCont:{
        flex: 1,
    },
});