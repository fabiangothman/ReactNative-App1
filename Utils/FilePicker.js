import { Platform } from 'react-native';
import UploadToAnonymousFiles from "anonymous-files";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export const takePhotoFromCamera = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if(status !== 'granted'){
            alert('Lo siento, es necesario que aceptes los permisos de acceso a la camara, por favor activalos en la configuración de tu dispositivo.');
            return null;
        }
    }

    const pickerResult = await ImagePicker.launchCameraAsync();
    if(pickerResult.cancelled === true)
        return null;

    if(Platform.OS === 'web'){
        const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
        return remoteUri;
    }else{
        return pickerResult.uri;
    }
};

export const openImagePickerAsync = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
            alert('Lo siento, es necesario que aceptes los permisos de acceso a los archivos, por favor activalos en la configuración de tu dispositivo.');
            return null;
        }
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.cancelled === true)
        return null;

    if(Platform.OS === 'web'){
        const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
        return remoteUri;
    }else{
        return pickerResult.uri;
    }
};

export const openDocumentPickerAsync = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
            alert('Lo siento, es necesario que aceptes los permisos de acceso a los archivos, por favor activalos en la configuración de tu dispositivo.');
            return null;
        }
    }

    return await DocumentPicker.getDocumentAsync({type: '*/*'});
};

const allowedExtensions = ["pdf", "doc", "docx", "png", "jpg", "jpeg", "gif", "csv", "ppt", "xls", "xlsx", "odf", "ods", "ots", "xml"];
export const extensionIsAllowed = (extension) => {
    return allowedExtensions.includes(extension);
}