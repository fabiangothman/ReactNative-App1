//Libraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
//Components
import FeatureCard from '../../Components/FeatureCard';
import { AppStackContext } from '../../Navigation/Logged/AppStackContext';
//Styles
import { DashboardContainer, CardsLineCont, Card, TitleText, CardMessageContainer } from '../../Styles/Screens/App/dashboard';
//Images
import CardMessage from '../../Components/CardMessage';
import { CustomAlert } from '../../Utils/CustomAlert';

const DashboardScreen = ({navigation}) => {
    const { dbUserData, fetchDbUserData } = useContext(AppStackContext);

    const docsAva = (dbUserData.planeoDB_data.fileDocumentsAvailable) ? dbUserData.planeoDB_data.fileDocumentsAvailable : 0;
    const docsRead = (dbUserData.planeoDB_data.fileDocumentsRead) ? dbUserData.planeoDB_data.fileDocumentsRead : 0;
    const certsAva = (dbUserData.planeoDB_data.fileCertsAvailable) ? dbUserData.planeoDB_data.fileCertsAvailable : 0;
    const certsRead = (dbUserData.planeoDB_data.fileCertsRead) ? dbUserData.planeoDB_data.fileCertsRead : 0;
    const nomsAva = (dbUserData.planeoDB_data.filePayrollesAvailable) ? dbUserData.planeoDB_data.filePayrollesAvailable : 0;
    const nomsRead = (dbUserData.planeoDB_data.filePayrollesRead) ? dbUserData.planeoDB_data.filePayrollesRead : 0;

    useEffect(() => {
        navigation.addListener("focus", () => fetchDbUserData(true, false));
    }, [navigation]);

    return (
        <DashboardContainer>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.cardsContainer}>
                        <CardsLineCont>
                            <Card onPress={() => navigation.navigate("Documents")} >
                                <FeatureCard
                                    title="Mis Documentos"
                                    bgColor={'#379AF4'}
                                    preLoadedImageName="iconDocumentos.png"
                                    notificationsNumber={docsAva-docsRead} />
                            </Card>
                            <Card onPress={() => navigation.navigate("Certificates")} >
                                <FeatureCard
                                    title="Mis Certificados"
                                    bgColor={'#46D3E6'}
                                    preLoadedImageName="iconCertificados.png"
                                    notificationsNumber={certsAva-certsRead} />
                            </Card>
                        </CardsLineCont>
                        <CardsLineCont>
                            <Card onPress={() => CustomAlert(
                                    'Mantente atento',
                                    'Esta funcionalidad estará disponible pronto.')} >
                                <FeatureCard
                                    title="Nuevo Envio"
                                    bgColor={'#27DEBF'}
                                    preLoadedImageName="iconEnvio.png"
                                    notificationsNumber={0} />
                            </Card>
                            <Card onPress={() => navigation.navigate("Payrolles")} >
                                <FeatureCard
                                    title="Desp. Nómina"
                                    bgColor={'#FAB74D'}
                                    preLoadedImageName="iconNomina.png"
                                    notificationsNumber={nomsAva-nomsRead} />
                            </Card>
                        </CardsLineCont>
                    </View>

                    <View style={styles.othersContainer}>
                        <TitleText>Otras funcionalidades</TitleText>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <CardMessageContainer onPress={() => navigation.navigate("MiNomina")}>
                                <CardMessage
                                    title="Mi nómina"
                                    message="¿Conoces cuánto te descuentan o te deducen de tu nómina?"
                                    preLoadedImageName="img_otrasNomina.png" />
                            </CardMessageContainer>

                            <CardMessageContainer onPress={() => navigation.navigate("PresupuestoStep1")}>
                                <CardMessage
                                    title="Mi presupuesto"
                                    message="¿Aún no tienes un presupuesto establecido para este mes?"
                                    preLoadedImageName="img_otrasPresupuesto.png" />
                            </CardMessageContainer>
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </DashboardContainer>
    );
};
export default DashboardScreen;

const styles = StyleSheet.create({
    cardsContainer: {
        marginVertical: 20,
    },
    othersContainer: {
        marginVertical: 20,
    },
});