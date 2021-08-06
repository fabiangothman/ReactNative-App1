//Libraries
import React from 'react';
import styled from 'styled-components/native';

export const DocumentsContainer = styled.View`
    background-color: transparent;
    flex:1;
    flex-direction: column;
    border: 0px solid transparent;
`;
    
export const ContentContainer = styled.View`
    padding: 5px 20px 10px 20px;
    flex-direction: row;
    flex: 1;
`;

    export const Card = styled.TouchableOpacity`
        flex-direction: column;
        align-self: center;
        margin: 5px;
    `;

export const FooterContainer = styled.View`
    flex-direction: row;
`;