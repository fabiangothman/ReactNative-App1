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
    export const TitleHeader = styled(TextBold)`
        font-size: 20px;
        color: white;
    `;
    export const TextHeader = styled(Text)`
        font-size: 15px;
        color: white;
    `;
        export const TextRed = styled(Text)`
            color: #EC6666;
        `;
    
    export const NavigationContainer = styled.View`
        flex-direction: row;
        align-items: center;
        align-self: center;
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
                color: #EC6666;
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
    export const BoxContainer = styled.View`
        padding-left: 10px;
        padding-bottom: 10px;
        border-color: #e4e6eb;
        border-left-color: #e4e6eb;
        border-left-width: 1px;
        border-bottom-color: #e4e6eb;
        border-bottom-width: 1px;
    `;
        export const DetailCont = styled.View`
            width: 100%;
            flex-direction: row;
        `;
        export const DetailCol = styled.View`
            flex-direction: column;
            justify-content: center;
        `;
            export const ItemTitleText = styled(TextBold)`
                font-size: 18px;
                color: #343BA7;
                text-align: left;
            `;
            export const ItemValueText = styled(TextBold)`
                font-size: 15px;
                color: #565656;
                text-align: right;
            `;