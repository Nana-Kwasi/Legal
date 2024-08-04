// Dashboard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.card, styles.shadow]} onPress={() => navigation.navigate('MyClients')}>
                    <Feather name="user" size={30} color="white" />
                    <Text style={styles.cardText}>My Clients</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, styles.shadow]} onPress={() => navigation.navigate('MyCases')}>
                    <Feather name="briefcase" size={30} color="white" />
                    <Text style={styles.cardText}>My Cases</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.card, styles.shadow]}>
                    <Feather name="book" size={30} color="white" />
                    <Text style={styles.cardText}>My Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, styles.shadow]}>
                    <Feather name="calendar" size={30} color="white" />
                    <Text style={styles.cardText}>Appointment</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.card, styles.shadow]}>
                    <Feather name="settings" size={30} color="white" />
                    <Text style={styles.cardText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, styles.shadow]}>
                    <Feather name="file-text" size={30} color="white" />
                    <Text style={styles.cardText}>New Cases</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b6d5eb',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        backgroundColor: '#008282',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 40,
        height: 150,
        borderWidth: 1,
        borderColor: '#3a3a3c'
    },
    cardText: {
        color: 'white',
        marginTop: 8,
        fontSize: 18,
        fontWeight: '600',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.9,
                shadowRadius: 5,
            },
            android: {
                elevation: 10,
            },
        }),
    },
});

export default Dashboard;
