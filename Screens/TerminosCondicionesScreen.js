//Libraries
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
//Components
import GeneralBase from '../Components/GeneralBase';
import HeaderCentered from '../Components/HeaderCentered';
//Styles
import { TerminosContainer,
    SupContainer,
    InfContainer,
    SubTitleText,
    TitleText,
    NormalText,
    LinkText } from '../Styles/Screens/terminosCondiciones';

const TerminosCondicionesScreen = ({ navigation, route }) => {
    const screenBack = (route.params.screenBack) ? route.params.screenBack : "Signup";
    const routeParams = (route.params.routeParams) ? route.params.routeParams : null;

    return (
        <GeneralBase backgroundColor={'#343BA7'} loadBgImage={true} marginTop="auto">
            <TerminosContainer>
                <SupContainer>
                    <View style={styles.headerCont}>
                        <HeaderCentered
                            title="Términos y condiciones"
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

                                <SubTitleText>TÉRMINOS Y CONDICIONES</SubTitleText>
                                <NormalText>Mareigua S.A.S (en adelante “Planeo”) sociedad legalmente constituida bajo las leyes de la República de Colombia, identificada con NIT. # 800.167.353-4, domiciliada en la ciudad de Bogotá D.C., y con dirección Calle 98 No. 22-64 Oficina 1016.</NormalText>

                                <SubTitleText>Naturaleza Jurídica</SubTitleText>
                                <NormalText>Los presentes términos y condiciones de uso regulan la relación contractual de carácter comercial que une a los usuarios que acceden a la Plataforma Virtual y a Planeo.</NormalText>
                                
                                <SubTitleText>Deficiones</SubTitleText>
                                <View style={{marginLeft:10,}}>
                                    <NormalText>· Cookies: Cadenas de texto enviadas virtualmente que son almacenadas por Planeo por el uso de la Plataforma Virtual Planeo, para la consulta de las actividades y preferencias de los usuarios.</NormalText>
                                    <NormalText>· Datos personales: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables tal como se define en la Ley 1581 de 2012 y sus normas complementarias o como se defina en las normas que lo reemplacen.</NormalText>
                                    <NormalText>· Mayor de edad: Persona natural mayor de dieciocho (18) años.</NormalText>
                                    <NormalText>· Mensajes de datos: La información generada, enviada, recibida, almacenada o comunicada por medios electrónicos, ópticos o similares, como pudieran ser, entre otros, el Intercambio Electrónico de Datos (EDI), Internet, el correo electrónico, el telegrama, el télex o el telefax (Ley 527 de 1999 art. 2 lit. a).</NormalText>
                                    <NormalText>· Plataforma Virtual o Plataforma: Aplicativo web y móvil administrado por Planeo.</NormalText>
                                    <NormalText>· Producto: Bien de consumo exhibido a través de la Plataforma.</NormalText>
                                    <NormalText>· Publicidad: Es toda forma de comunicación realizada por Planeo, con el fin de brindar información sobre productos, actividades comerciales y comunicar estrategias o campañas publicitarias o de mercadeo, propias o de terceros.</NormalText>
                                    <NormalText>· Servicio: Servicios exhibidos a través de la Plataforma.</NormalText>
                                    <NormalText>· Usuario: Toda persona natural que, como destinatario final, use la Plataforma Virtual para incluir su información financiera, verificar recomendaciones o con el fin de adquirir los servicios que se ofrecen en la misma.</NormalText>
                                </View>
                                

                                <SubTitleText>Objeto</SubTitleText>
                                <NormalText>Los presentes términos y condiciones regulan la autorización de uso que otorga Planeo a los usuarios, para que éstos ingresen a la plataforma virtual, incluyan su información personal financiera, usen los aplicativos de sugerencias y puedan solicitar los servicios adicionales ofrecidos.</NormalText>
                                <NormalText>Planeo, a través de la Plataforma, realiza las siguientes acciones: i) permite el uso de ciertas herramientas de planeación financiera, ii) recopila la información financiera en la aplicación para visibilidad del Usuario, iii) sujeto a la autorización de Usuario, comparte la información financiera con terceros, iv) sirve de medio de envío de comunicaciones entre los Usuarios y terceros que ofrecen Productos y Servicios, y v) ofrece Servicios al Usuario.</NormalText>

                                <SubTitleText>Condiciones de Uso</SubTitleText>
                                <NormalText>Estas Condiciones del Usuario serán aplicables a su visita y a su uso del sitio web en www.planeo.mareigua.co (el «Sitio web») y la aplicación Planeo, que se puede descargar en dispositivos móviles por medio de tiendas virtuales de aplicaciones de Apple (App Store) y de Google (Google Play) (la “Aplicación”).</NormalText>
                                <NormalText>Por favor, lea estas Condiciones del Usuario detenidamente antes de acceder al Sitio web o de descargar la Aplicación. Al acceder al Sitio web, descargar la Aplicación, instalarla, utilizarla o utilizar el Servicio, usted acepta estas condiciones de uso y se obliga a cumplirlas. En caso de que usted no esté de acuerdo con lo aquí consignado, por favor, no acceda al Sitio web ni descargue la Aplicación ni use el Servicio.</NormalText>
                                <NormalText>El Sitio web y la Aplicación son operados por Planeo, con domicilio en Bogotá, Colombia.</NormalText>

                                <SubTitleText>¿Qué servicios presta Planeo?</SubTitleText>
                                <NormalText>Planeo ofrece, a través de la página Web y de la Aplicación, un servicio de recopilación de información financiera de los Usuarios. La Plataforma Virtual, de igual forma, presenta ciertos resultados y recomendaciones las cuales son únicamente recomendaciones de la Plataforma y que cada Usuario debe considerar de acuerdo con su propia planeación financiera, tributaria y comercial. Planeo no asegura ningún resultado en relación con las medidas recomendadas.</NormalText>
                                <NormalText>Adicionalmente, la Plataforma Virtual permite Publicidad y ofrecimiento de Productos y Servicios de terceros. Finalmente, Planeo permite la comunicación de Usuarios con terceros y ofrece ciertos Servicios para que los Usuarios puedan determinar si alguno de ellos es de su interés.</NormalText>
                                <NormalText>Entre Planeo y los Usuarios y entre Planeo y los terceros no existe relación laboral ni subordinación o dependencia de ningún tipo. Mediante el sistema, Planeo permite que el Usuario se registre, verifique su situación financiera y tome de forma autónoma las decisiones que considere pertinentes.</NormalText>
                                
                                <SubTitleText>Contrato entre Usuario y Planeo</SubTitleText>
                                <NormalText>Al utilizar la Aplicación o el Servicio, se entenderá que el Usuario celebra un contrato con Planeo (el «Contrato»). Para poder utilizar la Aplicación o el Servicio, en primer lugar, deberá registrarse en Planeo.</NormalText>
                                <NormalText>El usuario declara tener 18 años o más para usar el Servicio o la Aplicación. Si reside en una jurisdicción que restringe el uso del Servicio o la Aplicación por motivos de edad o restringe la capacidad de suscribir contratos como el presente por motivos de edad, deberá respetar estos límites de edad y abstenerse de utilizar el Servicio y la Aplicación.</NormalText>
                                <NormalText>El usuario declara que, de ser una persona natural, es mayor de edad para formalizar un contrato vinculante o que si se registra en nombre de una persona jurídica está autorizado para formalizar y vincular a la misma a estas Condiciones del Usuario y registrarse para el Servicio y la Aplicación.</NormalText>

                                <SubTitleText>Registro</SubTitleText>
                                <NormalText>Para poder utilizar los Servicios de la Plataforma Virtual, cada Usuario deberá registrarse como usuario. Al registrarse, estará obligado a facilitar a Planeo su correo electrónico, su información personal, información de su documento de identidad personal, su número de teléfono, y todos los datos adicionales requeridos para llenar el formulario. Tras terminar adecuadamente el registro, Planeo le facilitará una cuenta personal a la que podrá acceder con la contraseña que elija. El registro se someterá a estas condiciones:</NormalText>
                                <View style={{marginLeft:10,}}>
                                    <NormalText>1. El usuario deberá garantizar que la información proporcionada a Planeo es precisa y completa. Planeo no tiene la obligación de supervisar o controlar la información, pero tendrá derecho, en todo momento, a comprobar la información facilitada y a denegar el Servicio o el uso de la Aplicación o de la página Web, sin explicar sus motivos y sin que ello otorgue al Usuario derecho alguno a indemnización o compensación.</NormalText>
                                    <NormalText>2. Solo las personas que tienen la capacidad legal necesaria para obligarse de acuerdo con los presentes términos están autorizadas para hacer uso del Servicio prestado por Planeo. Las personas que no cuenten con esta capacidad, entre ellos los menores de edad, deben ser asistidas por sus representantes legales.</NormalText>
                                    <NormalText>3. Planeo puede rehusarse o cancelar la cuenta del Usuario en cualquier momento, ya sea por quejas o por políticas internas.</NormalText>
                                    <NormalText>4. Planeo se reserva el derecho de usar cualquier acción legal posible para identificar a los usuarios, así como requerir, en cualquier momento, documentación extra que se considere apropiada para verificar la información personal del Usuario.</NormalText>
                                    <NormalText>5. Planeo no se responsabiliza por cualquier daño como resultado de la pérdida o mal uso de la clave por parte de terceros. El Usuario es el único responsable por ello.</NormalText>
                                    <NormalText>6. No se puede transferir por ningún motivo, el registro del Usuario a terceras personas.</NormalText>
                                </View>
                                
                                <SubTitleText>¿Cómo usar la app?</SubTitleText>
                                <NormalText>La Plataforma Virtual le permitirá al Usuario incluir su información financiera.</NormalText>
                                <NormalText>La Plataforma organizará su información de acuerdo con la estructura de información personal financiera definida por Planeo en la Aplicación.</NormalText>
                                <NormalText>Los resultados de la información ingresada permitirán el ofrecimiento de ciertas alternativas recomendadas que, en cualquier caso, cada Usuario debe revisar y confirmar de acuerdo con sus estrategias financieras, tributarias y comerciales. Las sugerencias de Planeo son basadas en la información registrada y son generales, por lo cual, cada Usuario es responsable de su uso, liberando de toda responsabilidad a Planeo por cualquier pérdida o daño sufrido con base en las recomendaciones proveídas a través de la Plataforma Virtual.</NormalText>
                                <NormalText>Planeo hará cuanto sea posible razonablemente para ponerle en contacto con terceros que presten servicios que puedan ser del interés del Usuario.</NormalText>
                                <NormalText>Solo podrá acceder al servicio utilizando medios autorizados. Es responsabilidad del Usuario asegurarse de que descarga la Aplicación correcta para su dispositivo. Planeo no será responsable si no tiene un dispositivo móvil compatible o si descarga la versión errónea de la Aplicación para su dispositivo móvil. Planeo se reserva el derecho a finalizar el servicio y el uso de la Aplicación en caso de que utilice la Aplicación con un dispositivo incompatible o no autorizado.</NormalText>
                                <NormalText>Al utilizar la Aplicación o la página Web, el Usuario acuerda, asimismo, que:</NormalText>
                                <View style={{marginLeft:10,}}>
                                    <NormalText>1. Solo utilizará o descargará la Aplicación exclusivamente para su uso personal y no la revenderá a un tercero.</NormalText>
                                    <NormalText>2. No autorizará a otros a usar su cuenta.</NormalText>
                                    <NormalText>3. No cederá ni transferirá de otro modo su cuenta a ninguna otra persona o entidad jurídica (persona jurídica).</NormalText>
                                    <NormalText>4. No utilizará una cuenta que esté sujeta a cualquier derecho de una persona que no sea el Usuario sin la autorización adecuada.</NormalText>
                                    <NormalText>5. No utilizará la Aplicación o la página Web con fines ilícitos, incluyendo, sin limitación, para enviar o almacenar ningún material ilegal o con fines fraudulentos.</NormalText>
                                    <NormalText>6. No utilizará la Aplicación para causar molestias, trastornos o inconvenientes.</NormalText>
                                    <NormalText>7. No perjudicará el funcionamiento adecuado de la red.</NormalText>
                                    <NormalText>8. No tratará de dañar la Aplicación de ningún modo.</NormalText>
                                    <NormalText>9. No copiará ni distribuirá la Aplicación ni ningún contenido de Planeo sin el permiso escrito de Planeo.</NormalText>
                                    <NormalText>10. Guardará de forma segura y confidencial la contraseña de su cuenta y cualquier identificación facilitada para permitirle acceder a la Aplicación.</NormalText>
                                    <NormalText>11. Facilitará a Planeo todas las pruebas de identidad que le sean razonablemente solicitadas.</NormalText>
                                    <NormalText>12. Solo utilizará un punto de acceso o cuenta de datos 3G (AP) que esté autorizado a usar.</NormalText>
                                    <NormalText>13. No utilizará el servicio o la Aplicación con un dispositivo incompatible o no autorizado.</NormalText>
                                    <NormalText>14. Cumplirá con toda la legislación aplicable de su país de residencia y del país, estado o ciudad en el que se encuentre al usar la Aplicación o el Servicio.</NormalText>
                                </View>
                                <NormalText>Planeo se reserva el derecho a terminar inmediatamente el servicio y el uso de la Plataforma Virtual en caso de que incumpla alguna de las reglas y obligaciones anteriores.</NormalText>

                                <SubTitleText>Pago</SubTitleText>
                                <NormalText>Planeo le cobrará al Usuario por los servicios prestados por Planeo directamente. El Usuario acuerda pagar todos los servicios que adquiera de Planeo y que Planeo podrá cobrar, en la cuenta de la tarjeta de crédito que facilitó al registrarse para el Servicio, de ser el caso (incluyendo cualquier impuesto o tasas posteriores, según sea de aplicación) que correspondan o estén asociados a su cuenta. El Usuario será responsable del pago puntual de todas las tasas y de facilitar a Planeo una cuenta de su tarjeta de crédito para el pago de todas las tasas en todo momento. Los pagos realizados no son reembolsables.</NormalText>
                                <NormalText>Planeo utiliza el procesador de pago de un tercero (el «Procesador de Pago») para vincular su cuenta de la tarjeta de crédito a la Aplicación y al Servicio. El procesamiento de pagos o créditos, según sea de aplicación, con respecto al uso que haga de la Aplicación y el Servicio estará sujeto a las condiciones y políticas de privacidad del Procesador del Pago y el emisor de su tarjeta de crédito además de a estos Términos y Condiciones. Planeo no será responsable de ningún error del Procesador de Pago. En relación con su uso de los Servicios, Planeo obtendrá determinados datos de la transacción, que Planeo utilizará únicamente con arreglo a su Privacidad y a su Aviso de Cookies.</NormalText>

                                <SubTitleText>Limitación de Responsabilidad</SubTitleText>
                                <NormalText>Al aceptar estos Términos y Condiciones y al utilizar la Aplicación o el Servicio, el usuario acuerda que defenderá, indemnizará y mantendrá indemne a Planeo, sus filiales, licenciatario, directivos, directores, otros usuarios, trabajadores, abogados y agentes ante cualquier reclamación, costes, daños, pérdidas, responsabilidades y gastos (incluyendo honorarios y gastos de abogados) derivados de o en relación con:</NormalText>
                                <View style={{marginLeft:10,}}>
                                    <NormalText>1. Su violación o incumplimiento de cualquier condición de estos Términos y Condiciones o cualquier ley o reglamento aplicable, se haga o no referencia al mismo en el presente; y/o</NormalText>
                                    <NormalText>2. Su violación de cualquier derecho de cualquier tercero, incluyendo el personal que presta el servicio, y/o</NormalText>
                                    <NormalText>3. Su uso correcto o incorrecto de la Aplicación o el Servicio.</NormalText>
                                </View>

                                <SubTitleText>Modificación</SubTitleText>
                                <NormalText>Planeo podrá modificar autónomamente y en cualquier momento en aspectos formales, procedimentales o sustanciales los presentes Términos y Condiciones de uso de la Plataforma Virtual, los cuales serán actualizados y puestos a disposición de los Usuarios en la Plataforma Virtual, siendo la última versión publicada la que regulará las relaciones comerciales que se generen al momento de realizarse la transacción. Así mismo, cuenta con plena autonomía para modificar los usos de la Plataforma Virtual permitidos a los Usuarios, con el único deber de informarlo por un medio virtual que permita su publicación y comunicación al público.</NormalText>
                                
                                <SubTitleText>Manejo de información</SubTitleText>
                                <NormalText>La información recolectada por Planeo para el uso de la Plataforma Virtual, es suministrada por los Usuarios de forma libre y voluntaria, para que esta sea administrada por Planeo o por quien éste designe para el cumplimiento de los deberes adquiridos, lo que implica su recolección; almacenamiento en servidores o repositorios de Planeo o de terceros; circulación de los mismos dentro de la organización de Planeo; comunicación a los Usuarios de información comercial, publicitaria y de mercadeo relacionada con su actividad comercial.</NormalText>
                                <NormalText>Así mismo, los datos recolectados serán objeto de análisis para fines de mejorar la estrategia de negocios del portal web, apoyada en herramientas de inteligencia de negocios y minería de datos, que permiten adquirir conocimientos prospectivos para fines de predicción, clasificación y segmentación.</NormalText>
                                <NormalText>El Usuario podrá ejercer su derecho de conocer, actualizar, modificar y suprimir los datos personales existentes en las bases de datos asociadas a la Plataforma. Para ello deberá realizar la solicitud de consulta, reclamo o supresión a la dirección electrónica habeasdata@mareigua.com detallando las modificaciones a realizar y aportando los documentos que lo soportan.</NormalText>
                                <NormalText>Planeo es responsable del tratamiento de la información personal recolectada a través del portal web, responsabilidad que podrá delegar en un tercero, en calidad de responsable o encargado de la información, asegurando contractualmente adecuado tratamiento de la misma. La política de datos personales podrá ser consultada en la Aplicación.</NormalText>
                                <NormalText>Con la aceptación de los presentes Términos y Condiciones de Uso de la Plataforma, el Usuario autoriza expresamente a Planeo a (i) consultar la información del Usuario en centrales de información financiera o burós de crédito; (ii) consultar la información del Usuario en entidades operadoras de información que administren información laboral, financiera y de seguridad social de empleados y/o empleadores; y (iii) consultar información sobre los aportes y saldos del Usuario a fondos de pensiones y/o cesantías.</NormalText>

                                <SubTitleText>DOMICILIO Y LEGISLACIÓN APLICABLE</SubTitleText>
                                <NormalText>Los presentes Términos y Condiciones de Uso de La Plataforma se acogen en el territorio Colombiano, conforme a su normatividad general y sectorial. Su adopción implica el ejercicio de su libre voluntad y que la relación que surge de este documento se regirá en todos sus efectos por su contenido y en su defecto por la ley comercial colombiana.</NormalText>

                                <SubTitleText>ACEPTACIÓN TOTAL DE LOS TÉRMINOS</SubTitleText>
                                <NormalText>El Usuario manifiesta expresamente tener capacidad legal para usar La Plataforma y para celebrar las transacciones comerciales que se puedan generar. Así mismo, manifiesta haber suministrado información real, veraz y fidedigna; por ende, de forma expresa e inequívoca declara que ha leído, que entiende y que acepta la totalidad de las situaciones reguladas en el presente escrito de Términos y Condiciones de Uso de la Plataforma, por lo que se compromete al cumplimiento total de los deberes, obligaciones, acciones y omisiones aquí expresadas.</NormalText>
                                
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

            </TerminosContainer>
        </GeneralBase>
    );
};
export default TerminosCondicionesScreen;

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