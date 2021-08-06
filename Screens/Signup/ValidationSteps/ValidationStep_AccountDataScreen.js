//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
import FormInputText from '../../../Components/FormInputText';
import CustomSwitch from '../../../Components/CustomSwitch';
import PrivacyTerms from '../../../Components/PrivacyTerms';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
//Styles
import { AccountDataContainer, SupContainer, LogoImage, InfContainer, SubTitleText, TitleText } from '../../../Styles/Screens/Signup/ValidationSteps/ValidationStep_AccountData';
//Images
import satusbar_step3 from '../../../assets/images/satusbar_step3.png';
import { CustomAlert } from '../../../Utils/CustomAlert';
import { Text, TextBold } from '../../../Components/Text';

const ValidationStep_AccountDataScreen = ({route, navigation}) => {
    const { register } = useContext(AuthContext);

    const { userData, companyData } = (route.params.routeParams) ? route.params.routeParams : route.params;
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [signing, setSigning] = useState(false);

    const handleRegister = async () => {
        if(password === confirmPassword){
            if(termsAccepted){
                setSigning(true);
                userData.phone = phone;
                userData.address = address;
                
                if(await register(userData, password, companyData))
                    navigation.navigate("Login");
                else
                    setSigning(false);
            }else{
                CustomAlert(
                    'Términos y condiciones',
                    'Para continuar, debes aceptar nuestros términos y condiciones.');
            }
        }else{
            CustomAlert(
                'Contraseñas diferentes',
                'Los campo de contraseña y confirmación de contraseña no coinciden, por favor rectifica la información.');
        }
    }

    //Validar que si ya esta confirmados los pasos de su información, no lo deje seguir

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={'auto'}>
            <AccountDataContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <TextBold style={styles.headerTitle}>Verificación</TextBold>
                        <LogoImage source={satusbar_step3} style={{resizeMode: 'contain'}} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText>Crea tu cuenta</TitleText>
                            <SubTitleText style={{marginVertical: 15}}>Para finalizar <TextBold>configura tu cuenta</TextBold>.</SubTitleText>

                            <FormInputText
                                labelValue={phone}
                                onChangeText={(text) => setPhone(text)}
                                placeholderText="Teléfono de contacto"
                                antIconType="phone"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginDown={5}                                
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false} />

                            <FormInputText 
                                labelValue={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholderText="Dirección de residencia"
                                antIconType="home"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={5}
                                autoCorrect={false} />
                            
                            <FormInputText
                                labelValue={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholderText="Contraseña"
                                antIconType="lock"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={5}
                                autoCorrect={false}
                                secureTextEntry={true} />
                                
                            <FormInputText 
                                labelValue={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                placeholderText="Confirmar contraseña"
                                antIconType="lock"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                autoCorrect={false}
                                secureTextEntry={true} />

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
                                    <PrivacyTerms screenBack="ValidationStep_AccountData" routeParams={{userData:userData, companyData:companyData}} />
                                </View>
                            </View>

                            {signing ? (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <FormButtonFull
                                    buttonTitle="FINALIZAR"
                                    borderLine={1}
                                    style={styles.formButtonFull}
                                    onPress={() => handleRegister()} />
                            )}
                            
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>
            </AccountDataContainer>
        </GeneralBase>
    );
};
export default ValidationStep_AccountDataScreen;

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
        marginBottom: 25,
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});