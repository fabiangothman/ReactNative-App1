//Libraries
import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Styles
import { FieldContainer, IconContainer, InputContainer } from '../Styles/Components/formInputWhite';
import { Text, TextBold } from './Text';

const FormInputWhite = ({
    editable,
    labelValue,
    onChangeText,
    keyboardType,
    placeholderText,
    antIconType,
    iconColor,
    ...props}) => {

    return (
        <TouchableOpacity {...props} disabled={(editable) ? true : false}>
            <FieldContainer>
                <IconContainer>
                    <AntDesign name={antIconType} size={25} color={iconColor} />
                </IconContainer>
                <InputContainer>
                    <Text style={{color: "#777777"}}>{placeholderText}</Text>
                    {editable ? (
                        <TextInput multiline={false}
                            style={[styles.textField, {height: 25, fontFamily: 'nunito'}]}
                            value={labelValue.toString()}
                            onChangeText={onChangeText}
                            placeholder={"15"}
                            keyboardType={keyboardType}
                            placeholderTextColor="#C7C7C7"
                            numberOfLines={1} />
                    ) : (
                        <Text style={[styles.textField, {}]}>{labelValue}</Text>
                    )}
                </InputContainer>
            </FieldContainer>
        </TouchableOpacity>
    );
};
export default FormInputWhite;

const styles = StyleSheet.create({
    textField: {
        paddingVertical: 3,
    },
});