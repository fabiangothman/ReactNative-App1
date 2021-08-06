import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
//Components
import AuthStack from './NotLogged/AuthStack';
import { AppStack } from './Logged/AppStack';

/*
    Este componente se actualizará siempre que cambié el estado de "appUser"
 */
const Routes = () => {
    const {appUser, setAppUser} = useContext(AuthContext);
    const isLogged = (appUser && appUser.hasOwnProperty('uid')) ? true : false;

    return(
        <NavigationContainer>
            { isLogged ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
export default Routes;