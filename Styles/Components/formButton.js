import React from 'react';
import styled from 'styled-components/native';
import { Text, TextBold } from '../../Components/Text';

export const FormButtonContainerFull = styled.TouchableOpacity`
    border: ${props => props.borderLine ? props.borderLine : 0}px solid #343ba7;
    border-radius:5px;
    background-color: #f4f6fa;
    flex-direction: row;
    justify-content: center;
`;

export const FormButtonContainerAuto = styled.TouchableOpacity`
    border: ${props => props.borderLine ? props.borderLine : 0}px solid #343ba7;
    border-radius:5px;
    background-color: #f4f6fa;
    flex-direction: row;
    justify-content: center;
    align-self: center;
`;

    export const TextButton = styled(TextBold)`
        color: ${props => props.textColor ? props.textColor : '#343ba7'};
        font-size: ${props => props.textSize ? props.textSize : 18}px;
    `;