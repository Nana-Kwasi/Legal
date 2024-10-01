import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../Authentication/Firebase/Config';
import { Ionicons } from '@expo/vector-icons';
import { useCases } from './CaseContext';

const CivilianActivity = ({ navigation }) => {
    const auth = getAuth(app);
    const { cases } = useCases(); // Use the custom hook

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('LogIn');
                // console.log('Signed Out');
            })
            .catch((error) => {
                console.log(error);
            });
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.activity}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.signOutbtn} onPress={handleSignOut}>
                    <Text style={styles.signOut}>SIGN OUT</Text>
                </TouchableOpacity>
                <View style={styles.profileSection}>
                    <Ionicons name="person-circle" size={40} color="#243035" />
                    <Text style={styles.email}>{auth.currentUser?.email}</Text>
                </View>
            </View>
            <View style={styles.mainactivity}>
                <Text style={{ fontSize: 20, color: "white", marginHorizontal: 80, marginTop: 30 }}>YOUR HISTORY CASES</Text>
                <ScrollView>
                    {cases.map((caseItem) => (
                        <View key={caseItem.id} style={styles.caseItem}>
                            <Text style={styles.caseText}>{caseItem.issues}</Text>
                            <Text style={styles.caseDetails}>Phone: {caseItem.phoneNumber}</Text>
                            <Text style={styles.caseDetails}>Email: {caseItem.email}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    activity: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainactivity: {
        flex: 1,
        backgroundColor: '#243035',
    },
    email: {
        fontSize: 15,
        fontWeight: '400',
        color: '#243035',
        marginLeft: 10,
        fontFamily: 'KohinoorTelugu-Medium',
    },
    signOutbtn: {
        backgroundColor: '#243035',
        padding: 10,
        borderRadius: 5,
    },
    signOut: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'KohinoorTelugu-Medium',
    },
    caseItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    caseText: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Courier New',
        color:"black"
    },
    caseDetails: {
        fontSize: 15,
    },
});

export default CivilianActivity;
