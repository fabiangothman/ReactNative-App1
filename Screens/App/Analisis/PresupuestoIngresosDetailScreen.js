//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Components
import GeneralBase from '../../../Components/GeneralBase';
import HeaderCentered from '../../../Components/HeaderCentered';
import CardMessageBarra from '../../../Components/CardMessageBarra';
import GastoModal from '../../../Components/GastoModal';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
import { AppStackContext } from '../../../Navigation/Logged/AppStackContext';
//Styles
import { PresupuestoContainer,
    SupContainer,
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
    NormalText } from '../../../Styles/Screens/App/Analisis/presupuestoIngresosDetail';
import { convertNumberToString } from '../../../Utils/Numbers';

const PresupuestoIngresosDetailScreen = ({ route, navigation }) => {
    const { dbUserData } = useContext(AppStackContext);
    const { appUser } = useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [modalPropertyToEdit, setModalPropertyToEdit] = useState(null);

    const [otrosIngresos, setOtrosIngresos] = useState((route.params.otrosIngresos) ? route.params.otrosIngresos : 0);

    const basicSalary = (route.params.basicSalary) ? route.params.basicSalary : 0;


    const handleNavCarrousel = () => {
        navigation.navigate("PresupuestoGastosDetail", {
            gastos: route.params.gastos,
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

    const setIngresosHandler = (value) => {
        setOtrosIngresos(parseInt(value.otrosIngresos));
    }

    const setModalVisibleHandler = async (value) => {
        setModalVisible(value); //Va primero para mejor el efecto en el FrontEnd
        if(value === false){
            await firebase.firestore().collection('users').doc(appUser.displayName).update({
                otrosIngresos: otrosIngresos,
            }).catch(e => {
                console.log(e);
                alert(e);
            });
        }        
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
                            onPress={() => navigation.navigate("PresupuestoStep2", {gastos: route.params.gastos})} />
                        
                        <NavigationContainer>
                            <NavigationArrow>
                                <ArrowButton onPress={() => handleNavCarrousel()}>
                                    <FontAwesome name={"angle-left"} size={24} color={"#8f92b6"} style={{marginRight:3}} />
                                </ArrowButton>
                            </NavigationArrow>

                            <InfoBoxContainer>
                                <InfoBoxContent>
                                    <InfoBoxCol style={{marginRight: 10,}}>
                                        <TitleInfo>MIS INGRESOS</TitleInfo>
                                        <ValueInfo>${convertNumberToString(basicSalary+otrosIngresos)}</ValueInfo>
                                    </InfoBoxCol>
                                    <InfoBoxCol style={{marginLeft: 10,}}>
                                        <TouchableOpacity onPress={() =>  handleOpenModal({
                                            image: 'presupuesto_otro_grande.png',
                                            title: 'Otros ingresos',
                                            text: 'En este ítem puedes hacer un promedio de tus ingresos adicionales a la nómina.',
                                            propertyToEdit: 'otrosIngresos',
                                        })}>
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
                            <NormalText>Acá puedes ver cuál es el valor de tus ingresos. Conoce cómo tus ingresos totales del mes están construidos.</NormalText>

                            <View style={{marginVertical:20,}}>
                                <CardMessageBarra onPress={() => navigation.navigate("MiNomina")}
                                    style={styles.cardCont}
                                    image="icon_billetes.png"
                                    title="NÓMINA"
                                    subtitle="Mensuales"
                                    value={basicSalary}
                                    valueColor='#27DEBF'
                                />
                                <CardMessageBarra style={styles.cardCont}
                                    onPress={() =>  handleOpenModal({
                                        image: 'presupuesto_otro_grande.png',
                                        title: 'Otros ingresos',
                                        text: 'En este ítem puedes hacer un promedio de tus ingresos adicionales a la nómina.',
                                        propertyToEdit: 'otrosIngresos',
                                    })}
                                    image="icon_billetes.png"
                                    title="OTROS INGRESOS"
                                    subtitle="Mensuales"
                                    value={otrosIngresos}
                                    valueColor='#27DEBF'
                                />
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
                    gastos={{otrosIngresos}}
                    setGastos={setIngresosHandler}
                    modalItem={{}} />
            </View>
        ) : null }
        </>
    );
};
export default PresupuestoIngresosDetailScreen;

const styles = StyleSheet.create({
    headerCont: {
        flex:1,
        marginTop: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    cardCont: {
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
});