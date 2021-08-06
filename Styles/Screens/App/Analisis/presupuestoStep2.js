//Libraries
import React from 'react';
import styled from 'styled-components/native';
import { Text, TextBold } from '../../../../Components/Text';

export const PresupuestoContainer = styled.View`
    background-color: transparent;
    flex:1;
    flex-direction: column;
    border: 0px solid transparent;
`;

export const SupContainer = styled.View`
    background-color: transparent;
    flex-direction: row;
    align-items: center;
`;

export const InfContainer = styled.View`
    flex: 1;
    flex-direction: row;
    width: 100%;
    background-color: #f4f6fa;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-top-color: #f4f6fa;
    padding: 30px 25px 0px 25px;
    overflow: hidden;
`;
export const TitleText = styled(TextBold)`
    font-size: 25px;
    color: black;
    margin-bottom: 20px;
`;
export const CardMessageContainer = styled.TouchableOpacity`
    padding: 20px;
    margin: 0px 5px;
    width: 300px;
    background-color: white;
    border-radius: 15px;
`;