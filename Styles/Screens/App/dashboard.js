//Libraries
import React from 'react';
import styled from 'styled-components/native';
import { Text, TextBold } from './../../../Components/Text';

export const DashboardContainer = styled.View`
    background-color: transparent;
    flex:1;
    flex-direction: column;
    border: 0px solid transparent;
    margin: 0px 20px 10px 20px;
`;

export const CardsLineCont = styled.View`
    flex-direction: row;
    align-self: center;
`;
    export const Card = styled.TouchableOpacity`
        flex-direction: column;
        align-self: center;
        margin: 5px;
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