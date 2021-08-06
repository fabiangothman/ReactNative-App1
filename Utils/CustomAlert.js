import { Platform, Alert } from 'react-native';

export const CustomAlert = (title, body) => {
    if(Platform.OS === 'web'){
        alert(title+"\n\n"+body);
    }else{
        Alert.alert(title, body);
    }
}