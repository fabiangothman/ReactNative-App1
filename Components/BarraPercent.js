//Libraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextBold } from './Text';

const BarraPercent = ({percent, barColor, textColor, ...props}) => {
    percent = (percent) ? percent+"%" : '0%';
    barColor = (barColor) ? barColor : "#379AF4";
    textColor = (textColor) ? textColor : "#707070";

    return (
        <View {...props}>
            <View style={styles.detailCont}>
                <View style={[styles.detailCol, {flex:1}]}>
                    <View style={styles.barCont}>
                        <View style={[styles.barProgress, {width: percent, backgroundColor: barColor}]}></View>
                    </View>
                </View>
                <View style={styles.detailCol}>
                    <Text style={[styles.text, {color: textColor}]}>{percent}</Text>
                </View>
            </View>
        </View>
    );
};
export default BarraPercent;

const styles = StyleSheet.create({
    detailCont:{
        width: '100%',
        flexDirection: 'row',
    },
        detailCol:{
            flexDirection: 'column',
            justifyContent: 'center',
        },
            barCont: {
                height: 8,
                backgroundColor: '#E2E7EE',
                borderRadius: 20,
                overflow: 'hidden',
            },
                barProgress: {
                    width: '0%',
                    height: '100%',
                    borderRadius: 20,
                },
            text:{
                marginLeft: 10,
            },
});