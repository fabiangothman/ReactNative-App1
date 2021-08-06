//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert, View } from 'react-native';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
//Styles
import { JobDataContainer, SupContainer, LogoImage, InfContainer, SubTitleText, TitleText, TextContainer, FooterContainer } from '../../../Styles/Screens/Signup/ValidationSteps/ValidationStep_JobData';
//Images
import satusbar_step2 from '../../../assets/images/satusbar_step2.png';
import { TextButton } from '../../../Styles/Components/formButton';
//Utils
import { convertNumberToString } from '../../../Utils/Numbers';
import { CustomAlert } from '../../../Utils/CustomAlert';
import { Text, TextBold } from '../../../Components/Text';

const ValidationStep_JobDataScreen = ({route, navigation}) => {
    const { documentType, document, email, WF_userdata } = route.params;
    
    const userData = {
        email: email,
        documentType: documentType,
        document: document,
        userCreationCode: WF_userdata.userData.codigoVerificacion,
        names: WF_userdata.userData.names,
        lastnames: WF_userdata.userData.lastnames,
    };
    const companyData = {
        name: WF_userdata.companyData.username,
        nit: WF_userdata.companyData.nit,
        verificationDigit: WF_userdata.companyData.digitoVer,
    };

    const nextStepHandler = async () => {
        navigation.navigate("ValidationStep_AccountData", { userData, companyData })
    }

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={'auto'}>
            <JobDataContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <TextBold style={styles.headerTitle}>Verificación</TextBold>
                        <LogoImage source={satusbar_step2} style={{resizeMode: 'contain'}} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <SubTitleText style={{marginBottom: 20}}>A continuación podrás verificar los datos que tenemos de <TextButton>tu empleo actual</TextButton>. Si estos datos no son los correctos, debes reportarlo para que la empresa haga los ajustes necesarios.</SubTitleText>
                            
                            <TextContainer>
                                <TitleText>Nombre de la empresa</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.companyData.username}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Tipo de contrato</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.userData.salary_type}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Salario básico mensual</TitleText>
                                <SubTitleText><TextBold>${convertNumberToString(WF_userdata.userData.salary)}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Salario extralegal</TitleText>
                                <SubTitleText><TextBold>${convertNumberToString(WF_userdata.userData.bons_no_ss)}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Bonificaciones</TitleText>
                                <SubTitleText><TextBold>${convertNumberToString(WF_userdata.userData.bons_with_ss)}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Cargo</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.userData.role}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Tipo de contrato</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.userData.contract_type}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Fecha de Ingreso</TitleText>
                                <SubTitleText><TextBold>{WF_userdata.userData.contract_startdate}</TextBold></SubTitleText>
                            </TextContainer>

                            <TextContainer>
                                <TitleText>Fecha de Finalización</TitleText>
                                <SubTitleText><TextBold>{(WF_userdata.userData.contract_enddate != "") ? WF_userdata.userData.contract_enddate : "N/A"}</TextBold></SubTitleText>
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
            </JobDataContainer>
        </GeneralBase>
    );
};
export default ValidationStep_JobDataScreen;

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