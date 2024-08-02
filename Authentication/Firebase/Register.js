import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Foundation, Ionicons, Feather, Fontisto } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';
import app from '../../Authentication/Firebase/Config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const Register = ({ navigation }) => {

    const auth = getAuth(app);
    const db = getFirestore(app);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCivilianSubmit = async () => {
        const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*])/;

        if (!username || !email || !phonenumber || !password) {
            let missingFields = [];
            if (!username) missingFields.push('User Name');
            if (!email) missingFields.push('Email Address');
            if (!phonenumber) missingFields.push('Phone Number');
            if (!password) missingFields.push('Password');
            alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
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

        const newCivilian = {
            username,
            email,
            phonenumber,
            password,
            id: uuidv4()
        };

        setIsLoading(true);

        try {
            await setDoc(doc(db, "Civilian", newCivilian.id), newCivilian);
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Successfully registered as a civilian');
            navigation.navigate('CivilianBottomNav');
        } catch (error) {
            console.error('Error during registration:', error.message);
            alert('Registration failed: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        placeholderTextColor='#a4a6a5'
                        autoCorrect={false} autoComplete='off'
                        keyboardType='name-phone-pad'
                        style={styles.forminput} placeholder='Full Name' />
                </View>

                <View style={styles.formcontainer}>
                    <Ionicons style={styles.formicon} name="mail-outline" size={20} color="white" />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor='#a4a6a5'
                        autoCorrect={false} autoComplete='off'
                        keyboardType='email-address'
                        style={styles.forminput} placeholder='Email Address' />
                </View>

                <View style={styles.formcontainer}>
                    <Feather style={styles.formicon} name="phone-call" size={20} color="white" />
                    <TextInput
                        value={phonenumber}
                        onChangeText={(text) => setPhonenumber(text)}
                        placeholderTextColor='#a4a6a5'
                        autoCorrect={false} autoComplete='off'
                        keyboardType='number-pad'
                        style={styles.forminput} placeholder='Phone Number' />
                </View>

                <View style={styles.formcontainer}>
                    <Feather style={styles.formicon} name="lock" size={20} color="white" />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='#a4a6a5'
                        secureTextEntry={true}
                        autoCorrect={false} autoCapitalize='none'
                        style={styles.forminput} placeholder='Password with special character' />
                </View>

                <View style={styles.register}>
                    <TouchableOpacity style={styles.registerbtn} onPress={handleCivilianSubmit} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="person-outline" size={20} color="white" />
                                <Text style={styles.registertext}>Submit as Civilian</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    log: {
        flex: 1,
        backgroundColor: '#243035'
    },
    welcometext : {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
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
        fontFamily: 'Euphemia UCAS',
        borderColor: (field) => (field ? 'white' : 'red'), // Indicate red if the field is missing
        borderWidth: 1  
    },
    register: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    registerbtn: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        alignItems: 'center',
        marginVertical: 10
    },
    registertext: {
        color: 'white',
        fontSize: 14,
        fontWeight: '400',
        marginVertical: 1,
        fontFamily: 'Euphemia UCAS'    
    },
});

export default Register;