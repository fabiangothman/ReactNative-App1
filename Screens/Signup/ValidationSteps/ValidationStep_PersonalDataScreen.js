//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert, View } from 'react-native';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
//Styles
import { PersonalDataContainer, SupContainer, LogoImage, InfContainer, SubTitleText, TitleText, TextContainer, FooterContainer } from '../../../Styles/Screens/Signup/ValidationSteps/validationStep_PersonalData';
//Images
import satusbar_step1 from '../../../assets/images/satusbar_step1.png';
import { CustomAlert } from '../../../Utils/CustomAlert';
import { Text, TextBold } from '../../../Components/Text';

const ValidationStep_PersonalDataScreen = ({route, navigation}) => {
    const { documentType, document, email, WF_userdata } = route.params;

    //Validar que si ya esta confirmados los pasos de su información, no lo deje seguir
    const nextStepHandler = async () => {
        if(documentType===WF_userdata.userData.document_type && document===WF_userdata.userData.document_number.toString()){
            navigation.navigate("ValidationStep_JobData", { documentType, document, email, WF_userdata })
        }else{
            CustomAlert(
                'Ups!',
                'El tipo y/o número de documento que ingresaste no concuerda con los almacenados en nuestras base de datos, por favor verifica la información o envía un correo a '+WF_userdata.companyData.email+' con tu comentario.');
        }

    }

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={'auto'}>
            <PersonalDataContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <TextBold style={styles.headerTitle}>Verificación</TextBold>
                        <LogoImage source={satusbar_step1} style={{resizeMode: 'contain'}} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <SubTitleText style={{marginBottom: 20}}>A continuación podrás verificar <TextBold>tus datos personales</TextBold>. Si estos datos no son los correctos, debes reportarlo para que la empresa haga los ajustes necesarios.</SubTitleText>

                            <TextContainer>
                                <TitleText>Nombre completo</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.userData.names} {WF_userdata.userData.lastnames}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Documento de identidad</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.userData.document_type}. {WF_userdata.userData.document_number}</TextBold></SubTitleText>
                            </TextContainer>
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

                <FooterContainer>
                    <View style={styles.footerItemsContainer}>
                        <View style={styles.footerTextCont}>
                            <TitleText style={styles.footerText}>¿Tus datos son correctos?</TitleText>
                        </View>
                        <View style={styles.footerButtonCont}>
                            <FormButtonAuto buttonTitle="REPORTAR ERROR" style={styles.formButtonReportar}
                                textSize={18}
                                textColor={'#343BA7'}
                                borderLine={0}
                                onPress={() => CustomAlert(
                                    'Mantente atento',
                                    'Esta funcionalidad estará disponible pronto, por favor envía un correo a '+WF_userdata.companyData.email+' con tu comentario.')} />
                            <FormButtonAuto buttonTitle="CORRECTOS" style={styles.formButtonCorrectos}
                                textSize={18}
                                textColor={'white'}
                                borderLine={0}
                                onPress={() => nextStepHandler()} />
                        </View>
                    </View>
                </FooterContainer>
            </PersonalDataContainer>
        </GeneralBase>
    );
};
export default ValidationStep_PersonalDataScreen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
    },
    headerTitle: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    footerItemsContainer: {
        flex:1,
        flexDirection: 'column',
    },
    footerTextCont:{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 25,
        marginBottom: 10,
    },
        footerText:{
            color:'#333333',
        },
    footerButtonCont: {
        flexDirection: 'row',
        alignSelf: 'center',
        flexWrap: 'wrap',
    },
        formButtonReportar: {
            backgroundColor: '#DFE2F1',
            borderRadius: 30,
            paddingHorizontal: 15,
            paddingVertical: 7,
            margin: 5,
        },
        formButtonCorrectos: {
            backgroundColor: '#343BA7',
            borderRadius: 30,
            paddingHorizontal: 15,
            paddingVertical: 7,
            margin: 5,
        },
});