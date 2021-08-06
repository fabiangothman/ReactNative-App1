import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { StatusBar } from 'expo-status-bar';
import  '../Servers/Firebase/config';   //Inicializa el servidor de firebase de la aplicación

const Providers = () => {
    return (
        <AuthProvider>
            <Routes />
            <StatusBar style="dark" backgroundColor="transparent" hidden={false} />
        </AuthProvider>
    );
}
export default Providers;