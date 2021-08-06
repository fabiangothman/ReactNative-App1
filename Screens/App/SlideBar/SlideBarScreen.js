//Libraries
import React, { useState, useContext } from 'react';
import { Image, ScrollView, StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//Components
import { FormButtonFull, FormButtonAuto } from '../../../Components/FormButton';
//Navigation
import { AuthContext } from '../../../Navigation/AuthProvider';
//Styles
import { SlideBarContainer } from '../../../Styles/Screens/App/SlideBar/slideBar';
//Images
import UserImage from '../../../assets/images/user-icon.png';
import HeaderEquiz from '../../../Components/HeaderEquiz';
import { CustomAlert } from '../../../Utils/CustomAlert';
import { TextBold, Text } from '../../../Components/Text';


const SlideBarScreen = ({navigation, planeoDB_data}) => {

    const { logout } = useContext(AuthContext);

    return (
        <SlideBarContainer>
            <View style={styles.internal}>
                <View style={styles.top}>
                    <SafeAreaView>
                        <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                            <HeaderEquiz
                                onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
                            <Image source={UserImage} style={styles.userImage} />
                            <TextBold style={styles.userName}>{(planeoDB_data.names) ? planeoDB_data.names : ""}</TextBold>

                            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                <View style={styles.optionContainer}>
                                    <FontAwesome5 style={styles.optionIcon} name={"tools"} size={26} color={"#379AF4"} />
                                    <Text style={styles.optionText}>Configurar cuenta</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => CustomAlert(
                                'Mantente atento',
                                'Esta funcionalidad estará disponible pronto.')}>
                                <View style={styles.optionContainer}>
                                    <FontAwesome5 style={styles.optionIcon} name={"key"} size={26} color={"#379AF4"} />
                                    <Text style={styles.optionText}>Permisos de privacidad</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => CustomAlert(
                                'Mantente atento',
                                'Esta funcionalidad estará disponible pronto.')}>
                                <View style={styles.optionContainer}>
                                    <FontAwesome5 style={styles.optionIcon} name={"briefcase"} size={26} color={"#379AF4"} />
                                    <Text style={styles.optionText}>Mis empresas</Text>
                                </View>
                            </TouchableOpacity>
                            
                        </ScrollView>
                    </SafeAreaView>
                </View>
                <View style={styles.bottom}>
                    <FormButtonFull
                        buttonTitle="CERRAR SESIÓN"
                        style={styles.btn}
                        borderLine={0}
                        textSize={18}
                        textColor={'white'}
                        onPress={() => logout()} />
                </View>
            </View>
        </SlideBarContainer>
    );
};
export default SlideBarScreen;

const styles = StyleSheet.create({
    internal:{
        flex: 1,
    },
    top:{
        flex:1,
    },
        userImage:{
            width: '100%',
            height: 170,
            alignSelf: 'center',
            aspectRatio: 1,
            resizeMode: 'contain',
        },
        userName:{
            color: '#343BA7',
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 30,
        },
        optionContainer:{
            flexDirection: 'row',
            borderColor: 'transparent',
            borderBottomColor: '#19191933',
            borderBottomWidth: 1,
            marginVertical: 7,
            paddingVertical: 5,
            paddingHorizontal: 2,
        },
            optionIcon:{
                marginLeft: 5,
                marginRight: 20,
            },
            optionText:{
                alignSelf: 'center',
                color: '#707070',
                fontSize: 17,
            },
    bottom:{
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 15,
    },
        btn:{
            flex: 1,
            backgroundColor:'#343BA7',
            paddingVertical: 10,
            paddingHorizontal: 5,
        }
});