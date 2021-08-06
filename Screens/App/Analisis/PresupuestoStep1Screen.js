//Libraries
import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity } from 'react-native';
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
    SubTitleText,
    TitleText, } from '../../../Styles/Screens/App/Analisis/presupuestoStep1';
import GastosCard from '../../../Components/GastosCard';
import GastoModal from '../../../Components/GastoModal';
import { convertNumberToString } from '../../../Utils/Numbers';

const PresupuestoStep1Screen = ({ navigation }) => {
    const { dbUserData } = useContext(AppStackContext);
    const { appUser } = useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [modalPropertyToEdit, setModalPropertyToEdit] = useState(null);
    const [gastos, setGastos] = useState({
        vivienda: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.vivienda : 0,
        alimentacion: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.alimentacion : 0,
        transporte: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.transporte : 0,
        salud: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.salud : 0,
        deudas: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.deudas : 0,
        educacion: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.educacion : 0,
        recreacion: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.recreacion : 0,
        otros: (dbUserData.planeoDB_data.gastos) ? dbUserData.planeoDB_data.gastos.otros : 0,
    });
    const [updatingData, setUpdatingData] = useState(false);

    const handleOpenModal = async (options) => {
        setModalImage(options.image);
        setModalTitle(options.title);
        setModalText(options.text);
        setModalPropertyToEdit(options.propertyToEdit);
        setModalVisible(true);
    }

    const handleCrearPresupuesto = async () => {
        setUpdatingData(true);
        await firebase.firestore().collection('users').doc(appUser.displayName).update({
            gastos: {
                vivienda: gastos.vivienda,
                alimentacion: gastos.alimentacion,
                transporte: gastos.transporte,
                salud: gastos.salud,
                deudas: gastos.deudas,
                recreacion: gastos.recreacion,
                educacion: gastos.educacion,
                otros: gastos.otros,
            },
        }).catch(e => {
            console.log(e);
            alert(e);
        });
        setUpdatingData(false);
        navigation.navigate("PresupuestoStep2", {otrosIngresos: 0, gastos})
    }

    const fetchData = async () => {
        await firebase.firestore().collection('users').doc(appUser.displayName).get().then((result) => {
            setGastos({
                alimentacion: result.data().gastos.alimentacion,
                deudas: result.data().gastos.deudas,
                educacion: result.data().gastos.educacion,
                otros: result.data().gastos.otros,
                recreacion: result.data().gastos.recreacion,
                salud: result.data().gastos.salud,
                transporte: result.data().gastos.transporte,
                vivienda: result.data().gastos.vivienda,
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
        <>
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={0}>
            <PresupuestoContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Deudas y gastos"
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate("Dashboard")} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <TitleText>Información de tus gastos</TitleText>
                            <SubTitleText style={{marginBottom: 30}}>Responde cada una de las siguientes preguntas según tus gastos mensuales.</SubTitleText>

                            <View style={styles.cardsContainer}>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_vivienda_grande.png',
                                        title: 'Vivienda',
                                        text: 'En este ítem puedes hacer un promedio de tus gastos de arriendo y/o administración, servicios públicos y artículos para el hogar.',
                                        propertyToEdit: 'vivienda',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_vivienda.png"
                                        text="Vivienda"
                                        value={convertNumberToString(gastos.vivienda)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_alimentacion_grande.png',
                                        title: 'Alimentación',
                                        text: 'En este ítem puedes poner el valor total de los gastos de alimentación, mercado, restaurantes, domicilios, etc.',
                                        propertyToEdit: 'alimentacion',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_alimentacion.png"
                                        text="Alimentación"
                                        value={convertNumberToString(gastos.alimentacion)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_transporte_grande.png',
                                        title: 'Transporte',
                                        text: 'En este ítem puedes registrar tus gastos de transporte público, combustible y parqueaderos.',
                                        propertyToEdit: 'transporte',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_transporte.png"
                                        text="Transporte"
                                        value={convertNumberToString(gastos.transporte)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_salud_grande.png',
                                        title: 'Salud',
                                        text: 'En este ítem puedes registrar tus gastos de salud, referenes a planes complementarios, bonos y/o medicamentos.',
                                        propertyToEdit: 'salud',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_salud.png"
                                        text="Salud"
                                        value={convertNumberToString(gastos.salud)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_deudas_grande.png',
                                        title: 'Deudas',
                                        text: 'En este ítem puedes registrar el promedio de tus deudas mensuales.',
                                        propertyToEdit: 'deudas',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_deudas.png"
                                        text="Deudas"
                                        value={convertNumberToString(gastos.deudas)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_recreacion_grande.png',
                                        title: 'Recreacion',
                                        text: 'En este ítem puedes registrar tus gastos de recreación, vestuario, turismo, etc.',
                                        propertyToEdit: 'recreacion',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_recreacion.png"
                                        text="Recreación"
                                        value={convertNumberToString(gastos.recreacion)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_educacion_grande.png',
                                        title: 'Educación',
                                        text: 'En este ítem puedes registrar tus gastos de educación.',
                                        propertyToEdit: 'educacion',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_educacion.png"
                                        text="Educación"
                                        value={convertNumberToString(gastos.educacion)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_otro_grande.png',
                                        title: 'Otros',
                                        text: 'En este ítem puedes registrar otros gastos mensuales.',
                                        propertyToEdit: 'otros',
                                    })} >
                                    <GastosCard
                                        iconImage="presupuesto_otro.png"
                                        text="Otro gasto"
                                        value={convertNumberToString(gastos.otros)}
                                    />
                                </TouchableOpacity>
                            </View>

                            {updatingData ? (
                                <View style={styles.loader}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            ) : (
                                <FormButtonFull
                                    buttonTitle="CREAR PRESUPUESTO"
                                    style={styles.btn}
                                    borderLine={0}
                                    textSize={18}
                                    textColor={'white'}
                                    onPress={() => handleCrearPresupuesto()} />
                            )}

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </PresupuestoContainer>
        </GeneralBase>
        { (modalVisible) ? (
            <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <GastoModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    image={modalImage}
                    title={modalTitle}
                    text={modalText}
                    propertyToEdit={modalPropertyToEdit}
                    gastos={gastos}
                    setGastos={setGastos}
                    modalItem={{}} />
            </View>
        ) : null }
        </>
    );
};
export default PresupuestoStep1Screen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
        marginVertical: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    cardsContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
        card:{
            margin: 8,
            flexDirection: 'column',
            //justifyContent: 'center',            
        },
    btn: {
        backgroundColor: '#343BA7',
        paddingVertical: 8,
        marginVertical: 20,
    },
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});