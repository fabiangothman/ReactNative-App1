//Libraries
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import firebase from 'firebase/app';
import 'firebase/firestore';
//Components
import { FormButtonFull, FormButtonAuto } from '../../Components/FormButton';
import FormInputText from '../../Components/FormInputText';
import FormInputSelect from '../../Components/FormInputSelect';
import GeneralBase from '../../Components/GeneralBase';
import PrivacyTerms from '../../Components/PrivacyTerms';
import CustomSwitch from '../../Components/CustomSwitch';
//Styles
import { SignupContainer, SupContainer, LogoImage, InfContainer, SubTitleText, TitleText, LinkText } from '../../Styles/Screens/Signup/signup';
//Images
import planeoLogo from '../../assets/images/planeoLogoBlanco.png';
//Utils
import { validateEmail, validateDocument, objectContainsValue } from '../../Utils/Validations';
//Config
import { endPointsConfig } from '../../configGeneral';
import { CustomAlert } from '../../Utils/CustomAlert';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [document, setDocument] = useState(null);
    const [documentType, setDocumentType] = useState('CC');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [signing, setSigning] = useState(false);

    const documentTypes = [
        {label: 'Cédula de ciudadanía', value: 'CC'},
        {label: 'Tarjeta de identidad', value: 'TI'},
        {label: 'Pasaporte', value: 'PAS'},
    ];

    const fetchUserExistsByDocument = async (document) => {
        let num = 0;
        await firebase.firestore().collection('users')
            .where('document', '==', document).orderBy('email', 'desc').get().then((queryResult) => {
                num = queryResult.size;
            }).catch(error => {
                console.log(error);
                alert(error);
            });
        return num;
    }

    //Validar que si ya esta registrado no deje pasar
    const nextStepHandler = async () => {
        setSigning(true);
        if(objectContainsValue(documentTypes, documentType) && validateDocument(document) && validateEmail(email) && termsAccepted){
            //Se validará si ya esta registrado al final, por seguridad y para usar "signInWithEmailAndPassword"
            try{
                if(!await fetchUserExistsByDocument(document)){
                    await fetch(endPointsConfig.WF_nomina_endpoint, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_document_number: document,
                        })
                    }).then(response => response.json()).then((data) => {
                        if(!data.error){
                            navigation.navigate("ValidationCode", { documentType, document, email, WF_userdata: data.resp });
                        }else{
                            alert("Ocurrió un error al traer tu nómina de empresa de WF, por favor verifica el estado de tu usuario con tu administrador de RH: "+data.error);
                        }
                    }).catch(error => {
                        console.log(error);
                        alert(error);
                    });
                }else{
                    CustomAlert(
                        'Documento existente',
                        'El documento que digitaste ya se encuentra registrado en nuestras bases de datos de Planeo, ve a la sección de inicio de sesión.');
                }
            }catch(e){
                console.log(e);
                alert(e);
            }
        }else{
            CustomAlert(
                'Revisa tus datos',
                'Uno o más datos no son correctos, por favor verifica tu información ingresada, o si no has aceptado los términos y condiciones.');
        }
        setSigning(false);
    }

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={'auto'}>
            <SignupContainer>
                <SupContainer>
                    <LogoImage source={planeoLogo} style={{resizeMode: 'contain'}} />
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText style={styles.titleText}>Ingresa tus datos</TitleText>
                            <SubTitleText style={styles.subTitleText}>Ingresando tus datos podremos validar la empresa contratante.</SubTitleText>

                            <FormInputSelect
                                value={documentType}
                                items={documentTypes}
                                onValueChange={value => setDocumentType(value)}
                                placeholderText="Tipo de documento"
                                antIconType="idcard"
                                iconColor="#379AF4"
                                fontWeight='normal'
                                color='black'
                                marginDown={5}
                                fontSize={16} />
                            
                            <FormInputText 
                                labelValue={document}
                                onChangeText={(userDocument) => setDocument(userDocument)}
                                onEndEditing={() => {}}
                                placeholderText="Número de documento"
                                antIconType="idcard"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={5}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false} />

                            <FormInputText
                                labelValue={email}
                                onChangeText={(userEmail) => setEmail(userEmail)}
                                onEndEditing={() => {}}
                                placeholderText="Correo electrónico"
                                antIconType="mail"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false} />

                            <View style={styles.termsContainer}>
                                <View style={styles.switchContainer}>
                                    <CustomSwitch
                                        text=""
                                        color="blue"
                                        ios_backgroundColor="grey"
                                        thumbColor='white'
                                        trackColor={{true:'#343ba7', false:'grey' }}
                                        value={termsAccepted}
                                        onValueChange={(value) => {setTermsAccepted(value);/*toggleRememberMe(value);*/}}
                                        disabled={false} />
                                </View>
                                <View style={styles.privacyTerms}>
                                    <PrivacyTerms screenBack="Signup" />
                                </View>
                            </View>

                            {signing ? (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <FormButtonFull
                                    buttonTitle="INGRESAR"
                                    borderLine={1}
                                    style={styles.formButtonFull}
                                    onPress={() => nextStepHandler()} />
                            )}

                            <SubTitleText style={[styles.subText]}>¿Ya tienes una cuenta?</SubTitleText>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <LinkText style={styles.linkText}>Inicia Sesión</LinkText>
                            </TouchableOpacity>
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>
            </SignupContainer>
        </GeneralBase>
    );
};
export default SignupScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    titleText: {
        marginTop:20,
    },
    subTitleText: {
        marginVertical:20,
        textAlign: 'left',
    },
    termsContainer:{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 20,
    },
        switchContainer:{
            flex: 1.9,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        privacyTerms: {
            //marginTop:20,
            flex: 8.1,
            flexDirection: 'column',
        },
    formButtonFull: {
        paddingVertical:10,
        marginVertical:25,
    },
    subText: {
        marginVertical:2,
        textAlign: 'center',
    },
    linkText: {
        marginVertical: 0,
        textAlign:'center'
    },
});