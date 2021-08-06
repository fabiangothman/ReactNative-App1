//Libraries
import React, { useState, useContext } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import * as Print from 'expo-print';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
//Components
import { FormButtonFull, FormButtonAuto } from '../../Components/FormButton';
//Navigation
import { AuthContext } from '../../Navigation/AuthProvider';
import { AppStackContext } from '../../Navigation/Logged/AppStackContext';
//Styles
import { CreateCertificateContainer } from '../../Styles/Screens/App/createCertificate';
//Images
import planeoLogo from '../../assets/images/planeoLogoNegro.png';
import img_analisRapido from '../../assets/images/img_analisRapido.png';
import CustomSwitch from '../../Components/CustomSwitch';
//Utils
import { extensionIsAllowed } from '../../Utils/FilePicker';
//Config
import { endPointsConfig } from '../../configGeneral';
import { Text, TextBold } from '../../Components/Text';
import { CustomAlert } from '../../Utils/CustomAlert';

const CreateCertificateScreen = ({navigation}) => {
    const { appUser } = useContext(AuthContext);
    const { dbUserData } = useContext(AppStackContext);
    const userDocument = (dbUserData.WF_lastNomina.userData) ? dbUserData.WF_lastNomina.userData.document_number : 0;

    const [fechaIngreso, setFechaIngreso] = useState(true);
    const [tipoContrato, setTipoContrato] = useState(true);
    const [cargo, setCargo] = useState(true);
    const [salario, setSalario] = useState(true);
    const [bonifica, setBonifica] = useState(false);
    const [fechaFin, setFechaFin] = useState(false);
    const [auxilios, setAuxilios] = useState(false);

    const [generating, setGenerating] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const uploadFile = async (uri) => {
        let fileName = new Date();
        fileName = fileName.getFullYear()+"_"+(fileName.getMonth()+1)+"_"+fileName.getDate()+"_"+Date.parse(fileName)+".pdf";
        
        //Inicia la carga del archivo
        setTransferred(0);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref(appUser.displayName+'/certificates/').child(fileName);
        const task = ref.put(blob);
        task.on('state_changed', taskSnapshot => {
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred/taskSnapshot.totalBytes*100)
            );
        });

        try{
            await task;
            //const url = await ref.getDownloadURL();
            return true;
        }catch(e){
            console.log(e);alert(e);
            return false;
        }
    }

    const updateDbCertificate = async (certsAvailable, certsRead) => {
        let updateObj = {};
        if(!(certsAvailable===null))
            updateObj.fileCersAvailable = certsAvailable;
        if(!(certsRead===null))
            updateObj.fileCertsRead = certsRead;

        let updated = false;
        await firebase.firestore().collection('users').doc(appUser.displayName).update(updateObj).then(() => {
            updated = true;
        }).catch((e) => {
            console.log(e);
            alert(e);
            updated = false;
        });
        return updated;
    }

    const uploadFilehandler = async (uri) => {
        if(await uploadFile(uri)){
            await updateDbCertificate(firebase.firestore.FieldValue.increment(1), firebase.firestore.FieldValue.increment(1));
        }
    }

    //Validar que si ya esta confirmados los pasos de su información, no lo deje seguir
    const handleGenerateCertificate = async () => {
        setGenerating(true);

        if(Platform.OS !== 'web'){
            try{
                await fetch(endPointsConfig.WF_certificatepdf_endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_document: userDocument,
                        options: {
                            "fechaIngreso": fechaIngreso,
                            "tipoContrato": tipoContrato,
                            "cargo": cargo,
                            "salario": salario,
                            "bonifica": bonifica,
                            "fechaFin": fechaFin,
                            "auxilios": auxilios
                        }
                    })
                }).then(response => response.json()).then(async (data) => {
                    if(data.resp){
                        const html = decodeURIComponent(`${data.resp}`);
                        //console.log(html);
                        const {uri} = await Print.printToFileAsync({ html });
                        await uploadFilehandler(uri);
                        navigation.navigate("Certificates", {fetchCerts: true});
                    }else{
                        CustomAlert('Ups! Ocurrió un error al generar el certificado', data.error);
                    }                    
                }).catch(error => alert(error));

            }catch(e){
                alert(e);
                console.log(e);
            }
        }else{
            alert("Esta funcionalidad solo esta disponible por el momento para la App, te invitamos a que las descargues de las tiendas.");
        }
        setGenerating(false);
    }

    return (
        <CreateCertificateContainer>
            <View style={styles.internal}>
                <View style={styles.top}>
                    <TextBold style={styles.title}>Solicitar certificado laboral</TextBold>
                    <Text style={styles.subTitle}>Selecciona los datos que quieres que se ingresen en tu certificado, que se guardará automáticamente en esta carpeta.</Text>

                    <View style={styles.switchesContainer}>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Fecha de ingreso"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={fechaIngreso}
                                onValueChange={(value) => setFechaIngreso(value)}
                                disabled={true} />
                        </View>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Tipo de contrato"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={tipoContrato}
                                onValueChange={(value) => setTipoContrato(value)}
                                disabled={true} />
                        </View>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Cargo"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={cargo}
                                onValueChange={(value) => setCargo(value)}
                                disabled={true} />
                        </View>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Salario"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={salario}
                                onValueChange={(value) => setSalario(value)}
                                disabled={true} />
                        </View>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Bonificaciones"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={bonifica}
                                onValueChange={(value) => setBonifica(value)}
                                disabled={true} />
                        </View>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Fecha fin del contrato"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={fechaFin}
                                onValueChange={(value) => setFechaFin(value)}
                                disabled={true} />
                        </View>
                        <View style={styles.switchField}>
                            <CustomSwitch
                                text="Auxilios"
                                textColor="#777777"
                                ios_backgroundColor="grey"
                                thumbColor='white'
                                trackColor={{true:'#343ba7', false:'grey' }}
                                value={auxilios}
                                onValueChange={(value) => setAuxilios(value)}
                                disabled={true} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>

                    {(generating) ? (
                        <>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <Text>{transferred}% completado.</Text>
                        </>
                    ) : (
                        <FormButtonFull
                            buttonTitle="GENERAR CERTIFICADO"
                            style={styles.btn}
                            borderLine={0}
                            textSize={18}
                            textColor={'white'}
                            onPress={() => handleGenerateCertificate()} />
                    )}
                </View>
            </View>
        </CreateCertificateContainer>
    );
};
export default CreateCertificateScreen;

const styles = StyleSheet.create({
    internal:{
        flex: 1,
        //justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
    },
    top:{
        flex:1,
    },
        title:{
            color: "#333333",
            fontSize: 20,
            textAlign: 'center',
            marginTop: 5,
        },
        subTitle:{
            color: "#707070",
            fontSize: 14,
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 30,
        },
        switchesContainer:{
            //marginBottom: 40,
        },
            switchField:{
                marginVertical: 5,
            },
    bottom:{
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 15,
        alignSelf: 'center',
    },
        btn:{
            flex: 1,
            backgroundColor:'#343BA7',
            paddingVertical: 10,
        }
});