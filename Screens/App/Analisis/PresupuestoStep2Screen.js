//Libraries
import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert, View } from 'react-native';
import CardMessage from '../../../Components/CardMessage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase/app';
import 'firebase/firestore';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
import HeaderCentered from '../../../Components/HeaderCentered';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
import { AppStackContext } from '../../../Navigation/Logged/AppStackContext';
//Styles
import { PresupuestoContainer,
    SupContainer,
    InfContainer,
    CardMessageContainer,
    TitleText } from '../../../Styles/Screens/App/Analisis/presupuestoStep2';
import CardMessageBarra from '../../../Components/CardMessageBarra';
import { convertNumberToString } from '../../../Utils/Numbers';
//Utils
import { getSubsidioTransporte, getFondoSolidaridad } from "../../../Utils/Nomina";
import { Text, TextBold } from '../../../Components/Text';

const PresupuestoStep2Screen = ({ route, navigation }) => {
    const { dbUserData } = useContext(AppStackContext);
    const { appUser } = useContext(AuthContext);

    const [planeoDB_data, setPlaneoDB_data] = useState({
        gastos:{
            alimentacion: (route.params.gastos.alimentacion) ? parseInt(route.params.gastos.alimentacion) : 0,
            deudas: (route.params.gastos.deudas) ? parseInt(route.params.gastos.deudas) : 0,
            educacion: (route.params.gastos.educacion) ? parseInt(route.params.gastos.educacion) : 0,
            otros: (route.params.gastos.otros) ? parseInt(route.params.gastos.otros) : 0,
            recreacion: (route.params.gastos.recreacion) ? parseInt(route.params.gastos.recreacion) : 0,
            salud: (route.params.gastos.salud) ? parseInt(route.params.gastos.salud) : 0,
            transporte: (route.params.gastos.transporte) ? parseInt(route.params.gastos.transporte) : 0,
            vivienda: (route.params.gastos.vivienda) ? parseInt(route.params.gastos.vivienda) : 0,
        },
        otrosIngresos: (route.params.otrosIngresos) ? parseInt(route.params.otrosIngresos) : 0,
    });
    
    const dbWF_basicSalary = dbUserData.WF_lastNomina.userData.salary;
    const dbWF_transportSupport = getSubsidioTransporte(dbUserData.WF_lastNomina.userData.salary);
    const dbWF_bonifications = dbUserData.WF_lastNomina.userData.bons_no_ss;
    const dbWF_bonificationsContributions = dbUserData.WF_lastNomina.userData.bons_with_ss;
    let calculated_totalSalary = dbWF_basicSalary+dbWF_transportSupport+dbWF_bonifications+dbWF_bonificationsContributions

    const calculated_pension = Math.round(calculated_totalSalary*0.04);
    const calculated_health = Math.round(calculated_totalSalary*0.04);
    const dbWF_libranza = 0;
    const dbWF_othesSave = 0;
    const dbWF_retefuente = (dbUserData.WF_lastNomina.userData) ? parseInt(dbUserData.WF_lastNomina.userData.nomina_retefuente) : 0;
    const calculated_fondosolidaridad = getFondoSolidaridad(dbWF_basicSalary);
    const calculated_totalDeductions = calculated_pension+calculated_health+dbWF_libranza+dbWF_othesSave+dbWF_retefuente+calculated_fondosolidaridad;

    calculated_totalSalary = calculated_totalSalary - calculated_totalDeductions;
    
    const calculated_totalGastos = 
        planeoDB_data.gastos.alimentacion + 
        planeoDB_data.gastos.deudas + 
        planeoDB_data.gastos.educacion + 
        planeoDB_data.gastos.otros + 
        planeoDB_data.gastos.recreacion + 
        planeoDB_data.gastos.salud + 
        planeoDB_data.gastos.transporte + 
        planeoDB_data.gastos.vivienda;

    const calculatedPercentGastos = ((100*calculated_totalGastos)/(calculated_totalSalary+planeoDB_data.otrosIngresos)).toFixed(2)+"%";

    const fetchData = async () => {
        await firebase.firestore().collection('users').doc(appUser.displayName).get().then((result) => {
            setPlaneoDB_data({
                gastos:{
                    alimentacion: parseInt(result.data().gastos.alimentacion),
                    deudas: parseInt(result.data().gastos.deudas),
                    educacion: parseInt(result.data().gastos.educacion),
                    otros: parseInt(result.data().gastos.otros),
                    recreacion: parseInt(result.data().gastos.recreacion),
                    salud: parseInt(result.data().gastos.salud),
                    transporte: parseInt(result.data().gastos.transporte),
                    vivienda: parseInt(result.data().gastos.vivienda),
                },
                otrosIngresos: parseInt(result.data().otrosIngresos),
            });
        }).catch((e) => {
            console.log(e);
            alert(e);
        });
    }

    useEffect(() => {
        navigation.addListener("focus", () => fetchData());
    }, [navigation]);

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={0}>
            <PresupuestoContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Mi presupuesto"
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate("PresupuestoStep1")} />
                        
                        <View style={styles.headerTotalBox}>
                            <View style={styles.headerTotalLeftCont}>
                                <Text style={styles.headerTotalTitle}>Total ingresos</Text>
                                <TextBold style={[styles.headerTotalValue, {color: "#27DEBF",}]}>${convertNumberToString(calculated_totalSalary + planeoDB_data.otrosIngresos)}</TextBold>
                            </View>
                            <View style={styles.headerTotalCenterCont}>
                                <AntDesign name={"minus"} size={21} color={"white"} />
                            </View>
                            <View style={styles.headerTotalRightCont}>
                                <Text style={styles.headerTotalTitle}>Total gastos</Text>
                                <TextBold style={[styles.headerTotalValue, {color: "#EC6666",}]}>${convertNumberToString(calculated_totalGastos)}</TextBold>
                            </View>
                        </View>
                        <View style={styles.headerSaldoBox}>
                            <TextBold style={styles.headerSaldoTitle}>SALDO DEL MES</TextBold>
                            <TextBold style={styles.headerSaldoValue}>${convertNumberToString(calculated_totalSalary+planeoDB_data.otrosIngresos-calculated_totalGastos)}</TextBold>
                        </View>
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText>Balance mensual</TitleText>

                            <CardMessageBarra onPress={() => navigation.navigate("PresupuestoIngresosDetail", {
                                gastos: planeoDB_data.gastos,
                                basicSalary: calculated_totalSalary,
                                otrosIngresos: planeoDB_data.otrosIngresos,
                            })}
                                style={styles.cardCont}
                                image="icon_billetes.png"
                                title="MIS INGRESOS"
                                subtitle="Mensuales"
                                value={calculated_totalSalary+planeoDB_data.otrosIngresos}
                                valueColor='#27DEBF'
                            />

                            <CardMessageBarra onPress={() => navigation.navigate("PresupuestoGastosDetail", {
                                gastos: planeoDB_data.gastos,
                                basicSalary: calculated_totalSalary,
                                otrosIngresos: planeoDB_data.otrosIngresos,
                            })}
                                style={styles.cardCont}
                                image="icon_cuentas.png"
                                title="MIS GASTOS"
                                subtitle="Mensuales"
                                value={calculated_totalGastos}
                                valueColor='#EC6666'
                                showLine={true}
                                percent={calculatedPercentGastos}
                                barColor="#4048CC"
                            />

                            
                            <View style={styles.othersContainer}>
                                <TitleText>Otras funcionalidades</TitleText>
                                <CardMessageContainer onPress={() => navigation.navigate("RetiroStep1")}>
                                    <CardMessage
                                        title="Liquidación de retiro"
                                        message="¿Aún no tienes un presupuesto establecido para este mes?"
                                        preLoadedImageName="img_liquidacionRetiro.png" />
                                    <View style={{flexDirection: 'row',}}>
                                        <TextBold style={styles.textCard}>Liquidar retiro</TextBold>
                                        <AntDesign name={"arrowright"} size={21} color={"#379af4"} />
                                    </View>
                                </CardMessageContainer>
                            </View>

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </PresupuestoContainer>
        </GeneralBase>
    );
};
export default PresupuestoStep2Screen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
        marginTop: 20,
    },
        headerTotalBox: {
            flexDirection: 'row',
            marginVertical: 15,
        },
            headerTotalLeftCont: {
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-end',
                paddingRight: 15,
            },
            headerTotalCenterCont: {
                flexDirection: 'column',
                justifyContent: 'center',
            },
            headerTotalRightCont: {
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-start',
                paddingLeft: 15,
            },
            headerTotalTitle:{
                fontSize: 14,
                color: 'white',
            },
            headerTotalValue:{
                fontSize: 20,
            },
        headerSaldoBox: {
            backgroundColor: 'white',
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 40,
            borderRadius: 10,
            marginVertical: 10,
        },
    headerSaldoTitle: {
        color: '#333333',
        fontSize: 17,
        textAlign: 'center',
    },
    headerSaldoValue: {
        color: '#379AF4',
        fontSize: 28,
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
    },

    cardCont: {
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },

    //Final Card
    othersContainer:{
        marginVertical: 20,
    },
        textCard:{
            color:"#343BA7",
            fontSize:15,
            marginRight: 10,
        },
});