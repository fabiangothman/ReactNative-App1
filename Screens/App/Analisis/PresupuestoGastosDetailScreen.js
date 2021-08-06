//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase/app';
import 'firebase/firestore';
//Components
import GeneralBase from '../../../Components/GeneralBase';
import HeaderCentered from '../../../Components/HeaderCentered';
import BarraPercent from '../../../Components/BarraPercent';
import GastoModal from '../../../Components/GastoModal';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
import { AppStackContext } from '../../../Navigation/Logged/AppStackContext';
//Styles
import { PresupuestoContainer,
    SupContainer,
    TitleHeader,
    TextHeader,
    TextRed,
    NavigationContainer,
    NavigationArrow,
    ArrowButton,
    InfoBoxContainer,
    InfoBoxContent,
    InfoBoxCol,
    TitleInfo,
    ValueInfo,
    CircleEditButton,
    InfContainer,
    NormalText,
    BoxContainer,
    DetailCont,
    DetailCol,
    ItemTitleText,
    ItemValueText } from '../../../Styles/Screens/App/Analisis/presupuestoGastosDetail';
import { convertNumberToString } from '../../../Utils/Numbers';
import { Text, TextBold } from '../../../Components/Text';

const PresupuestoGastosDetailScreen = ({ route, navigation }) => {
    const { dbUserData } = useContext(AppStackContext);
    const { appUser } = useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [modalPropertyToEdit, setModalPropertyToEdit] = useState(null);
    const [gastos, setGastos] = useState({
        vivienda: (route.params.gastos) ? parseInt(route.params.gastos.vivienda) : 0,
        alimentacion: (route.params.gastos) ? parseInt(route.params.gastos.alimentacion) : 0,
        transporte: (route.params.gastos) ? parseInt(route.params.gastos.transporte) : 0,
        salud: (route.params.gastos) ? parseInt(route.params.gastos.salud) : 0,
        deudas: (route.params.gastos) ? parseInt(route.params.gastos.deudas) : 0,
        educacion: (route.params.gastos) ? parseInt(route.params.gastos.educacion) : 0,
        recreacion: (route.params.gastos) ? parseInt(route.params.gastos.recreacion) : 0,
        otros: (route.params.gastos) ? parseInt(route.params.gastos.otros) : 0,
    });

    const basicSalary = (route.params.basicSalary) ? parseInt(route.params.basicSalary) : 0;
    const otrosIngresos = (route.params.otrosIngresos) ? parseInt(route.params.otrosIngresos) : 0;

    const percentVivienda = parseFloat((gastos.vivienda*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentAlimentacion = parseFloat((gastos.alimentacion*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentTransporte = parseFloat((gastos.transporte*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentSalud = parseFloat((gastos.salud*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentDeudas = parseFloat((gastos.deudas*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentEducacion = parseFloat((gastos.educacion*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentRecreacion = parseFloat((gastos.recreacion*100/(basicSalary+otrosIngresos)).toFixed(2));
    const percentOtro = parseFloat((gastos.otros*100/(basicSalary+otrosIngresos)).toFixed(2));

    const percentFloat = (percentVivienda+percentAlimentacion+percentTransporte+percentSalud+percentDeudas+percentEducacion+percentRecreacion+percentOtro).toFixed(2);
    const percentInt = Math.round(percentFloat);
    const totalGastos = gastos.vivienda+gastos.alimentacion+gastos.transporte+gastos.salud+gastos.deudas+gastos.educacion+gastos.recreacion+gastos.otros;

    let pieData = [{
        value: percentInt,
        svg: {
            fill: "#EC6666",
            onPress: () => {},
        },
        key: `pie-0`,
    }];
    for (let index = 1; index <= 100-percentInt; index++)
        pieData.push({
            value: 1,
            svg: {
                fill: "#ffffff",
                onPress: () => {},
            },
            key: `pie-${index}`,
        });

    const handleNavCarrousel = () => {
        navigation.navigate("PresupuestoIngresosDetail", {
            gastos: gastos,
            basicSalary: basicSalary,
            otrosIngresos: otrosIngresos,
        });
    }

    const handleOpenModal = async (options) => {
        setModalImage(options.image);
        setModalTitle(options.title);
        setModalText(options.text);
        setModalPropertyToEdit(options.propertyToEdit);
        setModalVisible(true);
    }

    const setGastosHandler = (value) => {
        setGastos({
            vivienda: parseInt(value.vivienda),
            alimentacion: parseInt(value.alimentacion),
            transporte: parseInt(value.transporte),
            salud: parseInt(value.salud),
            deudas: parseInt(value.deudas),
            educacion: parseInt(value.educacion),
            recreacion: parseInt(value.recreacion),
            otros: parseInt(value.otros),
        });
    }

    const setModalVisibleHandler = async (value) => {
        setModalVisible(value); //Va primero para mejor el efecto en el FrontEnd
        if(value === false){
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
        }
        //setModalVisible(value);
    }

    return (
        <>
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop={0}>
            <PresupuestoContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Mi presupuesto"
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate("PresupuestoStep2", {gastos: gastos})} />
                        
                        <View style={styles.headerCircle}>
                            <PieChart data={pieData}
                                style={{ width:135, height: 135 }}
                                outerRadius="68%"
                                innerRadius="100%"
                            />
                            <View style={styles.gauge}>
                                <Text style={styles.gaugeText}>{percentInt}%</Text>
                            </View>
                        </View>

                        <View style={styles.headerInfo}>
                            <TitleHeader>Tus gastos mensuales</TitleHeader>
                            <TextHeader>representan el <TextRed>{percentFloat}%</TextRed> de tus ingresos.</TextHeader>
                        </View>
                        
                        <NavigationContainer>
                            <NavigationArrow>
                                <ArrowButton onPress={() => handleNavCarrousel()}>
                                    <FontAwesome name={"angle-left"} size={24} color={"#8f92b6"} style={{marginRight:3}} />
                                </ArrowButton>
                            </NavigationArrow>

                            <InfoBoxContainer>
                                <InfoBoxContent>
                                    <InfoBoxCol style={{marginRight: 10,}}>
                                        <TitleInfo>TOTAL GASTOS</TitleInfo>
                                        <ValueInfo>${convertNumberToString(totalGastos)}</ValueInfo>
                                    </InfoBoxCol>
                                    <InfoBoxCol style={{marginLeft: 10,}}>
                                        <TouchableOpacity onPress={() => navigation.navigate("PresupuestoStep1")}>
                                            <CircleEditButton>
                                                <FontAwesome name={"pencil"} size={24} color={"white"} />
                                            </CircleEditButton>
                                        </TouchableOpacity>
                                    </InfoBoxCol>
                                </InfoBoxContent>
                            </InfoBoxContainer>

                            <NavigationArrow>
                                <ArrowButton onPress={() => handleNavCarrousel()}>
                                    <FontAwesome name={"angle-right"} size={24} color={"#8f92b6"} style={{marginLeft:3}} />
                                </ArrowButton>
                            </NavigationArrow>
                        </NavigationContainer>
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                            <NormalText>Acá puedes ver cuál es el valor de tus gasto por cada categoría y el porcentaje que este representa del total de tus ingresos.</NormalText>

                            <View style={{marginVertical:20,}}>
                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_vivienda_grande.png',
                                        title: 'Vivienda',
                                        text: 'En este ítem puedes hacer un promedio de tus gastos de arriendo y/o administración, servicios públicos y artículos para el hogar.',
                                        propertyToEdit: 'vivienda',
                                    })}
                                >
                                    <BoxContainer>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Vivienda / Arriendo</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.vivienda)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentVivienda}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_alimentacion_grande.png',
                                        title: 'Alimentación',
                                        text: 'En este ítem puedes poner el valor total de los gastos de alimentación, mercado, restaurantes, domicilios, etc.',
                                        propertyToEdit: 'alimentacion',
                                    })}
                                >
                                    <BoxContainer>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Alimentación</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.alimentacion)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentAlimentacion}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_transporte_grande.png',
                                        title: 'Transporte',
                                        text: 'En este ítem puedes registrar tus gastos de transporte público, combustible y parqueaderos.',
                                        propertyToEdit: 'transporte',
                                    })}
                                >
                                    <BoxContainer style={styles.boxContainer}>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Transporte</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.transporte)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentTransporte}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>  

                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_salud_grande.png',
                                        title: 'Salud',
                                        text: 'En este ítem puedes registrar tus gastos de salud, referenes a planes complementarios, bonos y/o medicamentos.',
                                        propertyToEdit: 'salud',
                                    })}
                                >
                                    <BoxContainer style={styles.boxContainer}>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Salud</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.salud)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentSalud}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_deudas_grande.png',
                                        title: 'Deudas',
                                        text: 'En este ítem puedes registrar el promedio de tus deudas mensuales.',
                                        propertyToEdit: 'deudas',
                                    })}
                                >
                                    <BoxContainer style={styles.boxContainer}>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Deudas</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.deudas)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentDeudas}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_recreacion_grande.png',
                                        title: 'Recreacion',
                                        text: 'En este ítem puedes registrar tus gastos de recreación, vestuario, turismo, etc.',
                                        propertyToEdit: 'recreacion',
                                    })}
                                >
                                    <BoxContainer style={styles.boxContainer}>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Recreación</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.recreacion)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentRecreacion}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_educacion_grande.png',
                                        title: 'Educación',
                                        text: 'En este ítem puedes registrar tus gastos de educación.',
                                        propertyToEdit: 'educacion',
                                    })}
                                >
                                    <BoxContainer style={styles.boxContainer}>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Educación</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.educacion)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentEducacion}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.boxContainer}
                                    onPress={() => handleOpenModal({
                                        image: 'presupuesto_otro_grande.png',
                                        title: 'Otros',
                                        text: 'En este ítem puedes registrar otros gastos mensuales.',
                                        propertyToEdit: 'otros',
                                    })}
                                >
                                    <BoxContainer style={styles.boxContainer}>
                                        <DetailCont>
                                            <DetailCol style={{flex:1}}>
                                                <ItemTitleText>Otros gasto</ItemTitleText>
                                            </DetailCol>
                                            <DetailCol>
                                                <ItemValueText>$ {convertNumberToString(gastos.otros)}</ItemValueText>
                                            </DetailCol>
                                        </DetailCont>
                                        <BarraPercent percent={percentOtro}
                                            barColor="#379AF4"
                                            textColor="#707070"
                                            style={styles.barraPercent} />
                                    </BoxContainer>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </PresupuestoContainer>
        </GeneralBase>
        { (modalVisible) ? (
            <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <GastoModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisibleHandler}
                    image={modalImage}
                    title={modalTitle}
                    text={modalText}
                    propertyToEdit={modalPropertyToEdit}
                    gastos={gastos}
                    setGastos={setGastosHandler}
                    modalItem={{}} />
            </View>
        ) : null }
        </>
    );
};
export default PresupuestoGastosDetailScreen;

const styles = StyleSheet.create({
    headerCont: {
        flex:1,
        marginTop: 20,
    },
        headerCircle: {
            alignItems: 'center',
            marginTop: 15,
        },
            gauge: {
                position: 'absolute',
                width: 135,
                height: 135,
                alignItems: 'center',
                justifyContent: 'center',
            },
            gaugeText: {
                color: 'white',
                fontSize: 30,
            },
        headerInfo:{
            alignItems: 'center',
            marginVertical: 10,
        },
    scrollContainer: {
        flex: 1,
    },
    boxContainer:{
        paddingTop: 10,
        marginVertical: 5,
    },
        barraPercent:{
            marginTop: 5,
        },
});