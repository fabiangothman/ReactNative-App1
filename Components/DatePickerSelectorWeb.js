//Libraries
import React, {useState, useEffect} from 'react';
import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormButtonAuto } from './FormButton';

const DatePickerSelectorWeb = ({ visible, setVisible, date, setDate, ...props }) => {
    const [day, setDay] = useState(`${date.getDate()}`);
    const [month, setMonth] = useState(`${date.getMonth()+1}`);
    const [year, setYear] = useState(`${date.getFullYear()}`);

    const handleSave = async () => {
        const timestamp = Date.parse(`${year}/${month}/${day}`);
        if (isNaN(timestamp) == false) {
            const newDate = new Date(timestamp);
            setDay(`${newDate.getDate()}`);
            setMonth(`${newDate.getMonth()+1}`);
            setYear(`${newDate.getFullYear()}`);
            setDate(newDate);
            setVisible(false);
        }else{
            alert("Revise la fecha, tiene valores incorrectos.");
        }
    } 

    useEffect(() => {
        //
    }, [setVisible, setDate]);

    return (Platform.OS === 'web' && visible) ? (
        <TouchableOpacity style={styles.position} {...props} onPress={() => handleSave()}>
            <View style={styles.popup}>
                <TouchableOpacity style={styles.contentContainer}>
                    <Text style={styles.title}>Ingresa la fecha correspondiente</Text>
                    <View style={styles.colsCont}>
                        <View style={styles.fieldCol}>
                            <Text style={styles.fieldTitle}>Dia</Text>
                            <TextInput multiline={false}
                                style={styles.textInput}
                                value={day}
                                onChangeText={value => setDay(value)}
                                placeholder={"Día"}
                                placeholderTextColor="#C7C7C7"
                                keyboardType="numeric"
                                numberOfLines={1} />
                        </View>
                        <View style={styles.fieldCol}>
                            <Text style={styles.fieldTitle}>Mes</Text>
                            <TextInput multiline={false}
                                style={styles.textInput}
                                value={month}
                                onChangeText={value => setMonth(value)}
                                placeholder={"Mes"}
                                placeholderTextColor="#C7C7C7"
                                keyboardType="numeric"
                                numberOfLines={1} />
                        </View>
                        <View style={styles.fieldCol}>
                            <Text style={styles.fieldTitle}>Año</Text>
                            <TextInput multiline={false}
                                style={styles.textInput}
                                value={year}
                                onChangeText={value => setYear(value)}
                                placeholder={"Año"}
                                placeholderTextColor="#C7C7C7"
                                keyboardType="numeric"
                                numberOfLines={1} />
                        </View>
                    </View>
                    <FormButtonAuto
                        buttonTitle="ACTUALIZAR"
                        borderLine={1}
                        style={styles.formButtonAuto}
                        onPress={() => handleSave()} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    ) : null;
};
export default DatePickerSelectorWeb;

const styles = StyleSheet.create({
    position: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
    },
    popup:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer:{
        backgroundColor: 'white',
        padding: 20,
    },
        title:{
            fontFamily: 'nunito',
            textAlign: 'center',
            fontSize: 18,
        },
        colsCont:{
            marginTop: 20,
            flexDirection: 'row',
        },
            fieldCol:{
                flex: 1,
                flexDirection: 'column',
                marginHorizontal:5,
            },
            fieldTitle:{
                textAlign: 'center',
                fontFamily: 'nunito',
            },
            textInput:{
                borderColor: '#C7C7C7',
                borderWidth: 1,
                fontFamily: 'nunito',
                width: 50,
                padding: 0,
                textAlign: 'center',
                alignSelf: 'center',
            },
        formButtonAuto: {
            paddingVertical:7,
            paddingHorizontal:15,
            marginTop:15,
        },
});