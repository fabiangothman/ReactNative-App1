//Libraries
import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Styles
import { FieldContainer, IconContainer, PickerContainer } from '../Styles/Components/formInputSelect';

const FormInputSelect = ({
    placeholderText,
    antIconType,
    iconColor,
    fontSize,
    fontWeight,
    color,
    marginUp,
    marginDown,
    ...props}) => {
    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 0,
            color: color,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontFamily: 'nunito',
            paddingRight: 30, // to ensure the text is never behind the icon
            height: '100%',
            width: '100%',
          },
        inputAndroid: {
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 0,
            color: color,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontFamily: 'nunito',
            paddingRight: 30, // to ensure the text is never behind the icon
            height: '100%',
            width: '100%',
        },
    });

    return (
        <FieldContainer style={{marginTop: marginUp, marginBottom: marginDown}}>
            <IconContainer>
                <AntDesign name={antIconType} size={25} color={iconColor} />
            </IconContainer>
            <PickerContainer>
                <PickerSelect
                    placeholder={{ label: placeholderText, value: null, color: 'gray'}}
                    style={{
                        ...pickerSelectStyles,
                        fontSize: 50,
                        iconContainer: {
                            top: 16,
                            right: 12,
                        },
                    }}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColorAndroid: 'transparent' }}
                    Icon={() => {
                        return (Platform.OS === 'web') ? null : (<AntDesign name={"caretdown"} size={15} color={"#777777"} style={{justifyContent: 'center', alignContent:'center', textAlign:'center', alignSelf:'center'}} />);
                    }}
                    {...props} />
            </PickerContainer>
        </FieldContainer>
    );
};
export default FormInputSelect;