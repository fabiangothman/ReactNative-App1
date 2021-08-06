import { Dimensions } from 'react-native';
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateDocument = (document) => {
    const onlyNumbers = /^\d+$/.test(document);
    if(onlyNumbers)
        if(document.length >= 6)
            return true;
        else
            return false;
    else
        return false;
}

export const objectContainsValue = (object, value) => {
    let contains = false;
    object.forEach(obj => {
        if (Object.values(obj).indexOf(value) > -1)
            contains = true;
    });
    return contains;
}