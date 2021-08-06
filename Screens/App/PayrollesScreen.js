//Libraries
import React, { useState, useEffect , useContext } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import NavigationTab from '../../Components/NavigationTab';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
//Components
import { AuthContext } from '../../Navigation/AuthProvider';
import FileCard from '../../Components/FileCard';
import FileModal from '../../Components/FileModal';
//Styles
import { PayrollesContainer, ContentContainer, FooterContainer, Card} from '../../Styles/Screens/App/payrolles';
//Images
import img_agregarArchivos from '../../assets/images/img_agregarArchivos.png';
import { CustomAlert } from '../../Utils/CustomAlert';
import { Text, TextBold } from '../../Components/Text';

const PayrollesScreen = ({navigation}) => {
    const { appUser } = useContext(AuthContext);
    const [isFetching, setIsFetching] = useState(true);
    const [storagedFiles, setStoragedFiles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const fetchData = async () => {
        let files = [];
        //Obtiene todos los archivos en el path
        await firebase.storage().ref(appUser.displayName+'/payrolles/').listAll().then((documentSnapshot) => {
            documentSnapshot.items.forEach(function(item) {
                files.push(item);
            });
        }).catch((e) => {
            console.log(e);
            alert(e);
        });
        //Actualiza los datos en la bd de Documentos disponibles y leidos
        await updateDbPayrolles(files.length, files.length);

        setStoragedFiles(files);
        setIsFetching(false);
    }

    const updateDbPayrolles = async (payrollesAvailable, payrollesRead) => {
        let updateObj = {};
        if(!(payrollesAvailable===null))
            updateObj.filePayrollesAvailable = payrollesAvailable;
        if(!(payrollesRead===null))
            updateObj.filePayrollesRead = payrollesRead;

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
    
    if(isFetching){
        fetchData();
        return (<ActivityIndicator style={styles.transferredIcon} size="large" color="#0000ff" />);    
    }

    return (
        <>
        <PayrollesContainer>
            <ContentContainer>
                <SafeAreaView style={{flex: 1,}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        
                        <View style={styles.contentSection}>
                            
                            {(storagedFiles.length <= 0) ? (
                                <View style={styles.uploadContainer}>
                                    <View style={styles.internalCont}>
                                        <Image source={img_agregarArchivos} style={styles.iconImage} />
                                        <TextBold style={styles.boxTitleText}>Vacío</TextBold>
                                        <Text style={styles.boxSubtitleText}>Aún no tienes generado ningún <Text style={styles.boxHighlightedText}>desprendible de nómina</Text>.</Text>
                                    </View>
                                </View>
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
        </PayrollesContainer>
        { (modalVisible) ? (
            <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <FileModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalItem={modalItem}
                    setIsFetching={setIsFetching}
                    allowDelete={false} />
            </View>
        ) : null }
        </>
    );
};
export default PayrollesScreen;

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
});