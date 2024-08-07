import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../Authentication/Firebase/Config';

const Dashboard = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);

    return (
        <View style={styles.container}>
             <View style={styles.header}>
               
                <View style={styles.profileSection}>
                    <Image source={require('../../assets/profile.png')} style={styles.icon1} />
                    <Text style={styles.email}>{auth.currentUser?.email}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.iconContainer, styles.shadow]} onPress={() => navigation.navigate('MyClients')}>
                    <Image source={require('../../assets/service.png')} style={styles.icon} />
                    <Text style={styles.iconText}>My Clients</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconContainer, styles.shadow]} onPress={() => navigation.navigate('MyCases')}>
                    <Image source={require('../../assets/job.png')} style={styles.icon} />
                    <Text style={styles.iconText}>My Cases</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.iconContainer, styles.shadow]} onPress={() => navigation.navigate('LawyersMainFrame')}>
                    <Image source={require('../../assets/new.png')} style={styles.icon} />
                    <Text style={styles.iconText}>New Cases</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center', // Center content vertically
    },
    email: {
        fontSize: 15,
        fontWeight: '400',
        color: '#243035',
        fontFamily: 'KohinoorTelugu-Medium',
        marginTop: 8, 
        textAlign: 'center',
        marginRight:250
 

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        marginBottom: 40, 
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 100,
        height: 100,
    },
    icon1: {
        width: 70,
        height: 70,
        marginRight:250
    },
    iconText: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 120,
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 0.5,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});

export default Dashboard;
