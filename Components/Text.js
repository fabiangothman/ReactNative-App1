import React from "react";
import {
  Text as RNText
} from "react-native";

export const Text = (props) => <RNText style={[props.style, {fontFamily: 'nunito'}]}>{props.children}</RNText>
export const TextBold = (props) => <RNText style={[props.style, {fontFamily: 'nunito-bold'}]}>{props.children}</RNText>
