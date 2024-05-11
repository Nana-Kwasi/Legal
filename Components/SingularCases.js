import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SingularCases = ({pass}) => {
    return (
        <SafeAreaView style={styles.maincase}>
            <View style={styles.maincaseinput}>
            <Ionicons name="arrow-redo-outline" size={20} color="#323E43" />
                <Text style={styles.caseinput}> {pass} </Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    maincase: {
        flex: 1
    },
    maincaseinput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginVertical: 20,
        borderBottomWidth: 1
    },
    caseinput: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
        color: '#323E43',  
        fontFamily: 'KohinoorTelugu-Medium'
    },
});

export default SingularCases;
