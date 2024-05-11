import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Foundation, Ionicons, Feather, Fontisto } from '@expo/vector-icons'; 
import { v4 as uuidv4 } from 'uuid'; 
import app from '../../Authentication/Firebase/Config'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 

const LawyerRegistrationForm = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [barAssociation, setBarAssociation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const auth = getAuth(app); 
    const db = getFirestore(app); 

    const handleLawyerSubmit = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        setIsLoading(true);

        const newLawyer = {
            fullName,
            email,
            phoneNumber,
            licenseNumber,
            barAssociation,
            password,
            id: uuidv4()
        };

        try {
            await setDoc(doc(db, "Lawyer", newLawyer.id), newLawyer);
            await createUserWithEmailAndPassword(auth, email, password);

            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setLicenseNumber('');
            setBarAssociation('');
            setPassword('');
            setConfirmPassword('');

            setSuccessMessage('Registration successful!');

            setTimeout(() => {
                setSuccessMessage('');
                navigation.navigate('LawyerBottomNav');
            }, 2000);
        } catch (error) {
            console.error('Error during registration:', error.message);
            Alert.alert('Error', 'Registration failed: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor={'white'}
                style={styles.input}
                leftIcon={<Fontisto name="person" size={20} color="white" />} // Add left icon
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={'white'}
                style={styles.input}
                leftIcon={<Ionicons name="ios-mail-outline" size={20} color="white" />} // Add left icon
            />
            <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                placeholderTextColor={'white'}
                keyboardType="phone-pad"
                style={styles.input}
                leftIcon={<Feather name="phone-call" size={20} color="white" />} // Add left icon
            />
            <TextInput
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                placeholder="License Number"
                placeholderTextColor={'white'}
                style={styles.input}
                leftIcon={<Foundation name="clipboard-notes" size={20} color="white" />} // Add left icon
            />
            <TextInput
                value={barAssociation}
                onChangeText={setBarAssociation}
                placeholder="Bar Association"
                placeholderTextColor={'white'}
                style={styles.input}
                leftIcon={<Foundation name="clipboard-notes" size={20} color="white" />} // Add left icon
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={'white'}
                style={styles.input}
                leftIcon={<Feather name="lock" size={20} color="white" />} // Add left icon
            />
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                placeholderTextColor={'white'}
                style={styles.input}
                leftIcon={<Feather name="lock" size={20} color="white" />} // Add left icon
            />
            <TouchableOpacity onPress={handleLawyerSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#243035',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color:'white'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#26898A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LawyerRegistrationForm;