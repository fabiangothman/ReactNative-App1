//Libraries
import React from 'react';
import styled from 'styled-components/native';

export const FieldContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    border-color: #ccc;
    border-radius: 3px;
    border-width: 1px;
    align-items: center;
    background-color: #fff;
`;

export const IconContainer = styled.View`
    width: 50px;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

export const PickerContainer = styled.View`
    flex: 9;
    flex-direction: column;
`;