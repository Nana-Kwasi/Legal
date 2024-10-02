import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../../Authentication/Firebase/Config';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const CivilianProfileScreen = ({ route, navigation }) => {
    const { civilianId } = route.params; // Get the civilianId from route parameters
    const [civilianData, setCivilianData] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchCivilianData = async () => {
            try {
                const docRef = doc(db, 'Civilian', civilianId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCivilianData(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCivilianData();
    }, [civilianId, db]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('LogIn');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Civilian Profile</Text>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={styles.signOut}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            {civilianData ? (
                <View style={styles.profileContainer}>
                    <Ionicons name="person-circle" size={80} color="#243035" />
                    <Text style={styles.name}>{civilianData.fullName}</Text>
                    <Text style={styles.email}>{civilianData.email}</Text>
                    <Text style={styles.phone}>Phone: {civilianData.phoneNumber}</Text>
                    <Text style={styles.address}>Address: {civilianData.address}</Text>
                    {/* Add more civilian details as needed */}
                </View>
            ) : (
                <Text style={styles.errorText}>Failed to load civilian data.</Text>
            )}
        </SafeAreaView>
    );
};

export default CivilianProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#243035',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
    },
    signOut: {
        fontSize: 18,
        color: '#ff6347', // Red color for sign out button
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    name: {
        fontSize: 22,
        color: '#fff',
        marginVertical: 10,
    },
    email: {
        fontSize: 18,
        color: '#9fa9a7',
    },
    phone: {
        fontSize: 16,
        color: '#9fa9a7',
    },
    address: {
        fontSize: 16,
        color: '#9fa9a7',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
