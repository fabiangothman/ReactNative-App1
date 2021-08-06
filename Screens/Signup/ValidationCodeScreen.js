//Libraries
import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
//Components
import { FormButtonFull, FormButtonAuto } from '../../Components/FormButton';
import FormInputText from '../../Components/FormInputText';
import GeneralBase from '../../Components/GeneralBase';
import PrivacyTerms from '../../Components/PrivacyTerms';
import CardMessage from '../../Components/CardMessage';
//Styles
import { ValidationContainer,
    SupContainer,
    LogoImage,
    InfContainer,
    CardContainer,
    FieldInput,
    SubTitleText,
    TitleText } from '../../Styles/Screens/Signup/validationCode';
//Images
import planeoLogo from '../../assets/images/planeoLogoBlanco.png';
import UserImage from '../../assets/images/user-icon.png';
import { CustomAlert } from '../../Utils/CustomAlert';

const ValidationCodeScreen = ({route, navigation}) => {
    const { documentType, document, email, WF_userdata } = route.params;
    const [nums, setNums] = React.useState({ num1: "", num2: "", num3: "", num4: "", num5: "", num6: "" });
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();

    //Validar que si ya hizo la validación pase a la siguiente pantalla
    const nextStepHandler = async () => {
        const userCode = ""+nums.num1+nums.num2+nums.num3+nums.num4+nums.num5+nums.num6+"";
        if(userCode === WF_userdata.userData.codigoVerificacion.toString()){
            navigation.navigate("CheckInfo", { documentType, document, email, WF_userdata })
        }else{
            CustomAlert(
                'Ups!',
                'El código que ingresaste no es correcto, por favor verifica la información o pídele nuevamente el código a tu jefe.');
        }
    }

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={'auto'}>
            <ValidationContainer>
                <SupContainer>
                    <LogoImage source={planeoLogo} style={{resizeMode: 'contain'}} />
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <Image source={UserImage} style={styles.iconImage} />
                            
                            <TitleText style={styles.titleText}>¡Hola {WF_userdata.userData.names}!</TitleText>
                            <SubTitleText style={styles.subTitleText}>La seguridad de tus datos es nuestra prioridad.</SubTitleText>

                            <CardContainer style={{width: 340,}}>
                                <CardMessage style={styles.textsContainer}
                                    title="Código de validación"
                                    message="Si haces pate de una de nuestras empresas aliadas ingresa el código de verificación."
                                    preLoadedImageName="img_codVerificacion.png" />

                                <View style={styles.boxesContainer}>
                                    <View style={styles.columnItem}>
                                        <FieldInput multiline={false}
                                            value={nums.num1}
                                            autoFocus={false}
                                            onChangeText={(num) => {
                                                setNums({...nums, num1: num.slice(-1)});
                                                ref_input2.current.focus();
                                            }}
                                            keyboardType="numeric" />
                                    </View>
                                    <View style={styles.columnItem}>
                                        <FieldInput multiline={false}
                                            value={nums.num2}
                                            ref={ref_input2}
                                            onChangeText={(num) => {
                                                setNums({...nums, num2: num.slice(-1)});
                                                ref_input3.current.focus();
                                            }}
                                            keyboardType="numeric" />
                                    </View>
                                    <View style={styles.columnItem}>
                                        <FieldInput multiline={false}
                                            value={nums.num3}
                                            ref={ref_input3}
                                            onChangeText={(num) => {
                                                setNums({...nums, num3: num.slice(-1)});
                                                ref_input4.current.focus();
                                            }}
                                            keyboardType="numeric" />
                                    </View>
                                    <View style={styles.columnItem}>
                                        <FieldInput multiline={false}
                                            value={nums.num4}
                                            ref={ref_input4}
                                            onChangeText={(num) => {
                                                setNums({...nums, num4: num.slice(-1)});
                                                ref_input5.current.focus();
                                            }}
                                            keyboardType="numeric" />
                                    </View>
                                    <View style={styles.columnItem}>
                                        <FieldInput multiline={false}
                                            value={nums.num5}
                                            ref={ref_input5}
                                            onChangeText={(num) => {
                                                setNums({...nums, num5: num.slice(-1)});
                                                ref_input6.current.focus();
                                            }}
                                            keyboardType="numeric" />
                                    </View>
                                    <View style={styles.columnItem}>
                                        <FieldInput multiline={false}
                                            value={nums.num6}
                                            ref={ref_input6}
                                            onChangeText={(num) => setNums({...nums, num6: num.slice(-1)})}
                                            keyboardType="numeric" />
                                    </View>
                                </View>
                            </CardContainer>
                            
                            {/*<TouchableOpacity onPress={() => CustomAlert(
                                'Mantente atento',
                                'Esta funcionalidad estará disponible pronto.')}>
                                <CardContainer style={[styles.testCont, {width: 340}]}>
                                    <CardMessage style={styles.textsContainer}
                                        title="Test de identidad"
                                        message="Responde las preguntas de nuestro test y validar tu identidad."
                                        preLoadedImageName="img_testIdent.png" />
                                </CardContainer>
                            </TouchableOpacity>*/}

                            <FormButtonFull
                                buttonTitle="SIGUIENTE"
                                style={styles.formButtonFull}
                                borderLine={1}
                                onPress={() => nextStepHandler()} />

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>
            </ValidationContainer>
        </GeneralBase>
    );
};
export default ValidationCodeScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    iconImage:{
        width: '100%',
        height: 150,
        alignSelf: 'center',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginTop: 10,
    },
    titleText: {
        marginTop:20,
        color: '#343BA7',
        fontSize: 25,
        textAlign: 'center',
    },
    subTitleText: {
        marginVertical:20,
        textAlign: 'center',
        color: 'black',
    },
        textsContainer:{
            flexDirection: 'row',
        },
        boxesContainer:{
            marginTop: 10,
            flexDirection: 'row',
        },
    columnItem:{
        flexDirection: "column",
        margin:5,
    },
    testCont: {
        marginTop: 20,
        backgroundColor: '#c7c7c7',
    },
    formButtonFull: {
        paddingVertical:10,
        marginVertical:25,
    },
});