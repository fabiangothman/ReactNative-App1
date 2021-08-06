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
import { AppStackContext } from '../../Navigation/Logged/AppStackContext';
//Styles
import { DocumentsContainer, ContentContainer, FooterContainer, Card} from '../../Styles/Screens/App/documents';
//Images
import img_agregarArchivos from '../../assets/images/img_agregarArchivos.png';
//Utils
import { takePhotoFromCamera, openImagePickerAsync, openDocumentPickerAsync, extensionIsAllowed } from '../../Utils/FilePicker';
import FileCard from '../../Components/FileCard';
import FileModal from '../../Components/FileModal';
import { CustomAlert } from '../../Utils/CustomAlert';
import { Text, TextBold } from '../../Components/Text';

const DocumentsScreen = ({route, navigation}) => {
    const { appUser } = useContext(AuthContext);
    const { dbUserData, fetchDbUserData } = useContext(AppStackContext);
    
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [storagedFiles, setStoragedFiles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const certsAva = (dbUserData.planeoDB_data.fileCertsAvailable) ? dbUserData.planeoDB_data.fileCertsAvailable : 0;
    const certsRead = (dbUserData.planeoDB_data.fileCertsRead) ? dbUserData.planeoDB_data.fileCertsRead : 0;
    const nomsAva = (dbUserData.planeoDB_data.filePayrollesAvailable) ? dbUserData.planeoDB_data.filePayrollesAvailable : 0;
    const nomsRead = (dbUserData.planeoDB_data.filePayrollesRead) ? dbUserData.planeoDB_data.filePayrollesRead : 0;

    const fetchData = async () => {
        let files = [];
        //Obtiene todos los archivos en el path
        await firebase.storage().ref(appUser.displayName+'/documents/').listAll().then((documentSnapshot) => {
            documentSnapshot.items.forEach(function(item) {
                files.push(item);
            });
        }).catch((e) => {
            console.log(e);
            alert(e);
        });
        //Actualiza los datos en la bd de Documentos disponibles y leidos
        await updateDbDocuments(files.length, files.length);

        setStoragedFiles(files);
        setIsFetching(false);
    }

    const uploadFile = async () => {
        const fileToUpload = await openDocumentPickerAsync();

        if(fileToUpload.type !== 'success')
            return null;
        
        let fileName = fileToUpload.name;
        const extension = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        fileName = name + /*Date.now() +*/ '.' + extension;

        if(!extensionIsAllowed(extension)){
            CustomAlert(
                'No permitido',
                'El archivo que tratas de cargar no está admitido por el momento.');
            return null;
        }
        
        //Inicia la carga del archivo
        setUploading(true);
        setTransferred(0);
        const response = await fetch(fileToUpload.uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref(appUser.displayName+'/documents/').child(fileName);
        const task = ref.put(blob);
        task.on('state_changed', taskSnapshot => {
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred/taskSnapshot.totalBytes*100)
            );
        });

        try{
            await task;
            //const url = await ref.getDownloadURL();
            setUploading(false);
            return true;
        }catch(e){
            setUploading(false);
            console.log(e);alert(e);
            return false;
        }
    }

    const updateDbDocuments = async (docsAvailable, docsRead) => {
        let updateObj = {};
        if(!(docsAvailable===null))
            updateObj.fileDocumentsAvailable = docsAvailable;
        if(!(docsRead===null))
            updateObj.fileDocumentsRead = docsRead;

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

    const uploadFilehandler = async () => {
        if(await uploadFile()){
            if(await updateDbDocuments(firebase.firestore.FieldValue.increment(1), firebase.firestore.FieldValue.increment(1))){
                setIsFetching(true);    //Para recargar la data
            }
        }
    }

    const handleFileOptions = async (item) => {
        setModalVisible(true);
        setModalItem(item);
        //const url = await item.getDownloadURL();
    }

    useEffect(() => {
        if(route.params!==undefined && route.params.openGallery!==undefined && route.params.openGallery===true){
            uploadFilehandler();
            route.params.openGallery = false;
        }
    }/*, []*/); //Para que se ejecute cada vez que se carga la pantalla y no solo una vez con "[]".
    
    if(isFetching){
        fetchData();
        return (<ActivityIndicator style={styles.transferredIcon} size="large" color="#0000ff" />);    
    }

    return (
        <>
        <DocumentsContainer>
            <ContentContainer>
                <SafeAreaView style={{flex: 1,}}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={styles.slideBoxContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Card onPress={() => navigation.navigate("Certificates")} >
                                    <FeatureCard
                                        title="Mis Certificados"
                                        bgColor={'#46D3E6'}
                                        preLoadedImageName="iconCertificados.png"
                                        cardWidth={230}
                                        cardHeight={150}
                                        filesNumber={certsAva}
                                        notificationsNumber={certsAva - certsRead} />
                                </Card>
                                <Card onPress={() => navigation.navigate("Payrolles")} >
                                    <FeatureCard
                                        title="Desprendibles de nómina"
                                        bgColor={'#FAB74D'}
                                        preLoadedImageName="iconNomina.png"
                                        cardWidth={230}
                                        cardHeight={150}
                                        filesNumber={nomsAva}
                                        notificationsNumber={nomsAva - nomsRead} />
                                </Card>
                            </ScrollView>
                        </View>
                        
                        <View style={styles.contentSection}>
                            {uploading ? (
                                <View style={styles.statusBar}>
                                    <ActivityIndicator style={styles.transferredIcon} size="small" color="#0000ff" />
                                    <Text style={styles.transferredMessage}>{transferred}% completado.</Text>
                                </View>
                            ): null }
                            
                            {(storagedFiles.length <= 0) ? (
                                <TouchableOpacity style={styles.uploadContainer}
                                    onPress={() => uploadFilehandler()}>
                                    <View style={styles.internalCont}>
                                        <Image source={img_agregarArchivos} style={styles.iconImage} />
                                        <TextBold style={styles.boxTitleText}>Agregar archivos</TextBold>
                                        <Text style={styles.boxSubtitleText}>Puedes <Text style={styles.boxHighlightedText}>subir tus archivos</Text> o <Text style={styles.boxHighlightedText}>crear nuevas carpetas</Text>.</Text>
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
                    pressSubir={() => uploadFilehandler()}
                    pressBuscar={() => CustomAlert(
                        'Mantente atento',
                        'Esta funcionalidad estará disponible pronto.')}
                    pressEnvio={() => CustomAlert(
                        'Mantente atento',
                        'Esta funcionalidad estará disponible pronto.')}
                />
            </FooterContainer>
        </DocumentsContainer>
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
export default DocumentsScreen;

const styles = StyleSheet.create({
    slideBoxContainer:{},
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
});