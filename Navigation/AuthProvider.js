//Libraries
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
//import { firebase, auth, db, storage } from '../Servers/Firebase/config';   //Aquí se esta inicializando la App automaticamente
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
//Components
import { setLocalData, getLocalData, removeLocalData } from '../Servers/Localstorage/localStorage';
import { CustomAlert } from '../Utils/CustomAlert';

export const AuthContext = createContext();



export const AuthProvider = ({children}) => {
    firebase.auth().setPersistence(
        firebase.auth.Auth.Persistence.LOCAL
    );
    //console.log("AuthProvider: Cuando es llamado o cuando sus States propios (appUser, initializing) cambian.");
    const [appUser, setAppUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const validateSessionStatus = async () => {
        try{
            const credentials = await getLocalData("planeo_usrCrdtls");
            if(credentials){
                //console.log("Iniciando sesión restaurada...");
                await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(({ user }) => {
                    setAppUser(user);
                }).catch((error) => {
                    //alert(error); //POner aqui una alerta cuando algún dato de sesión cambió
                    removeLocalData("planeo_usrCrdtls");
                });
            }
        }catch(e){
            removeLocalData("planeo_usrCrdtls");
            alert(e);
        }
        setInitializing(false);
    }
    useEffect(() => {
        //console.log("AuthProvider: Montando async, dependiendo de si tiene o no el parámetro '[]' al final.");
        validateSessionStatus();
    }, []);
    if(initializing)
        return null;

    return (
        <AuthContext.Provider value={{
            appUser,
            setAppUser,
            login: async (email, password, rememberMe) => {
                await firebase.auth().signInWithEmailAndPassword(email, password).then(async ({ user }) => {
                    if(user.emailVerified){
                        if(rememberMe)
                            await setLocalData("planeo_usrCrdtls", {email: email, password: password});
                        else
                            await removeLocalData("planeo_usrCrdtls");
                        setAppUser(user);
                    }else{
                        /*
                        //Genera un error por intentos de envio de correos bloquea la cuenta
                        await firebase.auth().currentUser.sendEmailVerification().then(async () => {
                            await firebase.auth().signOut();
                        });
                        */
                        firebase.auth().signOut()
                        CustomAlert(
                            'Email aún no confirmado',
                            'Aún no has confirmado el correo electrónico. Te enviamos un correo de confirmación cuando te registraste, no olvides revisar en tu bandeja de spam o correo no deseado.');
                    }
                }).catch((error) => {
                    console.log(error.code);
                    console.log(error);
                    switch(error.code) {
                        case 'auth/argument-error':
                            CustomAlert('Verifica tu información', 'El correo/contraseña debe ser un texto válido.');
                            break;
                        case 'auth/invalid-email':
                            CustomAlert('Verifica tu correo', 'La estructura del correo tiene un formato incorrecto, verifica la información e intenta nuevamente.');
                            break;
                        case 'auth/wrong-password':
                            CustomAlert('Verifica tu información', 'La combinación de email/password es incorrecta, por favor verifica tu información.');
                            break;
                        case 'auth/too-many-requests':
                            CustomAlert('Demasiados intentos', 'Se ha deshabilitado tu cuenta unos minutos por seguridad, por favor intenta más tarde.');
                            break;
                        case 'auth/user-not-found':
                            CustomAlert('Verifica tu información', 'El usuario no existe, verifica la información e intenta nuevamente.');
                            break;
                        default:
                            CustomAlert('Error', 'Ha pasado algo inesperado, por favor intenta nuevamente. '+error);
                            break;
                    }
                });
                    
            },
            logout: async () => {
                try{
                    await firebase.auth().signOut();
                    removeLocalData("planeo_usrCrdtls");
                    setAppUser(null);
                }catch(e){
                    console.log(e);
                }
            },
            register: async (userData, password, companyData) => {
                try{
                    await firebase.auth().createUserWithEmailAndPassword(userData.email, password);
                    const currUser = await firebase.auth().currentUser;
                    await currUser.updateProfile({displayName: userData.document});
                    const user_uid = currUser.uid;

                    await firebase.firestore().collection('users').doc(userData.document).set({
                        address: userData.address,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        document: userData.document,
                        documentType: userData.documentType,
                        email: userData.email,
                        fileCertsAvailable: 0,
                        fileCertsRead: 0,
                        fileDocumentsAvailable: 0,
                        fileDocumentsRead: 0,
                        filePayrollesAvailable: 0,
                        filePayrollesRead: 0,
                        gastos: {
                            vivienda: 0,
                            alimentacion: 0,
                            transporte: 0,
                            salud: 0,
                            deudas: 0,
                            recreacion: 0,
                            educacion: 0,
                            otros: 0,
                        },
                        lastnames: userData.lastnames,
                        names: userData.names,
                        otrosIngresos: 0,
                        phone: userData.phone,
                        uid: user_uid,
                        userCreationCode: userData.userCreationCode,
                        userImg: null,
                        companyNit: companyData.nit,
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });

                    await firebase.firestore().collection('companies').doc(companyData.nit).set({
                        name: companyData.name,
                        nit: companyData.nit,
                        verificationDigit: companyData.verificationDigit,
                        lastCodeUserCreated: userData.userCreationCode,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }).catch(e => {
                        console.log(e);
                        alert(e);
                    });

                    await firebase.auth().currentUser.sendEmailVerification();
                    await firebase.auth().signOut();
                    CustomAlert(
                        'Usuario creado con éxito',
                        'Antes de continuar, recuerda verificar este correo electrónico. Revisa tu bandeja de entrada o de correo no deseado (spam).');
                    return true;
                }catch(e){
                    console.log(e);
                    alert(e);
                    return false;
                }
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
}

//For login with custom token [leer al final]
//https://github.com/kreait/firebase-tokens-php/issues/12