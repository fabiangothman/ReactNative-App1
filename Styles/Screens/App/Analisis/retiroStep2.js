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
    export const ItemTitleText = styled(TextBold)`
        color:#343BA7;
        font-size: 18px;
        flex: 1;
    `;
    export const SubTitleText = styled(Text)`
        color: #707070;
        font-size: 16px;
        text-align: left;
    `;
    export const NormalText = styled(Text)`
        color: #ABB0B7;
        font-size: 14px;
        flex: 1;
    `;
    export const ResultText = styled(Text)`
        color: #ABB0B7;
        font-size: 15px;
    `;
export const BoxContainer = styled.View`
    padding-left: 10px;
    padding-bottom: 10px;
    border-color: transparent;
    border-left-color: #e4e6eb;
    border-left-width: 1px;
    border-bottom-color: #e4e6eb;
    border-bottom-width: 1px;
`;
export const RowContainer = styled.View`
    padding: 4px 0px;
    flex-direction: row;
    align-self: center;
    align-content: center;
    align-items: center;
    width: 100%;
`;

export const CardMessageContainer = styled.TouchableOpacity`
    padding: 20px;
    margin: 0px 5px;
    width: 300px;
    background-color: white;
    border-radius: 15px;
`;