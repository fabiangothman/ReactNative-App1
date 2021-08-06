//Libraries
import React from 'react';
import {TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Styles
import { FieldContainer, IconContainer, InputContainer } from '../Styles/Components/formInputText';

const FormInputText = ({
    labelValue,
    placeholderText,
    antIconType,
    iconColor,
    marginUp,
    marginDown,
    ...props}) => {

    return (
        <FieldContainer style={{marginTop: marginUp, marginBottom: marginDown}}>
            <IconContainer>
                <AntDesign name={antIconType} size={24} color={iconColor} />
            </IconContainer>
            <InputContainer>
                <TextInput multiline={false}
                    style={{fontFamily: 'nunito'}}
                    value={labelValue}
                    placeholder={placeholderText}
                    placeholderTextColor="#C7C7C7"
                    numberOfLines={1}
                    {...props} />
            </InputContainer>
        </FieldContainer>
    );
};
export default FormInputText;