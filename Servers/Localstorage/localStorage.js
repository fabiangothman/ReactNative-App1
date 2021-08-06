//Libraries
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setLocalData = async (variable, value) => {
    try{
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(variable, jsonValue)
    }catch(e){
        alert(e);
    }
};

export const getLocalData = async (variable) => {
    try{
        const jsonValue = await AsyncStorage.getItem(variable)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch(e){
        alert(e);
    }
};

export const removeLocalData = async (variable) => {
    try{
        return AsyncStorage.removeItem(variable);
    }catch(e){
        alert(e);
    }
};