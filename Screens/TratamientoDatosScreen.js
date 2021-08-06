//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
//Components
import GeneralBase from '../Components/GeneralBase';
import HeaderCentered from '../Components/HeaderCentered';
//Styles
import { TratamientoContainer,
    SupContainer,
    InfContainer,
    SubTitleText,
    TitleText,
    NormalText,
    LinkText } from '../Styles/Screens/tratamientoDatos';

const TratamientoDatosScreen = ({ navigation, route }) => {
    const screenBack = (route.params.screenBack) ? route.params.screenBack : "Signup";
    const routeParams = (route.params.routeParams) ? route.params.routeParams : null;

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop="auto">
            <TratamientoContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Política de tratamiento de datos"
                            txtColor="white"
                            iconColor="white"
                            bgColor="transparent"
                            onPress={() => navigation.navigate(screenBack, {routeParams: routeParams})} />
                    </View>
                </SupContainer>

                <InfContainer>
                    <SafeAreaView style={{width: '100%'}}>
                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >

                        <View style={{marginBottom:20,}}>
                                <SubTitleText>AUTORIZACIÓN DATOS PERSONALES</SubTitleText>
                                <NormalText>
                                    Al hacer click en el espacio de autorización de uso de datos personales, y registrar sus datos personales en este portal, usted manifiesta de manera expresa e inequívoca que es el legítimo Titular de la información proporcionada y que la misma es veraz, completa, exacta, actualizada y verificable.
                                </NormalText>
                                <NormalText>
                                    Del mismo modo, declara de manera libre, expresa, inequívoca e informada, que AUTORIZA al Mareigua S.A.S.  (en adelante “Planeo”), sociedad legalmente constituida bajo las leyes de la República de Colombia, con domicilio en la Calle 98 No. 22-64 Oficina 1016  en la ciudad de Bogotá D.C., Colombia, identificada con el NIT 800.167.353-4, para que, en los términos de la Ley 1581 de 2012 y su Decreto Reglamentario 1377 de 2013, realice la recolección, almacenamiento, depuración, uso, circulación, actualización, supresión, cruce con información propia y/o de terceros autorizados y en general, el tratamiento de sus datos personales y de contacto, para que dicho tratamiento se realice con el propósito de lograr las siguientes finalidades:
                                </NormalText>

                                <SubTitleText>Finalidades Generales:</SubTitleText>
                                <View style={{marginLeft:10,}}>
                                    <NormalText>· Para el envío de información a sus empleados, proveedores, terceros y usuarios de su plataforma.</NormalText>
                                    <NormalText>· Ejecutar la relación contractual existente con sus empleados, proveedores, terceros y usuarios de su plataforma;</NormalText>
                                    <NormalText>· Proveer los servicios y/o los productos requeridos por sus usuarios;</NormalText>
                                    <NormalText>· Informar sobre nuevos productos o servicios y/o sobre cambios en los mismos;</NormalText>
                                    <NormalText>· Desarrollar el proceso de selección, evaluación, y vinculación laboral;</NormalText>
                                    <NormalText>· Para la verificación de saldos de sus acreedores;</NormalText>
                                    <NormalText>· Registrar la información de sus empleados, proveedores, terceros y usuarios de su plataforma y el registro de base de datos de cada uno.</NormalText>
                                    <NormalText>· Los indicados en la autorización otorgada por el Titular del dato o descritos en el aviso de privacidad respectivo, según sea el caso;</NormalText>
                                    <NormalText>· Envío de información a entidades gubernamentales o judiciales por solicitud expresa de la misma.</NormalText>
                                    <NormalText>· Soporte en procesos de auditoría externa/interna.</NormalText>
                                    <NormalText>· Con propósitos de seguridad o prevención de fraude.</NormalText>
                                    <NormalText>· Envío, recepción de mensajes de texto, correos electrónicos y/o otros con fines comunicativos, publicitarios y/o de atención al cliente, con el fin de mantener un contacto personalizado con nuestros usuarios.</NormalText>
                                    <NormalText>· Reportar a los bancos de datos, directamente o por intermedio de las autoridades, los datos tratados o sin tratar, y la información financiera pertinente.</NormalText>
                                    <NormalText>· Realizar invitaciones a eventos y ofrecer nuevos productos y servicios.</NormalText>
                                    <NormalText>· Gestionar trámites (solicitudes, quejas, reclamos)</NormalText>
                                </View>

                                <SubTitleText>Finalidades para usuarios:</SubTitleText>
                                <View style={{marginLeft: 10,}}>
                                    <NormalText>· Manejo de la facturación y recaudo de cartera.</NormalText>
                                    <NormalText>· Transferencia a terceros que puedan tener productos de interés.</NormalText>
                                    <NormalText>· Organización para los fines de la plataforma.</NormalText>
                                    <NormalText>· Para la consulta de información del Usuario en centrales de información financiera o burós de crédito.</NormalText>
                                    <NormalText>· Para la consulta de información del Usuario en entidades operadoras de información que administren información laboral, financiera y de seguridad social de empleados y/o empleadores.</NormalText>
                                    <NormalText>· Para la Consulta de información sobre los aportes y saldos del Usuario a fondos de pensiones y/o cesantías.</NormalText>
                                </View>
                                <View style={{marginLeft: 10,}}>
                                    <NormalText>Como titular de la información, usted declara que se le ha informado de manera clara y comprensible que tiene derecho a conocer, actualizar y rectificar los datos personales proporcionados, a solicitar prueba de esta autorización, a solicitar información sobre el uso que se le ha dado a sus datos personales, a revocar ésta autorización o solicitar la supresión de los datos personales suministrados y a acceder de forma gratuita a los mismos.</NormalText>
                                    <NormalText>Manifiesta que se la ha informado que, en caso de recolección de su información sensible, tiene derecho a contestar o no las preguntas que se le formulen y a entregar o no los datos solicitados.</NormalText>
                                    <NormalText>Entiende que son datos sensibles aquellos que afectan la intimidad del Titular o cuyo uso indebido puede generar discriminación (Por ejemplo, orientación política, convicciones religiosas o filosóficas, datos relativos a la salud, a la vida sexual y los datos biométricos, tales como mi firma y fotos).</NormalText>
                                    <NormalText>Al hacer click en el espacio de autorización de uso de datos personales y autorizar el uso de sus datos personales, manifiesta así mismo que reconoce y acepta que cualquier consulta o reclamación relacionada con el Tratamiento de sus datos personales podrá ser elevada verbalmente o por escrito ante Planeo para lo cual este ha habilitado los siguientes medios:</NormalText>
                                    <View style={{marginLeft: 10,}}>
                                        <NormalText>· Correo electrónico a: habeasdata@mareigua.com</NormalText>
                                        <NormalText>· Enviando la solicitud por medio físico a la dirección Calle 98 No. 22-64 Oficina 1016</NormalText>
                                    </View>
                                </View>

                                <NormalText>El Área de Servicios Compartidos será la encargada de atender y dar respuesta a las peticiones, consultas y reclamos respecto de los datos personales de los Titulares.</NormalText>

                                <TouchableOpacity onPress={() => { Linking.openURL('https://www.mareigua.co/es/terms/terminos-y-condiciones/') }} style={{marginTop:20,}}>
                                    <LinkText>POLÍTICA DE TRATAMIENTO DE DATOS</LinkText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { Linking.openURL('https://www.mareigua.co/es/terms/terminos-y-condiciones/#privacidad') }} style={{marginTop:20,}}>
                                    <LinkText>AVISO DE PRIVACIDAD</LinkText>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </SafeAreaView>
                </InfContainer>

            </TratamientoContainer>
        </GeneralBase>
    );
};
export default TratamientoDatosScreen;

const styles = StyleSheet.create({
    headerCont: {
        flexDirection: 'column',
        flex:1,
        marginTop: 20,
    },
    headerSubtitle: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        marginVertical: 5,
    },
    headerSalary: {
        color: '#27DEBF',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    cardContainer:{
        marginVertical: 30,
        alignItems: 'center',
    },
        textCard:{
            color:"#343BA7",
            fontSize:15,
            marginRight: 10,
        },
    });