//Libraries
import React, { useState, useEffect , useContext } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import Animated from 'react-native-reanimated';
import FeatureCard from '../../Components/FeatureCard';
import NavigationTab from '../../Components/NavigationTab';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
//Components
import { AuthContext } from '../../Navigation/AuthProvider';
//Styles
import { CertificatesContainer, ContentContainer, FooterContainer, Card} from '../../Styles/Screens/App/certificates';
//Images
import img_agregarArchivos from '../../assets/images/img_agregarArchivos.png';
//Utils
import { takePhotoFromCamera, openImagePickerAsync, openDocumentPickerAsync, extensionIsAllowed } from '../../Utils/FilePicker'
import FileCard from '../../Components/FileCard';
import FileModal from '../../Components/FileModal';
import { FormButtonAuto } from '../../Components/FormButton';
import { CustomAlert } from '../../Utils/CustomAlert';
import { Text, TextBold } from '../../Components/Text';

const CertificatesScreen = ({route, navigation}) => {
    const { appUser } = useContext(AuthContext);

    const [isFetching, setIsFetching] = useState(true);
    const [storagedFiles, setStoragedFiles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const fetchData = async () => {
        let files = [];
        //Obtiene todos los archivos en el path
        await firebase.storage().ref(appUser.displayName+'/certificates/').listAll().then((documentSnapshot) => {
            documentSnapshot.items.forEach(function(item) {
                files.push(item);
            });
        }).catch((e) => {
            console.log(e);
            alert(e);
        });
        //Actualiza los datos en la bd de Documentos disponibles y leidos
        await updateDbCertificates(files.length, files.length);

        setStoragedFiles(files);
        setIsFetching(false);
    }

    const updateDbCertificates = async (certsAvailable, certsRead) => {
        let updateObj = {};
        if(!(certsAvailable===null))
            updateObj.fileCertsAvailable = certsAvailable;
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

    const uploadDocumenthandler = async () => {
        navigation.navigate("Documents", {openGallery: true})
    }

    const handleFileOptions = async (item) => {
        setModalVisible(true);
        setModalItem(item);
        //const url = await item.getDownloadURL();
    }    

    useEffect(() => {
        if(route.params && route.params.fetchCerts){
            route.params.fetchCerts = false;
            fetchData();
        }
    }/*, []*/); //Para que se ejecute cada vez que se carga la pantalla y no solo una vez con "[]".
    
    if(isFetching){
        fetchData();
        return (<ActivityIndicator style={styles.transferredIcon} size="large" color="#0000ff" />);    
    }

    return (
        <>
        <CertificatesContainer>
            <ContentContainer>
                <SafeAreaView style={{flex: 1,}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        
                        <View style={styles.contentSection}>
                            
                            {(storagedFiles.length <= 0) ? (
                                <TouchableOpacity style={styles.uploadContainer}
                                    onPress={() => navigation.navigate("CreateCertificate")}>
                                    <View style={styles.internalCont}>
                                        <Image source={img_agregarArchivos} style={styles.iconImage} />
                                        <TextBold style={styles.boxTitleText}>Aún no tienes certificados</TextBold>
                                        <Text style={styles.boxSubtitleText}>Puedes <Text style={styles.boxHighlightedText}>generar un nuevo certificado</Text>.</Text>
                                        <FormButtonAuto
                                            buttonTitle="GENERAR CERTIFICADO"
                                            style={styles.formButtonAuto}
                                            borderLine={0}
                                            textSize={18}
                                            textColor={'white'}
                                            onPress={() => navigation.navigate("CreateCertificate")} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.filesContainer}>
                                    {storagedFiles.map((fileItem, key) => {
                                        return (
                                            <View style={styles.card} key={key}>
                                                <FileCard
                                                    item={fileItem}
                                                    onPress={() => handleFileOptions(fileItem)} />
                                            </View>
                                        );
                                    })}
                                </View>
                            )}
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </ContentContainer>

            <FooterContainer>
                <NavigationTab
                    pressCertificado={() => navigation.navigate("CreateCertificate")}
                    pressCarpeta={() => CustomAlert(
                        'Mantente atento',
                        'Esta funcionalidad estará disponible pronto.')}
                    pressSubir={() => uploadDocumenthandler()}
                    pressBuscar={() => CustomAlert(
                        'Mantente atento',
                        'Esta funcionalidad estará disponible pronto.')}
                    pressEnvio={() => CustomAlert(
                        'Mantente atento',
                        'Esta funcionalidad estará disponible pronto.')}
                />
            </FooterContainer>
        </CertificatesContainer>
        { (modalVisible) ? (
            <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <FileModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalItem={modalItem}
                    setIsFetching={setIsFetching}
                    allowDelete={true} />
            </View>
        ) : null }
        </>
    );
};
export default CertificatesScreen;

const styles = StyleSheet.create({
    contentSection:{
        marginVertical: 25,
        width:'100%',
        flex: 1,
    },
        statusBar:{
            flexDirection: 'row',
            marginBottom: 20,
        },
            transferredIcon:{
                flexDirection: 'column',
            },
            transferredMessage:{
                flexDirection: 'column',
                flex:1,
            },
            
    filesContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
        card:{
            margin: 10,
            flexDirection: 'column',
            //justifyContent: 'center',            
        },
    uploadContainer:{
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
        internalCont:{
            width: '100%',
            maxWidth: 300,
        },
        iconImage:{
            height: 79,
            width: '100%',
            aspectRatio: 1,
            resizeMode: 'contain',
            alignSelf: 'center',
        },
        boxTitleText:{
            color: '#343BA7',
            fontSize: 18,
            textAlign: 'center',
        },
        boxSubtitleText:{
            color: '#707070',
            fontSize: 15,
            textAlign: 'center',
        },
        boxHighlightedText:{
            color: '#379AF4',
            textDecorationLine: 'underline'
        },
    formButtonAuto: {
        marginTop: 25,
        backgroundColor: '#343BA7',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});