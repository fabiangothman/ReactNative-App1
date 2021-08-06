//Libraries
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, TextBold } from './Text';

/*  Returned metadata example:
        "bucket": "planeoie.appspot.com",
        "cacheControl": undefined,
        "contentDisposition": "inline; filename*=utf-8''Fabi%C3%A1n%20Murillo%20-%20CV.pdf",
        "contentEncoding": "identity",
        "contentLanguage": undefined,
        "contentType": "application/pdf",
        "customMetadata": undefined,
        "extension": "pdf",
        "fullPath": "eksLsTXi8YVih62f6XQ1GaKYiWq2/documents/Fabián Murillo - CV.pdf",
        "generation": "1620421255761507",
        "md5Hash": "Tn0qfIMnpbClyVoL30buug==",
        "metageneration": "1",
        "name": "Fabián Murillo - CV",
        "size": 78784,
        "timeCreated": "2021-05-07T21:00:55.859Z",
        "type": "file",
        "updated": "2021-05-07T21:00:55.859Z",
*/
const FileCard = ({item, ...props}) => {
    const [isFetching, setIsFetching] = useState(true);
    const [metadata, setMetadata] = useState({});

    const iconsExtension = [
        {type: 'pdf', image: 'file-pdf', color: '#e05555'},
        {type: 'jpg', image: 'file-image', color: '#46D3E6'},
        {type: 'jpeg', image: 'file-image', color: '#46D3E6'},
        {type: 'png', image: 'file-image', color: '#46D3E6'},
        {type: 'default', image: 'file', color: '#7dbdf8'},
    ];

    const getFileMetadata = async () => {
        await item.getMetadata().then((metadata) => {
            metadata.extension = metadata.name.split('.').pop();
            metadata.name = metadata.name.split('.').shift();//.substring(0, 20);
            metadata.updated = new Date(metadata.updated).toLocaleDateString();
            setIsFetching(false);
            setMetadata(metadata);
        }).catch((e) => {
            console.log(e);
            alert(e);
        });
    }

    if(isFetching){
        getFileMetadata();
        return (<ActivityIndicator style={styles.transferredIcon} size="small" color="#0000ff" />);    
    }
    let fileIcon = iconsExtension.find(element => element.type == metadata.extension);
    fileIcon = (fileIcon===undefined) ? iconsExtension[iconsExtension.length-1] : fileIcon;
    //console.log(metadata);
    return(
        <View style={styles.cardContainer}>
            <View style={styles.supCont}>
                <View style={styles.supData}>
                    <FontAwesome5 style={styles.icon} name={fileIcon.image} size={50} color={fileIcon.color} />
                    <Text style={styles.fileName}>{metadata.name}.{metadata.extension}</Text>
                </View>
            </View>
            <View style={styles.infCont}>
                <View style={styles.contExtrainfo}>
                    <Text style={styles.infText}>{metadata.updated}</Text>
                    <TouchableOpacity style={styles.btnExpand} {...props}>
                        <Ionicons style={styles.icon} name={"ellipsis-vertical"} size={18} color={'#707070'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default FileCard;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 8,
        width: 144,
        //height: 147,
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
    },
    supCont:{
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        flex: 1,
    },
        supData:{
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
        },
            icon:{
                alignSelf: 'center',
            },
            fileName:{
                alignSelf: 'center',
                fontSize: 13,
            },
    infCont:{
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1,
        paddingVertical: 5,
        paddingLeft:10,
        paddingRight: 0,
        flexDirection: 'row',
    },
        contExtrainfo:{
            flexDirection: 'row',
            flex: 1,
        },
            infText:{
                flexDirection: 'column',
                fontSize: 10,
                flex: 1,
                alignSelf: 'center',
            },
            btnExpand:{
                flexDirection: 'column',
                paddingHorizontal: 5,
                paddingVertical:5,
            },
});