import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../../Authentication/Firebase/Config';

const CivilianProfile = ({ route, navigation }) => {
    const [civilian, setCivilian] = useState(null);
    const { civilianId } = route.params;
    const db = getFirestore(app);

    useEffect(() => {
        const fetchCivilianData = async () => {
            try {
                const docRef = doc(db, 'Civilian', civilianId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCivilian(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchCivilianData();
    }, [civilianId]);

    const handleClose = () => {
        navigation.goBack();
    };

    if (!civilian) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{civilian.username}</Text>

            <Text style={styles.label}>Password:</Text>
            <Text style={styles.value}>{civilian.password}</Text>

            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{civilian.phoneNumber}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{civilian.email}</Text>

            <Button title="Close" onPress={handleClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default CivilianProfile;
