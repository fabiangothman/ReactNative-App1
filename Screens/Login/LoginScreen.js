//Libraries
import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
//Components
import { FormButtonFull, FormButtonAuto } from '../../Components/FormButton';
import FormInputText from '../../Components/FormInputText';
import FormInputSelect from '../../Components/FormInputSelect';
import GeneralBase from '../../Components/GeneralBase';
import CustomSwitch from '../../Components/CustomSwitch';
//Navigation
import { AuthContext } from '../../Navigation/AuthProvider';
//Styles
import { LoginContainer, SupContainer, LogoImage, InfContainer, SubTitleText, TitleText, LinkText } from '../../Styles/Screens/Login/login';
//Images
import planeoLogo from '../../assets/images/planeoLogoNegro.png';
import { Text, TextBold } from '../../Components/Text';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberMe, setRememberMe] = useState(true);
    const [signing, setSigning] = useState(false);

    const { login } = useContext(AuthContext);
    const documents = [
        {label: 'Cédula de ciudadanía', value: 'cedula'},
        {label: 'Tarjeta de identidad', value: 'tarjeta'},
        {label: 'Pasaporte', value: 'pasaporte'},
    ];

    const loginHandler = async () => {
        setSigning(true);
        if(!await login(email, password, rememberMe))
            setSigning(false);
    }

    //Validar que si ya esta registrado no deje pasar
    //https://medium.com/@webcore1/react-native-login-remember-me-checkbox-solution-a16efdfdf056

    return (
        <GeneralBase backgroundColor={'#F4F6FA'} loadBgImage={false} marginTop={0}>
            <LoginContainer>
                <SupContainer>
                    <LogoImage source={planeoLogo} style={{resizeMode: 'contain'}} />
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText style={styles.titleText}>Bienvenid@</TitleText>
                            <SubTitleText style={styles.subTitleText}>Inicia sesión para continuar</SubTitleText>

                            <Text>Por seguridad, tienes hasta 3 intentos para iniciar de sesión, de lo contrario bloquearemos tu usuario por un par de minutos.</Text>

                            <FormInputText
                                labelValue={email}
                                onChangeText={(userEmail) => setEmail(userEmail)}
                                placeholderText="Correo electrónico"
                                antIconType="mail"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={20}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false} />
                            <FormInputText 
                                labelValue={password}
                                onChangeText={(userPassword) => setPassword(userPassword)}
                                placeholderText="Contraseña"
                                antIconType="lock"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={5}
                                secureTextEntry={true} />
                                
                            <View style={styles.remeberContainer}>
                                <View style={styles.switchContainer}>
                                    <CustomSwitch
                                        text="Recuérdame"
                                        color="blue"
                                        ios_backgroundColor="grey"
                                        thumbColor='white'
                                        trackColor={{true:'#343ba7', false:'grey' }}
                                        value={rememberMe}
                                        onValueChange={(value) => {setRememberMe(value);/*toggleRememberMe(value);*/}}
                                        disabled={false} />
                                </View>
                                <View style={styles.passwordForgotContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                        <LinkText style={styles.passwordForgotText}>Olvide mi contraseña</LinkText>
                                    </TouchableOpacity>
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
                                    onPress={() => loginHandler(email, password, rememberMe)} />
                            )}                            

                            <SubTitleText style={[styles.subText]}>¿Aún no tienes una cuenta?</SubTitleText>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <LinkText style={styles.linkText}>Registrate</LinkText>
                            </TouchableOpacity>
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>
            </LoginContainer>
        </GeneralBase>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    titleText: {
        marginTop:15,
        textAlign: 'center',
        color: '#707070',
        fontSize: 39,
    },
    subTitleText: {
        marginTop:5,
        marginBottom: 35,
        textAlign: 'center',
        color: '#ABB0B7',
        fontSize: 20,
    },
    formButtonFull: {
        paddingVertical:10,
        marginBottom: 25,
    },
    subText: {
        marginVertical:2,
        textAlign: 'center',
    },
    linkText: {
        marginVertical: 0,
        textAlign:'center'
    },
    remeberContainer:{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 20,
    },
    switchContainer:{
        flex: 5,
        flexDirection: 'column',
    },
    passwordForgotContainer:{
        flex: 5,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    passwordForgotText:{
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'normal',
        alignSelf: 'center',
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});