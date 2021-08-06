import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Screens
import SignupScreen from '../../Screens/Signup/SignupScreen';
import LoginScreen from '../../Screens/Login/LoginScreen';
import ValidationCodeScreen from '../../Screens/Signup/ValidationCodeScreen';
import CheckInfoScreen from '../../Screens/Signup/CheckInfoScreen';
import ValidationStep_PersonalDataScreen from '../../Screens/Signup/ValidationSteps/ValidationStep_PersonalDataScreen';
import ValidationStep_JobDataScreen from '../../Screens/Signup/ValidationSteps/ValidationStep_JobDataScreen';
import ValidationStep_AccountDataScreen from '../../Screens/Signup/ValidationSteps/ValidationStep_AccountDataScreen';
import ForgotPasswordScreen from '../../Screens/Login/ForgotPasswordScreen';
import TerminosCondicionesScreen from '../../Screens/TerminosCondicionesScreen';
import TratamientoDatosScreen from '../../Screens/TratamientoDatosScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    const iniRouteName = "Signup";

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container} >
            <Stack.Navigator styles={styles.baseStyle} initialRouteName={iniRouteName} headerMode="screen">
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{header: () => null}} />
                <Stack.Screen
                    name="ValidationCode"
                    component={ValidationCodeScreen}
                    options={{header: () => null}} />
                    <Stack.Screen
                        name="CheckInfo"
                        component={CheckInfoScreen}
                        options={({navigation}) => ({
                            title: "",
                            headerStyle: {
                                backgroundColor: "#F4F6FA",
                                shadowColor: "transparent",
                                elevation: 0
                            },
                            headerLeft: () => (
                                <View>
                                    <AntDesign.Button
                                    name="arrowleft"
                                    size={23}
                                    backgroundColor="transparent"
                                    color="#343ba7"
                                    onPress={() => navigation.navigate("ValidationCode")} />
                                </View>
                            )
                        })} />
                        <Stack.Screen
                            name="ValidationStep_PersonalData"
                            component={ValidationStep_PersonalDataScreen}
                            options={{header: () => null}} />
                        <Stack.Screen
                            name="ValidationStep_JobData"
                            component={ValidationStep_JobDataScreen}
                            options={{header: () => null}} />
                        <Stack.Screen
                            name="ValidationStep_AccountData"
                            component={ValidationStep_AccountDataScreen}
                            options={{header: () => null}} />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={({navigation}) => ({
                        title: "",
                        headerStyle: {
                            backgroundColor: "#F4F6FA",
                            shadowColor: "transparent",
                            elevation: 0
                        },
                        headerLeft: () => (
                            <View>
                                <AntDesign.Button
                                name="arrowleft"
                                size={23}
                                backgroundColor="transparent"
                                color="#343ba7"
                                onPress={() => navigation.navigate("Signup")} />
                            </View>
                        )
                    })}
                />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={({navigation}) => ({
                            title: "",
                            headerStyle: {
                                backgroundColor: "#F4F6FA",
                                shadowColor: "transparent",
                                elevation: 0
                            },
                            headerLeft: () => <AntDesign.Button
                                name="arrowleft"
                                size={23}
                                backgroundColor="transparent"
                                color="#343ba7"
                                onPress={() => navigation.navigate("Login")} />
                        })}
                    />
                <Stack.Screen
                    name="TerminosCondiciones"
                    component={TerminosCondicionesScreen}
                    options={{
                        header: () => null
                    }}
                />
                <Stack.Screen
                    name="TratamientoDatos"
                    component={TratamientoDatosScreen}
                    options={{
                        header: () => null
                    }}
                />
            </Stack.Navigator>
        </KeyboardAvoidingView>
    );
};
export default AuthStack;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    baseStyle: {},
});