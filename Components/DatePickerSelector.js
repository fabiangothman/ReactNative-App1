//Libraries
import React, {useState, useSelector} from 'react';
import { View, Text, Platform, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import DatePicker from 'react-date-picker';

const DatePickerSelector = ({ ...props }) => {

    return (
        <View>
            <DateTimePickerModal {...props}
                mode="date"
                isDarkModeEnabled={true}
            />
        </View>
    );
};
export default DatePickerSelector;

const styles = StyleSheet.create({
    //
});