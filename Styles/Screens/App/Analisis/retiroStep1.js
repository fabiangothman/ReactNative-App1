//Libraries
import React from 'react';
import styled from 'styled-components/native';
import { Text, TextBold } from '../../../../Components/Text';

export const RetiroContainer = styled.View`
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
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-top-color: #f4f6fa;
    padding: 30px 25px 0px 25px;
    overflow: hidden;
`;
    export const TitleText = styled(TextBold)`
        color: #333333;
        font-size: 20px;
        margin-bottom: 15px;
    `;
    export const RetiroText = styled(TextBold)`
        color: #333333;
        font-size: 16px;
        margin-bottom: 5px;
    `;
    export const SubTitleText = styled(Text)`
        color: #707070;
        font-size: 16px;
        text-align: left;
    `;