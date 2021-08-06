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
    
    export const NavigationContainer = styled.View`
        flex-direction: row;
        align-items: center;
        align-self: center;
        margin-top: 20px;
    `;
    export const NavigationArrow = styled.View`
        margin: 0px 10px;
        flex-direction: column;
    `;
        export const ArrowButton = styled.TouchableOpacity`
            width: 26px;
            height: 26px;
            border-radius: 13px;
            border-color: #8f92b6;
            border-width: 1px;
            justify-content: center;
            align-items: center;
        `;
    export const InfoBoxContainer = styled.View`
        flex-direction: column;
        background-color: white;
        align-self: center;
        padding: 10px 15px;
        border-radius: 10px;
        margin:10px 0px;
    `;
    export const InfoBoxContent = styled.View`
        width: 100%;
        flex-direction: row;
    `;
        export const InfoBoxCol = styled.View`
            flex-direction: column;
            justify-content: center;
        `;        
            export const TitleInfo = styled(TextBold)`
                font-size: 15px;
                color: #333333;
            `;
            export const ValueInfo = styled(TextBold)`
                font-size: 25px;
                color: #27DEBF;
            `;
            export const CircleEditButton = styled.View`
                background-color: #46D3E6;
                width: 50px;
                height: 50px;
                align-items: center;
                justify-content: center;
                border-radius: 25px;
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
    export const NormalText = styled(Text)`
        font-size: 15px;
        color: #707070;
        text-align: left;
    `;