//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert, View, Platform, Button } from 'react-native';
import CardMessage from '../../../Components/CardMessage';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
import GeneralBase from '../../../Components/GeneralBase';
import HeaderCentered from '../../../Components/HeaderCentered';
import DatePickerSelector from '../../../Components/DatePickerSelector';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
import { AppStackContext } from '../../../Navigation/Logged/AppStackContext';
//Styles
import { RetiroContainer,
    SupContainer,
    InfContainer,
    SubTitleText,
    TitleText,
    RetiroText, } from '../../../Styles/Screens/App/Analisis/retiroStep1';
import FormInputWhite from '../../../Components/FormInputWhite';
import CustomSwitch from '../../../Components/CustomSwitch';
import { Text, TextBold } from '../../../Components/Text';
import DatePickerSelectorWeb from '../../../Components/DatePickerSelectorWeb';

const calculateVacationDays = (endDate, startDate) => {
    const diffTime = endDate.getTime() - startDate.getTime();
    const difssDays = diffTime/(1000 * 3600 * 24);
    return Math.round(difssDays*15/360);    //Calculo de dias aproximados
}

const RetiroStep1Screen = ({ navigation }) => {
    const { dbUserData } = useContext(AppStackContext);

    const dbWF_entryDate = (dbUserData.WF_lastNomina.userData) ? new Date(dbUserData.WF_lastNomina.userData.contract_startdate) : new Date();
    const dbWF_leftDate = (dbUserData.WF_lastNomina.userData && dbUserData.WF_lastNomina.userData.contract_enddate !== "") ? new Date(dbUserData.WF_lastNomina.userData.contract_enddate) : new Date();
    const currDate = new Date();
    const calculatedVacationDays = calculateVacationDays(dbWF_leftDate, dbWF_entryDate);

    const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [startDatePickerWebVisible, setStartDatePickerWebVisible] = useState(false);
    const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
    const [endDatePickerWebVisible, setEndDatePickerWebVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(dbWF_entryDate);
    const [selectedEndDate, setSelectedEndDate] = useState(dbWF_leftDate);
    const [userVacationDays, setUserVacationDays] = useState(calculatedVacationDays);
    const [renuncia, setRenuncia] = useState(true);
    const [injustificado, setInjustificado] = useState(false);
    const [justificado, setJustificado] = useState(false);
    
    const handleConfirmStartDate = async (date) => {
        setStartDatePickerVisible(false);
        setSelectedStartDate(date);
        setUserVacationDays(calculateVacationDays(selectedEndDate, date));
    }
    const handleConfirmEndDate = async (date) => {
        setEndDatePickerVisible(false);
        setSelectedEndDate(date);
        setUserVacationDays(calculateVacationDays(date, selectedStartDate));
    }

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
                            onPress={() => navigation.navigate("MiNomina")} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText>Información de retiro</TitleText>
                            <SubTitleText style={{marginBottom: 30}}>Responde las siguientes preguntas según los datos de tu retiro de la empresa.</SubTitleText>

                            <View style={styles.dateContainer}>
                                <FormInputWhite
                                    labelValue={selectedStartDate.toLocaleDateString()}
                                    onPress={() => {
                                        if(Platform.OS === 'web')
                                            setStartDatePickerWebVisible(true);
                                        else
                                            setStartDatePickerVisible(true);
                                    }}
                                    placeholderText="¿Cuándo ingresaste a la empresa? *"
                                    antIconType="calendar"
                                    iconColor="#379AF4" />
                                {Platform.OS === 'web' ? (
                                    null
                                ) : (
                                    <DatePickerSelector
                                        isVisible={startDatePickerVisible}
                                        date={selectedStartDate}
                                        maximumDate={currDate}
                                        onConfirm={(val) => handleConfirmStartDate(val)}
                                        onCancel={() => setStartDatePickerVisible(false)}
                                    />
                                )}
                            </View>

                            <View style={styles.dateContainer}>
                                <FormInputWhite
                                    labelValue={selectedEndDate.toLocaleDateString()}
                                    onPress={() => {
                                        if(Platform.OS === 'web')
                                            setEndDatePickerWebVisible(true);
                                        else
                                            setEndDatePickerVisible(true)
                                    }}
                                    placeholderText="¿Cuándo te retiras de la empresa? *"
                                    antIconType="calendar"
                                    iconColor="#379AF4" />
                                {Platform.OS === 'web' ? (
                                    null
                                ) : (
                                    <DatePickerSelector
                                        isVisible={endDatePickerVisible}
                                        date={selectedEndDate}
                                        minimumDate={currDate}
                                        onConfirm={(val) => handleConfirmEndDate(val)}
                                        onCancel={() => setEndDatePickerVisible(false)}
                                    />
                                )}
                            </View>

                            <View style={styles.dateContainer}>
                                <FormInputWhite
                                    labelValue={userVacationDays}
                                    editable={true}
                                    onPress={() => {}}
                                    placeholderText="Días de vacaciones acumulados a hoy *"
                                    onChangeText={(val) => setUserVacationDays(val)}
                                    keyboardType="numeric"
                                    antIconType="calendar"
                                    iconColor="#379AF4" />
                                <Text style={styles.noteText}>Según tu fecha de ingreso en nómina tienes aproximadamente {calculatedVacationDays} días de vacaciones acumulados a hoy.</Text>
                            </View>

                            <View style={styles.switchesCont}>
                                <RetiroText>Motivo del retiro *</RetiroText>
                                <View style={styles.switchField}>
                                    <CustomSwitch
                                        text="Renuncia"
                                        textColor="#777777"
                                        ios_backgroundColor="grey"
                                        thumbColor='white'
                                        trackColor={{true:'#343ba7', false:'grey' }}
                                        value={renuncia}
                                        onValueChange={(value) => {
                                            if(value){
                                                setRenuncia(value);
                                                setInjustificado(false);
                                                setJustificado(false);
                                            }else{
                                                setRenuncia(false);
                                                setInjustificado(false);
                                                setJustificado(false);
                                            }
                                        }}
                                        disabled={false} />
                                </View>
                                <View style={styles.switchField}>
                                    <CustomSwitch
                                        text="Despido injustificado"
                                        textColor="#777777"
                                        ios_backgroundColor="grey"
                                        thumbColor='white'
                                        trackColor={{true:'#343ba7', false:'grey' }}
                                        value={injustificado}
                                        onValueChange={(value) => {
                                            if(value){
                                                setRenuncia(false);
                                                setInjustificado(value);
                                                setJustificado(false);
                                            }else{
                                                setRenuncia(false);
                                                setInjustificado(false);
                                                setJustificado(false);
                                            }
                                        }}
                                        disabled={false} />
                                </View>
                                <View style={styles.switchField}>
                                    <CustomSwitch
                                        text="Despido justificado"
                                        textColor="#777777"
                                        ios_backgroundColor="grey"
                                        thumbColor='white'
                                        trackColor={{true:'#343ba7', false:'grey' }}
                                        value={justificado}
                                        onValueChange={(value) => {
                                            if(value){
                                                setRenuncia(false);
                                                setInjustificado(false);
                                                setJustificado(value);
                                            }else{
                                                setRenuncia(false);
                                                setInjustificado(false);
                                                setJustificado(false);
                                            }
                                        }}
                                        disabled={false} />
                                </View>
                            </View>
                            
                            <FormButtonFull
                                buttonTitle="CREAR LIQUIDACIÓN"
                                style={styles.btn}
                                borderLine={0}
                                textSize={18}
                                bgColor='red'
                                textColor={'white'}
                                onPress={() => navigation.navigate("RetiroStep2", {
                                    selectedStartDate: {
                                        day: selectedStartDate.getDate(),
                                        month: selectedStartDate.getMonth()+1,
                                        year: selectedStartDate.getFullYear(),
                                    },
                                    selectedEndDate: {
                                        day: selectedEndDate.getDate(),
                                        month: selectedEndDate.getMonth()+1,
                                        year: selectedEndDate.getFullYear(),
                                    },
                                    userVacationDays: userVacationDays,
                                    renuncia: renuncia,
                                    injustificado: injustificado,
                                    justificado: justificado,
                                })} />

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </RetiroContainer>
            <DatePickerSelectorWeb visible={startDatePickerWebVisible} setVisible={setStartDatePickerWebVisible} date={selectedStartDate} setDate={setSelectedStartDate} />
            <DatePickerSelectorWeb visible={endDatePickerWebVisible} setVisible={setEndDatePickerWebVisible} date={selectedEndDate} setDate={setSelectedEndDate} />
        </GeneralBase>
    );
};
export default RetiroStep1Screen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
        marginVertical: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    noteText:{
        color: "#707070",
        fontSize: 14,
    },
    dateContainer:{
        marginVertical: 10,
    },
    switchesCont:{
        marginVertical: 10,
    },
        switchField:{
            marginVertical: 5,
        },
    btn:{
        backgroundColor: '#343BA7',
        paddingVertical: 8,
        marginVertical: 20,
    },
});