import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TakenCasesScreen = () => {
    // Implement logic for displaying taken cases
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.maincase}>
                <MaterialIcons name="my-library-books" size={40} color="white" />
                <Text style={styles.maincasetext}>TAKEN CASES</Text>
            </View>
            <View style={styles.display}>
                <Text style={styles.placeholder}>No taken cases yet.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    maincase: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323E43',
        borderTopEndRadius: 100,
        borderTopStartRadius: 100
    },
    maincasetext: {
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    display: {
        flex: 1
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 20,
        marginTop: 20
    }
});

export default TakenCasesScreen;
