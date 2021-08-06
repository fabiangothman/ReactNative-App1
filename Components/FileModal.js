//Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Alert, Linking, Platform, ActivityIndicator } from 'react-native';
import FileOptionsButton from './FileOptionsButton';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";
import { CustomAlert } from '../Utils/CustomAlert';
import { Text, TextBold } from './Text';

const FileModal = ({modalVisible, setModalVisible, modalItem, setIsFetching, allowDelete, ...props}) => {
    const [sharing, setSharing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [downloading, setDownloading] = useState(false);
    allowDelete = (allowDelete!=undefined) ? allowDelete : true;

    const downloadFile = async () => {
        /*  https://github.com/joltup/rn-fetch-blob#android-media-scanner-and-download-manager-support
            https://github.com/vinzscam/react-native-file-viewer    */
        setDownloading(true);
        const url = await modalItem.getDownloadURL();

        if(Platform.OS == 'web')
            window.open(url, '_blank');
        else
            Linking.openURL(url);
        setDownloading(false);
    }

    const shareFile = async () => {        
        setSharing(true);
        const url = await modalItem.getDownloadURL();

        if(Platform.OS === 'web'){
            await Sharing.shareAsync(url);
            setSharing(false);
            return;
        }
        
        await modalItem.getMetadata().then((metadata) => {
            metadata.name = metadata.name.replace(/\s/g, '');   //Remove spaces (conflict on iOS)
            FileSystem.downloadAsync(url, FileSystem.documentDirectory + metadata.name )
            .then(({ uri }) => {
                Sharing.shareAsync(uri).then(() => {
                    setSharing(false);
                });
            })
            .catch(e => {
                console.error(e);
                alert(e);
                setSharing(false);
            });
        }).catch((e) => {
            console.log(e);
            alert(e);
            setSharing(false);
        });
    }

    const deleteFile = async () => {
        if(allowDelete){
            setDeleting(true);
            modalItem.delete()
            .then(() => {
                setDeleting(false);
                setModalVisible(false);
                setIsFetching(true);
            })
            .catch((e) => {
                console.log(e);
                alert(e);
                setDeleting(false);
            });
        }else{
            CustomAlert("No permitido", "Por el momento no tienes permitido eliminar este archivo.");
        }        
    };

    useEffect(() => {
        //setModalVisible(true);
    }, [setModalVisible, setIsFetching]);
    
    return (modalVisible) ? (
        <Modal {...props} animationType="slide" style={{flex: 1}}
            transparent={true}
            visible={true} >
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.topCont} />
                <View style={styles.bottomCont}>
                    <View style={styles.contentContainer}>
                        <TextBold style={styles.titleText}>Acciones</TextBold>

                        <View style={styles.btnCont}>
                            <FileOptionsButton
                                btnIcon="edit"
                                btnText="Renombrar"
                                onPress={() => CustomAlert(
                                    'Mantente atento',
                                    'Esta funcionalidad estará disponible pronto.')} />
                        </View>
                        <View style={styles.btnCont}>
                            <FileOptionsButton
                                btnIcon="share-square"
                                btnText="Mover a"
                                onPress={() => CustomAlert(
                                    'Mantente atento',
                                    'Esta funcionalidad estará disponible pronto.')} />
                        </View>
                        <View style={styles.btnCont}>
                            {(sharing) ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <FileOptionsButton
                                    btnIcon="share-alt"
                                    btnText="Compartir"
                                    onPress={() => shareFile()} />
                            ) }
                        </View>
                        <View style={styles.btnCont}>
                            <FileOptionsButton
                                btnIcon="info"
                                btnText="Detalle"
                                onPress={() => CustomAlert(
                                    'Mantente atento',
                                    'Esta funcionalidad estará disponible pronto.')} />
                        </View>
                        <View style={styles.btnCont}>
                            {(downloading) ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <FileOptionsButton
                                    btnIcon="download"
                                    btnText="Descargar"
                                    onPress={() => downloadFile()} />
                            )}
                        </View>
                        <View style={styles.btnCont}>
                            {(deleting) ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <FileOptionsButton
                                    btnIcon="trash-alt"
                                    btnText="Eliminar"
                                    onPress={() => deleteFile()} />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    ) : null;
};
export default FileModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    topCont: {
        flexDirection: "row",
        flex: 1
    },
    bottomCont: {
        flexDirection: "row",
    },
    contentContainer:{
        //flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 40,
    },
        titleText:{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            marginBottom: 15,
        },
        btnCont:{
            marginVertical: 5,
        },
});