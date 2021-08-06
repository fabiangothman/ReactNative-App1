//Libraries
import React from 'react';
import Constants from 'expo-constants';
import { View } from 'react-native';
//Styles
import { GeneralAppContainer, BgContainer, ImgBgContainer } from '../Styles/Components/general';
//Images
import bgImage from '../assets/images/backgroundImage.png';


const GeneralBase = ({loadBgImage, backgroundColor, marginTop, children, ...props}) => {
    loadBgImage = (loadBgImage === undefined || !loadBgImage) ? false : true;
    marginTop = (marginTop === undefined || marginTop === 'auto') ? Constants.statusBarHeight : marginTop;
    
    return (
        <GeneralAppContainer backgroundColor={backgroundColor} marginTop={marginTop} {...props}>
            {loadBgImage ? (
                <BgContainer>
                    <ImgBgContainer source={bgImage} style={{resizeMode: 'cover'}}>
                        {children}
                    </ImgBgContainer>
                </BgContainer>
            ) : (
                <BgContainer>{children}</BgContainer>
            )}
        </GeneralAppContainer>
    );
}
export default GeneralBase;