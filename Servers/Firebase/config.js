//Libraries
import firebaseLb from "firebase/app";
import { Platform } from 'react-native';

let firebaseConfig = null;
if(Platform.OS == 'android')
    firebaseConfig = {
        apiKey: "AIzaSyDlVHlicJq8Q8_gRAx5wV0fzWY2AxBfmcI",
        projectId: "planeo-f0c87",
        appId: "1:1083432560840:android:181295eb3cbeb8616a5dfd",
        storageBucket: "planeo-f0c87.appspot.com",
        messagingSenderId: "1083432560840"
    };
else if(Platform.OS == 'ios')
    firebaseConfig = {
        apiKey: "AIzaSyDlVHlicJq8Q8_gRAx5wV0fzWY2AxBfmcI",
        projectId: "planeo-f0c87",
        appId: "1:1083432560840:ios:c327ac2f5cd8e2f36a5dfd",
        storageBucket: "planeo-f0c87.appspot.com",
        messagingSenderId: "1083432560840"
    };
else
    firebaseConfig = {
        apiKey: "AIzaSyDlVHlicJq8Q8_gRAx5wV0fzWY2AxBfmcI",
        authDomain: "planeo-f0c87.firebaseapp.com",
        projectId: "planeo-f0c87",
        appId: "1:1083432560840:web:86d257cb5fd513ac6a5dfd",
        storageBucket: "planeo-f0c87.appspot.com",
        messagingSenderId: "1083432560840"
    };

/*  Analytics:
    Not supported on NodeJS/ReactNative */
//firebaseLb.analytics();

firebaseLb.initializeApp(firebaseConfig);
/*export const firebase = firebaseLb;
export const auth = firebaseLb.auth();
export const db = firebaseLb.firestore();
export const storage = firebaseLb.storage();*/

//export default firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
//export default firebase;
//export const firebaseStorage = firebase.storage();
//export const Auth = firebaseApp.auth();
//export const Storage = firebaseApp.firestore();