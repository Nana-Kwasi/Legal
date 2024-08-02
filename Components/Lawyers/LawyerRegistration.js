import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform,ActivityIndicator  } from 'react-native';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons'; 
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
    const [errors, setErrors] = useState({}); 

    const auth = getAuth(app); 
    const db = getFirestore(app); 

    const handleLawyerSubmit = async () => {
        const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*])/;
        let errorMessages = {};
        let isError = false;
    
        if (!fullName) {
            errorMessages.fullName = 'Full Name is required.';
            isError = true;
        }
        if (!email) {
            errorMessages.email = 'Email Address is required.';
            isError = true;
        }
        if (!phoneNumber) {
            errorMessages.phoneNumber = 'Phone Number is required.';
            isError = true;
        }
        if (!licenseNumber) {
            errorMessages.licenseNumber = 'License Number is required.';
            isError = true;
        }
        if (!barAssociation) {
            errorMessages.barAssociation = 'Bar Association is required.';
            isError = true;
        }
        if (!password) {
            errorMessages.password = 'Password is required.';
            isError = true;
        }
        if (password !== confirmPassword) {
            errorMessages.confirmPassword = 'Passwords do not match.';
            isError = true;
        }
    
        if (isError) {
            setErrors(errorMessages);
            Alert.alert('Error', Object.values(errorMessages).join('\n'));
            return;
        }
        if (!nameRegex.test(username)) {
            alert('Please enter a valid full name with first and last name.');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert('Password must include at least one special character.');
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
            Alert.alert('Success', 'You have been successfully registered!'); // Show success alert
    
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
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.log}
        >
            <SafeAreaView style={styles.log}>
                <View style={styles.welcome}>
                    <View style={styles.welcometext}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                            <Ionicons name="home-outline" size={25} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.welcomeback}>JOIN OUR COMMUNITY</Text>
                    </View>
                </View>

                <ScrollView style={styles.form}>
                    <View style={styles.fill}>
                        <Text style={styles.filltext}>Fill in the forms below to continue</Text>
                        <Foundation name="clipboard-pencil" size={30} color="white" />
                    </View>

                    <View style={styles.formcontainer}>
                        <Ionicons style={styles.formicon} name="person-circle-outline" size={20} color="white" />
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor='#a4a6a5'
                            autoCorrect={false} autoComplete='off'
                            keyboardType='name-phone-pad'
                            style={[styles.forminput, errors.fullName ? styles.forminputError : null]}
                            placeholder='Full Name'
                        />
                    </View>

                    <View style={styles.formcontainer}>
                        <Ionicons style={styles.formicon} name="mail-outline" size={20} color="white" />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor='#a4a6a5'
                            autoCorrect={false} autoComplete='off'
                            keyboardType='email-address'
                            style={[styles.forminput, errors.email ? styles.forminputError : null]}
                            placeholder='Email Address'
                        />
                    </View>

                    <View style={styles.formcontainer}>
                        <Feather style={styles.formicon} name="phone-call" size={20} color="white" />
                        <TextInput
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholderTextColor='#a4a6a5'
                            autoCorrect={false} autoComplete='off'
                            keyboardType='number-pad'
                            style={[styles.forminput, errors.phoneNumber ? styles.forminputError : null]}
                            placeholder='Phone Number'
                        />
                    </View>

                    <View style={styles.formcontainer}>
                        <Foundation style={styles.formicon} name="clipboard-notes" size={20} color="white" />
                        <TextInput
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            placeholderTextColor='#a4a6a5'
                            autoCorrect={false} autoComplete='off'
                            style={[styles.forminput, errors.licenseNumber ? styles.forminputError : null]}
                            placeholder='License Number'
                        />
                    </View>

                    <View style={styles.formcontainer}>
                        <Foundation style={styles.formicon} name="clipboard-notes" size={20} color="white" />
                        <TextInput
                            value={barAssociation}
                            onChangeText={setBarAssociation}
                            placeholderTextColor='#a4a6a5'
                            autoCorrect={false} autoComplete='off'
                            style={[styles.forminput, errors.barAssociation ? styles.forminputError : null]}
                            placeholder='Bar Association'
                        />
                    </View>

                    <View style={styles.formcontainer}>
                        <Feather style={styles.formicon} name="lock" size={20} color="white" />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor='#a4a6a5'
                            secureTextEntry={true}
                            autoCorrect={false} autoCapitalize='none'
                            style={[styles.forminput, errors.password ? styles.forminputError : null]}
                            placeholder='Password'
                        />
                    </View>

                    <View style={styles.formcontainer}>
                        <Feather style={styles.formicon} name="lock" size={20} color="white" />
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor='#a4a6a5'
                            secureTextEntry={true}
                            autoCorrect={false} autoCapitalize='none'
                            style={[styles.forminput, errors.confirmPassword ? styles.forminputError : null]}
                            placeholder='Confirm Password'
                        />
                    </View>

                    <TouchableOpacity 
    onPress={handleLawyerSubmit} 
    style={styles.button}
    disabled={isLoading} 
>
    {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
    ) : (
        <Text style={styles.buttonText}>Register</Text>
    )}
</TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    log: {
        flex: 1,
        backgroundColor: '#243035'
    },
    welcometext: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    welcomeback: {
        color: 'white',
        fontSize: 28,
        marginLeft: 30,
        fontFamily: 'Courier New'
    },
    fill: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 1,
        padding: 10,
        alignItems: 'center'
    },
    filltext: {
        color: 'white',
        paddingHorizontal: 10,
        fontFamily: 'Euphemia UCAS'
    },
    form: {
        flex: 1,
        paddingTop: 10
    },
    formcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginVertical: 20
    },
    formicon: {
        paddingHorizontal: 5
    },
    forminput: {
        fontSize: 15,
        padding: 13,
        width: 300,
        backgroundColor: '#323E43',
        color: 'white',
        marginLeft: 5,
        fontFamily: 'Euphemia UCAS'
    },
    forminputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    button: {
        width: '50%',
        height: 40,
        backgroundColor: '#26898A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal:110
      
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default LawyerRegistrationForm;
