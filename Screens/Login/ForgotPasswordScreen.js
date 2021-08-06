//Libraries
import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
//Components
import { FormButtonFull, FormButtonAuto } from '../../Components/FormButton';
import FormInputText from '../../Components/FormInputText';
import GeneralBase from '../../Components/GeneralBase';
//Styles
import { PasswordContainer, SupContainer, LogoImage, InfContainer, SubTitleText } from '../../Styles/Screens/Login/forgotPassword';
//Images
import planeoLogo from '../../assets/images/planeoLogoNegro.png';
import { CustomAlert } from '../../Utils/CustomAlert';

const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [document, setDocument] = useState(null);
    const [changing, setChanging] = useState(false);

    const recoverPasswordHandler = async () => {
        setChanging(true);
        const found = await firebase.firestore().collection('users')
            .where('document', '==', document).orderBy('email', 'desc').get().then((snapshot) => {
                if(snapshot.empty){
                    return false;
                }else{
                    let compatible = false;
                    snapshot.forEach(doc => {
                        if(doc.data().email == email)
                        compatible = true;
                    });
                    return compatible;
                }
            }).catch(error => {
                console.log(error);
                alert(error);
            });
        if(found){
            await firebase.auth().sendPasswordResetEmail(email).then(() => {
                CustomAlert("Correo enviado con éxito", "Por favor revisa tu bandeja de entrada, en algunos casos llega a la bandeja de SPAM (Correo no deseado)");
            }).catch(error => {
                console.log(error);
                alert(error);
            });
        }else{
            CustomAlert("Listo!", "Si ingresaste los datos correctos, se debió enviar un correo, revisa tu bandeja de entrada, de lo contrario verifica tu información.");
        }
        setChanging(false);
    } 

    return (
        <GeneralBase backgroundColor={'#F4F6FA'} loadBgImage={false} marginTop={0}>
            <PasswordContainer>
                <SupContainer>
                    <LogoImage source={planeoLogo} style={{resizeMode: 'contain'}} />
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <SubTitleText>Recuperación de contraseña</SubTitleText>

                            <FormInputText
                                labelValue={email}
                                onChangeText={value => setEmail(value)}
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
                            <FormInputText 
                                labelValue={document}
                                onChangeText={value => setDocument(value)}
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
                            
                            {changing ? (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <FormButtonFull
                                    buttonTitle="RECORDAR CLAVE"
                                    borderLine={1}
                                    style={styles.formButtonFull}
                                    onPress={() => recoverPasswordHandler()} />
                            )}
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>
            </PasswordContainer>
        </GeneralBase>
    );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    formButtonFull: {
        paddingVertical:10,
        marginTop: 20,
        marginBottom: 10,
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});