import React from 'react';
import styled from 'styled-components/native';

export const GeneralAppContainer = styled.View`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#343BA7'};
    border: 0px solid transparent;
    flex: 1;
    flex-direction: column;
    margin-top: ${props => props.marginTop ? props.marginTop : 0}px;
`;

export const BgContainer = styled.View`
    flex: 1;
    justify-content: center;
`;

export const ImgBgContainer = styled.ImageBackground`
    flex: 1;
    justify-content: center;
`;