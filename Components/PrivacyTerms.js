//Libraries
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextBold } from './Text';
import { useNavigation } from "@react-navigation/native";

const PrivacyTerms = ({screenBack, routeParams, ...props}) => {
    screenBack = (screenBack) ? screenBack : "Signup";
    const navigation = useNavigation();

    return(
        <View {...props}>
            <View style={styles.privateTextContainer}>
                <Text style={styles.privateText}>Acepto </Text>
                <TouchableOpacity onPress={() => navigation.navigate('TerminosCondiciones', {screenBack:screenBack, routeParams:routeParams})}>
                    <Text style={styles.privateTextLink}>términos y condiciones</Text>
                </TouchableOpacity>
                <Text style={styles.privateText}> y autorizo el </Text>
                <TouchableOpacity onPress={() => navigation.navigate('TratamientoDatos', {screenBack:screenBack, routeParams:routeParams})}>
                    <Text style={styles.privateTextLink}>tratamiento de datos personales</Text>
                </TouchableOpacity>
                <Text style={styles.privateText}>.</Text>
            </View>
        </View>
    );    
}
export default PrivacyTerms;

const styles = StyleSheet.create({
    privateTextContainer:{
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    privateText: {
        fontSize: 13,
        fontWeight: "400",
        color: "grey",
    },
    privateTextLink: {
        fontSize: 13,
        fontWeight: "400",
        color: "#379AF4",
        textDecorationLine: 'underline',
    },
});