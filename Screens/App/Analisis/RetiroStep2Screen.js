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
import { RetiroContainer,
    SupContainer,
    InfContainer,
    SubTitleText,
    TitleText,
    NormalText,
    ResultText,
    ItemTitleText,
    RowContainer,
    BoxContainer,
    CardMessageContainer } from '../../../Styles/Screens/App/Analisis/retiroStep2';
import { convertNumberToString } from '../../../Utils/Numbers';
import { calculateDaysWorked, calculateMidYearDaysWorked, calculateMonthDaysWorked, calculateYearDaysWorked, getFondoSolidaridad, getSubsidioTransporte } from '../../../Utils/Nomina';
import { Text, TextBold } from '../../../Components/Text';

const RetiroStep2Screen = ({ route, navigation }) => {
    const { selectedStartDate,
        selectedEndDate,
        userVacationDays,
        renuncia,
        injustificado,
        justificado } = route.params;
    
    const { dbUserData } = useContext(AppStackContext);

    const calculated_total_daysWorked = calculateDaysWorked(selectedEndDate, selectedStartDate);
    const calculated_midyear_daysWorked = calculateMidYearDaysWorked(selectedEndDate, selectedStartDate);
    const calculated_month_daysWorked = (calculateMonthDaysWorked(selectedEndDate, selectedStartDate) > 30) ? 30 : calculateMonthDaysWorked(selectedEndDate, selectedStartDate);
    const calculated_year_daysWorked = calculateYearDaysWorked(selectedEndDate, selectedStartDate);

    const dbWF_basicSalary = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.salary : 0;
    const dbWF_monthSalary = Math.round(dbWF_basicSalary*calculated_month_daysWorked/30);
    const dbWF_transportSupport = (dbUserData.WF_lastNomina.userData) ? getSubsidioTransporte(dbUserData.WF_lastNomina.userData.salary) : 0;
    const dbWF_bonifications = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.bons_no_ss : 0;
    const dbWF_bonificationsContributions = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.bons_with_ss : 0;
    const calculated_totalSalary = dbWF_monthSalary+dbWF_transportSupport+dbWF_bonifications+dbWF_bonificationsContributions;

    const calculated_vacations = Math.round((userVacationDays*dbWF_basicSalary)/30);//Math.round((dbWF_basicSalary*calculated_total_daysWorked)/720);
    const calculated_prima = Math.round((dbWF_basicSalary*calculated_midyear_daysWorked)/360);
    const calculated_cesantias = Math.round((dbWF_basicSalary*calculated_year_daysWorked)/360);
    const calculated_interCesantias = Math.round((calculated_cesantias*0.12*calculated_year_daysWorked)/360);
    const calculated_indemnizacion = (injustificado) ? dbWF_basicSalary : 0;
    const calculated_totalPrestaciones = calculated_vacations + calculated_prima + calculated_cesantias + calculated_interCesantias + calculated_indemnizacion;

    const calculated_pension = Math.round(calculated_totalSalary*0.04);
    const calculated_health = Math.round(calculated_totalSalary*0.04);
    const dbWF_libranza = 0;
    const dbWF_othesSave = 0;
    const dbWF_retefuente = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.nomina_retefuente : 0;
    const calculated_fondosolidaridad = getFondoSolidaridad(dbWF_basicSalary);
    const calculated_totalDeductions = calculated_pension+calculated_health+dbWF_libranza+dbWF_othesSave+dbWF_retefuente+calculated_fondosolidaridad;

    const calculated_liquidacion = calculated_totalSalary + calculated_totalPrestaciones - calculated_totalDeductions;

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={0}>
            <RetiroContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Liquidación de retiro"
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate("RetiroStep1")} />
                        <Text style={styles.headerSubtitle}>Ingreso base mensual</Text>
                        <TextBold style={styles.headerSalary}>${convertNumberToString(calculated_liquidacion)}</TextBold>
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText>Análisis de retiro</TitleText>
                            <SubTitleText>Los siguientes cálculos se basan en la información registrada en el test anterior.</SubTitleText>

                            <View style={styles.datesInfo}>
                                <RowContainer>
                                    <ItemTitleText>Fecha de Ingreso</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>{`${selectedStartDate.day}/${selectedStartDate.month}/${selectedStartDate.year}`}</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <ItemTitleText>Fecha de Retiro</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>{`${selectedEndDate.day}/${selectedEndDate.month}/${selectedEndDate.year}`}</TextBold></ResultText>
                                </RowContainer>
                                {/*<RowContainer>
                                    <ItemTitleText>Días totales trabajados</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>{calculated_total_daysWorked} días</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <ItemTitleText>Días trabajados en el semestre</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>{calculated_midyear_daysWorked} días</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <ItemTitleText>Días trabajados en el mes</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>{calculated_month_daysWorked} días</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <ItemTitleText>Días trabajados en el año</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>{calculated_year_daysWorked} días</TextBold></ResultText>
                                </RowContainer>*/}
                            </View>

                            <FormButtonAuto
                                buttonTitle="EDITAR RETIRO"
                                style={styles.formButtonAuto}
                                borderLine={0}
                                textSize={18}
                                textColor={'white'}
                                onPress={() => {navigation.navigate("RetiroStep1")}} />

                            <BoxContainer>
                                <RowContainer>
                                    <ItemTitleText>Salario</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>${convertNumberToString(calculated_totalSalary)}</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Salario básico del mes</NormalText>
                                    <ResultText>+ ${convertNumberToString(dbWF_monthSalary)}</ResultText>
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
                                    <ItemTitleText>Prestaciones sociales</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>${convertNumberToString(calculated_totalPrestaciones)}</TextBold></ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Vacaciones</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_vacations)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Prima legal</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_prima)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Cesantías</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_cesantias)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Intereses de cesantías</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_interCesantias)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Indemnización</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_indemnizacion)}</ResultText>
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

                            <BoxContainer style={{marginBottom: 20}}>
                                <RowContainer>
                                    <NormalText>Total ingresos</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_totalSalary)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Total prestaciones</NormalText>
                                    <ResultText>+ ${convertNumberToString(calculated_totalPrestaciones)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <NormalText>Total Descuentos</NormalText>
                                    <ResultText>- ${convertNumberToString(calculated_totalDeductions)}</ResultText>
                                </RowContainer>
                                <RowContainer>
                                    <ItemTitleText>Total ingreso neto:</ItemTitleText>
                                    <ResultText style={{color: '#565656'}}><TextBold>=${convertNumberToString(calculated_liquidacion)}</TextBold></ResultText>
                                </RowContainer>
                            </BoxContainer>

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </RetiroContainer>
        </GeneralBase>
    );
};
export default RetiroStep2Screen;

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
    datesInfo:{
        marginVertical: 20,
    },
    formButtonAuto: {
        backgroundColor: '#343BA7',
        paddingVertical: 10,
        paddingHorizontal: 80,
        marginBottom: 20,
    },
});