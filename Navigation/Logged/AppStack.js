//Libraries
import React, { createContext, useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase/app';
import 'firebase/firestore';
//Components
import { AppStackContext } from './AppStackContext';
import { AuthContext } from '../AuthProvider';
//Screens
import GeneralBase from '../../Components/GeneralBase';
import HeaderSideBar from '../../Components/HeaderSideBar';
import HeaderBreadcrumb from '../../Components/HeaderBreadcrumb';
import DashboardScreen from '../../Screens/App/DashboardScreen';
import DocumentsScreen from '../../Screens/App/DocumentsScreen';
import CertificatesScreen from '../../Screens/App/CertificatesScreen';
import SlideBarScreen from '../../Screens/App/SlideBar/SlideBarScreen';
import ProfileScreen from '../../Screens/App/Profile/ProfileScreen';
import CreateCertificateScreen from '../../Screens/App/CreateCertificateScreen';
import HeaderEquiz from '../../Components/HeaderEquiz';
import PayrollesScreen from '../../Screens/App/PayrollesScreen';
import MiNominaScreen from '../../Screens/App/Analisis/MiNominaScreen';
import HeaderCentered from '../../Components/HeaderCentered';
import RetiroStep1Screen from '../../Screens/App/Analisis/RetiroStep1Screen';
import RetiroStep2Screen from '../../Screens/App/Analisis/RetiroStep2Screen';
import PresupuestoStep1Screen from '../../Screens/App/Analisis/PresupuestoStep1Screen';
import PresupuestoStep2Screen from '../../Screens/App/Analisis/PresupuestoStep2Screen';
//Config
import { endPointsConfig } from '../../configGeneral';
import PresupuestoIngresosDetailScreen from '../../Screens/App/Analisis/PresupuestoIngresosDetailScreen';
import PresupuestoGastosDetailScreen from '../../Screens/App/Analisis/PresupuestoGastosDetailScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AppStack = () => {
    const [dbUserData, setDbUserData] = useState({
        planeoDB_data: {},
        WF_lastNomina: {}
    });

    const ContentStack = ({navigation}) => {
        const navigationDrawerDispatch = navigation.dispatch;
        const { appUser } = useContext(AuthContext);

        return (
            <AppStackContext.Provider value={{
                dbUserData,
                fetchDbUserData : async (fetchPlaneo, fetchWF) => {
                    try{
                        let planeoDB_data = {};
                        await firebase.firestore().collection('users').doc(appUser.displayName).get().then((result) => {
                            planeoDB_data = result.data();
                        }).catch((e) => {
                            console.log(e);
                            alert(e);
                            return false;
                        });

                        let WF_lastNomina = {};
                        await fetch(endPointsConfig.WF_nomina_endpoint, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                user_document_number: planeoDB_data.document,
                            })
                        }).then(response => response.json()).then((data) => {
                            WF_lastNomina = data.resp;
                        }).catch(error => alert(error));
                                   
                        setDbUserData({
                            planeoDB_data,
                            WF_lastNomina
                        });
                        return true;
                    }catch(e){
                        alert(e);
                        console.log(e);
                    }
                },
            }}>
                <Stack.Navigator styles={styles.baseStyle} initialRouteName={"Dashboard"} headerMode="screen">
                    <Stack.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{header: () => (<View style={styles.dashboardHeader}>
                            <HeaderSideBar onPress={() => {navigationDrawerDispatch(DrawerActions.toggleDrawer())}} />
                        </View>)}}
                    />

                    <Stack.Screen
                        name="Documents"
                        component={DocumentsScreen}
                        options={{
                            header: () => (
                                <View style={styles.dashboardHeader}>
                                    <HeaderBreadcrumb
                                        pageTitle={'Mis Documentos'}
                                        pageSubtitle={'Home / Mis documentos'}
                                        onPress={() => navigation.navigate("Dashboard")} />
                                </View>
                            )
                        }}
                    />

                    <Stack.Screen
                        name="Certificates"
                        component={CertificatesScreen}
                        options={{
                            header: () => (
                                <View style={styles.dashboardHeader}>
                                    <HeaderBreadcrumb
                                        pageTitle={'Mis Certificaciones'}
                                        pageSubtitle={'... / Mis documentos / Mis Certificaciones'}
                                        onPress={() => navigation.navigate("Documents")} />
                                </View>
                            )
                        }}
                    />
                        <Stack.Screen
                            name="CreateCertificate"
                            component={CreateCertificateScreen}
                            options={{header: () => (
                                <View style={[styles.dashboardHeader]}>
                                    <HeaderEquiz
                                        onPress={() => navigation.navigate("Certificates")} />
                                </View>
                            )}}
                        />

                    <Stack.Screen
                        name="Payrolles"
                        component={PayrollesScreen}
                        options={{
                            header: () => (
                                <View style={styles.dashboardHeader}>
                                    <HeaderBreadcrumb
                                        pageTitle={'Desprendibles de nómina'}
                                        pageSubtitle={'... / Mis documentos / Desprendibles de nómina'}
                                        onPress={() => navigation.navigate("Documents")} />
                                </View>
                            )
                        }}
                    />

                    <Stack.Screen
                        name="MiNomina"
                        component={MiNominaScreen}
                        options={{
                            header: () => null
                        }}
                    />
                        <Stack.Screen
                            name="RetiroStep1"
                            component={RetiroStep1Screen}
                            options={{
                                header: () => null
                            }}
                        />
                            <Stack.Screen
                                name="RetiroStep2"
                                component={RetiroStep2Screen}
                                options={{
                                    header: () => null
                                }}
                            />
                    <Stack.Screen
                        name="PresupuestoStep1"
                        component={PresupuestoStep1Screen}
                        options={{
                            header: () => null
                        }}
                    />
                        <Stack.Screen
                            name="PresupuestoStep2"
                            component={PresupuestoStep2Screen}
                            options={{
                                header: () => null
                            }}
                        />

                        <Stack.Screen
                            name="PresupuestoIngresosDetail"
                            component={PresupuestoIngresosDetailScreen}
                            options={{
                                header: () => null
                            }}
                        />
                        <Stack.Screen
                            name="PresupuestoGastosDetail"
                            component={PresupuestoGastosDetailScreen}
                            options={{
                                header: () => null
                            }}
                        />

                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            header: () => null
                        }}
                    />
                </Stack.Navigator>
            </AppStackContext.Provider>
        );
    };

    const SidebarStack = ({navigation}) => {
        const navigationDrawer = navigation;
        return (
            <Stack.Navigator styles={styles.baseStyle} initialRouteName={"Profile"} headerMode="screen">
                {/*<Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{header: () => ( <Button title="Go to Back"
                            onPress={() => navigationDrawer.goBack()} /> )}}
                />*/}
            </Stack.Navigator>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container} >
            <GeneralBase marginTop={'auto'} style={{overflow: 'hidden'}}>{/* Overflow for web horizontal scroll */}
                <Drawer.Navigator drawerPosition='right'
                    initialRouteName={"ContentStack"}
                    drawerContent={props => <SlideBarScreen {...props} planeoDB_data={dbUserData.planeoDB_data} />}
                    backBehavior='initialRoute'
                >
                    <Drawer.Screen
                        name="ContentStack"
                        backBehavior="none"
                        component={ContentStack} />

                    <Drawer.Screen
                        name="SidebarStack"
                        backBehavior="initialRoute"
                        component={SidebarStack}
                        options={ { gestureEnabled: false } } />
                </Drawer.Navigator>
            </GeneralBase>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    baseStyle: {},
    dashboardHeader: {
        marginTop:20,
        marginBottom: 10,
        marginHorizontal: 15,
    },
});