import React from 'react';
import { FormButtonContainerFull, FormButtonContainerAuto, TextButton } from '../Styles/Components/formButton';

export const FormButtonFull = ({buttonTitle, textSize, textColor, borderLine, ...props}) => {
    return (
        <FormButtonContainerFull borderLine={borderLine} {...props}>
            <TextButton textSize={textSize} textColor={textColor}>{buttonTitle}</TextButton>
        </FormButtonContainerFull>
    );
};

export const FormButtonAuto = ({buttonTitle, textSize, textColor, borderLine, ...props}) => {
    return (
        <FormButtonContainerAuto borderLine={borderLine} {...props}>
            <TextButton textSize={textSize} textColor={textColor}>{buttonTitle}</TextButton>
        </FormButtonContainerAuto>
    );
};