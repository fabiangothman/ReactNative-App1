//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert, View } from 'react-native';
import CardMessage from '../../../Components/CardMessage';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
import HeaderCentered from '../../../Components/HeaderCentered';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
import { AppStackContext } from '../../../Navigation/Logged/AppStackContext';
//Styles
import { MiNominaContainer,
    SupContainer,
    InfContainer,
    SubTitleText,
    TitleText,
    NormalText,
    ResultText,
    ItemTitleText,
    RowContainer,
    BoxContainer,
    CardMessageContainer } from '../../../Styles/Screens/App/Analisis/miNomina';
import { convertNumberToString } from '../../../Utils/Numbers';
import { getSubsidioTransporte, getFondoSolidaridad } from '../../../Utils/Nomina';
import { Text, TextBold } from '../../../Components/Text';

const MiNominaScreen = ({ navigation }) => {
    const { dbUserData } = useContext(AppStackContext);

    const dbWF_basicSalary = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.salary : 0;
    const dbWF_transportSupport = (dbUserData.WF_lastNomina.userData) ? getSubsidioTransporte(dbUserData.WF_lastNomina.userData.salary) : 0;
    const dbWF_bonifications = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.bons_no_ss : 0;
    const dbWF_bonificationsContributions = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.bons_with_ss : 0;
    const calculated_totalSalary = dbWF_basicSalary+dbWF_transportSupport+dbWF_bonifications+dbWF_bonificationsContributions;

    const calculated_pension = Math.round(calculated_totalSalary*0.04);
    const calculated_health = Math.round(calculated_totalSalary*0.04);
    const dbWF_libranza = 0;
    const dbWF_othesSave = 0;
    const dbWF_retefuente = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.nomina_retefuente : 0;
    const calculated_fondosolidaridad = getFondoSolidaridad(dbWF_basicSalary);
    const calculated_totalDeductions = calculated_pension+calculated_health+dbWF_libranza+dbWF_othesSave+dbWF_retefuente+calculated_fondosolidaridad;

    const calculated_monthSalary = calculated_totalSalary-calculated_totalDeductions;

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={0}>
            <MiNominaContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Mi nómina"
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate("Dashboard")} />
                        <Text style={styles.headerSubtitle}>Ingreso base mensual</Text>
                        <TextBold style={styles.headerSalary}>${convertNumberToString(calculated_monthSalary)}</TextBold>
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText>Análisis de nómina</TitleText>
                            <SubTitleText style={{marginBottom: 30}}>Los siguientes cálculos se basan en la información registrada en el test anterior.</SubTitleText>

                            <BoxContainer>
                                <RowContainer>
                                    <ItemTitleText>Total devengado</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>${convertNumberToString(calculated_totalSalary)}</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Salario básico</NormalText>
                                    <ResultText>+ ${convertNumberToString(dbWF_basicSalary)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Auxilio de transporte</NormalText>
                                    <ResultText>+ ${convertNumberToString(dbWF_transportSupport)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Bonificaciones</NormalText>
                                    <ResultText>+ ${convertNumberToString(dbWF_bonifications)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Bonificaciones con aportes</NormalText>
                                    <ResultText>+ ${convertNumberToString(dbWF_bonificationsContributions)}</ResultText>
                                </RowContainer>
                            </BoxContainer>

                            <BoxContainer>
                                <RowContainer>
                                    <ItemTitleText>Total deducciones</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>${convertNumberToString(calculated_totalDeductions)}</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Aporte pensión (4%)</NormalText>
                                    <ResultText>- ${convertNumberToString(calculated_pension)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Fondo de solidaridad</NormalText>
                                    <ResultText>- ${convertNumberToString(calculated_fondosolidaridad)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Aporte salud (4%)</NormalText>
                                    <ResultText>- ${convertNumberToString(calculated_health)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Pagos de Libranza</NormalText>
                                    <ResultText>- ${convertNumberToString(dbWF_libranza)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Otros Ahorro</NormalText>
                                    <ResultText>- ${convertNumberToString(dbWF_othesSave)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Retención en la fuente</NormalText>
                                    <ResultText>- ${convertNumberToString(dbWF_retefuente)}</ResultText>
                                </RowContainer>
                            </BoxContainer>

                            <BoxContainer>
                                <RowContainer>
                                    <NormalText>Total ingresos</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_totalSalary)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Total Descuentos</NormalText>
                                    <ResultText>- ${convertNumberToString(calculated_totalDeductions)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <ItemTitleText>Total ingreso neto:</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>=${convertNumberToString(calculated_monthSalary)}</TextBold></ResultText>
                                </RowContainer>
                            </BoxContainer>

                            <View style={styles.cardContainer}>
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

            </MiNominaContainer>
        </GeneralBase>
    );
};
export default MiNominaScreen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
        marginTop: 20,
    },
    headerSubtitle: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        marginVertical: 5,
    },
    headerSalary: {
        color: '#27DEBF',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    cardContainer:{
        marginVertical: 30,
        alignItems: 'center',
    },
        textCard:{
            color:"#343BA7",
            fontSize:15,
            marginRight: 10,
        },
    });