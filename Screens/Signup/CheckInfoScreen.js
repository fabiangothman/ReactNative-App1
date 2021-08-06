//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
//Components
import { FormButtonFull, FormButtonAuto } from '../../Components/FormButton';
import GeneralBase from '../../Components/GeneralBase';
//Navigation
import { AuthContext } from '../../Navigation/AuthProvider';
//Styles
import { CheckInfoContainer, SupContainer, LogoImage, InfContainer, SubTitleText, TitleText } from '../../Styles/Screens/Signup/checkInfo';
//Images
import planeoLogo from '../../assets/images/planeoLogoNegro.png';
import img_analisRapido from '../../assets/images/img_analisRapido.png';

const CheckInfoScreen = ({route, navigation}) => {
    const { documentType, document, email, WF_userdata } = route.params;

    //Validar que si ya esta confirmados los pasos de su información, no lo deje seguir

    return (
        <GeneralBase backgroundColor={'#F4F6FA'} loadBgImage={false} marginTop={0}>
            <CheckInfoContainer>
                <SupContainer>
                    <LogoImage source={planeoLogo} style={{resizeMode: 'contain'}} />
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <Image source={img_analisRapido} style={styles.iconImage} />

                            <TitleText style={styles.titleText}>Revisa tu información</TitleText>
                            <SubTitleText style={styles.subTitleText}>Para asegurarte que tus certificados se generen con la información correcta, debes revisar la información que vamos a mostrar a continuación.</SubTitleText>

                            <FormButtonAuto
                                buttonTitle="REVISAR"
                                style={styles.formButtonAuto}
                                borderLine={0}
                                textSize={18}
                                textColor={'white'}
                                onPress={() => {navigation.navigate("ValidationStep_PersonalData", { documentType, document, email, WF_userdata })}} />
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>
            </CheckInfoContainer>
        </GeneralBase>
    );
};
export default CheckInfoScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    iconImage:{
        width: '100%',
        height: 60,
        alignSelf: 'center',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    titleText: {
        fontSize: 28,
        textAlign: 'center',
        marginVertical: 25,
    },
    subTitleText: {
        textAlign: 'center',
        color: '#707070',
    },
    formButtonAuto: {
        marginTop: 40,
        backgroundColor: '#343BA7',
        paddingVertical: 10,
        paddingHorizontal: 80,
    },
});