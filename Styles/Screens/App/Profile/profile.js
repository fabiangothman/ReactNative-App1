//Libraries
import React from 'react';
import styled from 'styled-components/native';
import { Text, TextBold } from '../../../../Components/Text';

export const ProfileContainer = styled.View`
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
    export const LogoImage = styled.Image`
        height: 60px;
        width:100%;
        margin-bottom: 25px;
    `;

export const InfContainer = styled.View`
    flex: 1;
    flex-direction: row;
    width: 100%;
    background-color: #f4f6fa;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-top-color: #f4f6fa;
    padding: 0px 25px;
    overflow: hidden;
`;
    export const TitleText = styled(TextBold)`
        color:#343BA7;
        font-size: 25px;
        text-align: center;
    `;
    export const SubTitleText = styled(Text)`
        color: black;
        font-size: 16px;
        text-align: center;
        margin: 10px 0px;
    `;
    export const HighText = styled(TextBold)`
        color:#333333;
        font-size: 20px;
        text-align: left;
        margin-bottom: 10px;
    `;
    export const NormalText = styled(Text)`
        color:#707070;
        font-size: 15px;
        text-align: left;
    `;