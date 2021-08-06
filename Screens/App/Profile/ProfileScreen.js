//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
import HeaderCentered from '../../../Components/HeaderCentered';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
import { AppStackContext } from '../../../Navigation/Logged/AppStackContext';
//Styles
import { ProfileContainer,
    SupContainer,
    LogoImage,
    InfContainer,
    SubTitleText,
    TitleText,
    HighText,
    NormalText } from '../../../Styles/Screens/App/Profile/profile';
//Images
import planeoLogo from '../../../assets/images/planeoLogoBlanco.png';
import UserImage from '../../../assets/images/user-icon.png';
import FormInputText from '../../../Components/FormInputText';
import { CustomAlert } from '../../../Utils/CustomAlert';

const ProfileScreen = ({ navigation }) => {
    const { dbUserData } = useContext(AppStackContext);
    const { appUser } = useContext(AuthContext);
    
    const WF_address = (dbUserData.planeoDB_data) ? dbUserData.planeoDB_data.address : "";
    const WF_phone = (dbUserData.planeoDB_data) ? dbUserData.planeoDB_data.phone : "";
    const WF_names = (dbUserData.planeoDB_data) ? dbUserData.planeoDB_data.names : "";

    const [email, setEmail] = useState(appUser.email);
    const [phone, setPhone] = useState(WF_phone);
    const [address, setAddress] = useState(WF_address);
    const [saving, setSaving] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [changing, setChanging] = useState(false);

    const saveHandler = async () => {
        setSaving(true);
        await firebase.firestore().collection('users').doc(appUser.displayName).update({
            address: address,
            phone: phone,
        }).then(() => {
            CustomAlert("Se ha actualizado la información con éxito", "Se han actualizado tus datos de la aplicación.");
        }).catch(e => {
            console.log(e);
            alert(e);
        });
        setSaving(false);
    }

    const changeHandler = async () => {
        setChanging(true);
        if(password===passwordConfirm && password.length >= 8 ){
            await firebase.auth().currentUser.updatePassword(password).then(() => {
                CustomAlert("Se ha actualizado la contraseña con éxito", "Recuerda no compartirla con nadie por seguridad, deberás iniciar sesión nuevamente la próxima vez que uses Planeo.");
                setPassword("");
                setPasswordConfirm("");
            }).catch(error => {
                console.log(error);
                alert(error);
            });
        }else{
            CustomAlert("Revisa tus contraseñas", "La contraseña y la confirmación de contraseña son diferentes o no tienen más de 8 caractéres. Revisa e intenta nuevamente.");
        }
        setChanging(false);
    }

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={0}>
            <ProfileContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title=""
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate("Dashboard")} />
                        <LogoImage source={planeoLogo} style={{resizeMode: 'contain'}} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <Image source={UserImage} style={styles.iconImage} />

                            <TitleText>¡Hola {WF_names}!</TitleText>
                            <SubTitleText style={{marginBottom: 30}}>Configura tu cuenta, actualiza tus datos y modifica tu clave.</SubTitleText>

                            <FormInputText
                                labelValue={email}
                                onChangeText={(value) => setEmail(value)}
                                placeholderText="Correo electrónico"
                                antIconType="mail"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='grey'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={5}
                                editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false} />

                            <FormInputText
                                labelValue={phone}
                                onChangeText={(value) => setPhone(value)}
                                placeholderText="Teléfono de contacto"
                                antIconType="phone"
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
                                labelValue={address}
                                onChangeText={(value) => setAddress(value)}
                                placeholderText="Dirección de residencia"
                                antIconType="home"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={25}
                                autoCorrect={false} />

                            {saving ? (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <FormButtonFull
                                    buttonTitle="GUARDAR CAMBIOS"
                                    borderLine={1}
                                    style={styles.formButtonFull}
                                    onPress={() => saveHandler()} />
                            )}

                            <HighText>Cambiar contraseña</HighText>
                            <NormalText style={{marginBottom: 20}}>Deberás iniciar sesión nuevamente la próxima vez que ingreses a Planeo.</NormalText>

                            <FormInputText 
                                labelValue={password}
                                onChangeText={value => setPassword(value)}
                                placeholderText="Nueva contraseña"
                                antIconType="lock"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={5}
                                secureTextEntry={true} />
                            <FormInputText 
                                labelValue={passwordConfirm}
                                onChangeText={value => setPasswordConfirm(value)}
                                placeholderText="Confirme la nueva contraseña"
                                antIconType="lock"
                                iconColor="#379AF4"
                                fontSize={16}
                                color='black'
                                fontWeight='normal'
                                marginUp={5}
                                marginDown={20}
                                secureTextEntry={true} />

                            {changing ? (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <FormButtonFull
                                    buttonTitle="CAMBIAR CLAVE"
                                    borderLine={1}
                                    textColor="white"
                                    style={[styles.formButtonFull, {backgroundColor: '#343BA7'}]}
                                    onPress={() => changeHandler()} />
                            )}                            

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </ProfileContainer>
        </GeneralBase>
    );
};
export default ProfileScreen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
        marginTop: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    iconImage:{
        width: '100%',
        height: 200,
        alignSelf: 'center',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    formButtonFull: {
        paddingVertical:10,
        marginBottom: 25,
        backgroundColor: 'transparent',
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});