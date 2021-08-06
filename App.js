import React from 'react';
import Providers from './Navigation/index';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
    'nunito': require('./assets/fonts/Nunito-Light.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded)
    return <AppLoading />;
  else
    return <Providers />;
}