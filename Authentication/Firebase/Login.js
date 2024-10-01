import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Alert } from 'react-native';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons'; 
import app from '../../Authentication/Firebase/Config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import energy from '../../assets/energy.jpg';
import LottieView from 'lottie-react-native';
import rounded from '../../assets/rounded.json';

const LogIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');  // New state to track the selected role
    const auth = getAuth(app);
    const progress = useRef(new Animated.Value(0)).current;
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogIn = async () => {
        setIsLoggingIn(true);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log('Logged In with:', user.email);

            // Prompt user to choose role
            Alert.alert(
                "Choose Role",
                "Do you want to continue as a Lawyer or a Civilian?",
                [
                    {
                        text: "Lawyer",
                        onPress: async () => {
                            setRole('Lawyer');
                            await AsyncStorage.setItem('Role', 'Lawyer');
                            navigation.navigate('Continue', { role: 'Lawyer' });
                        },
                    },
                    {
                        text: "Civilian",
                        onPress: async () => {
                            setRole('Civilian');
                            await AsyncStorage.setItem('Role', 'Civilian');
                            navigation.navigate('Continue', { role: 'Civilian' });
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('MyEmail');
                if (savedEmail !== null) {
                    setEmail(savedEmail);
                }
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, []);

    return (
        <SafeAreaView style={styles.log}>
            <ImageBackground resizeMode='cover' source={energy} style={styles.bgg}>
                <View style={styles.welcome}>
                    <View style={styles.welcometext}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }}>
                            <Ionicons name="home-outline" size={25} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.welcomeback}>WELCOME BACK!</Text>
                    </View>
                </View>
                <ScrollView style={styles.form}>
                    <View style={styles.fill}>
                        <Text style={styles.filltext}>Fill in the forms below to continue</Text>
                        <Foundation name="clipboard-pencil" size={30} color="white" />
                    </View>
                    <View style={styles.formcontainer}>
                        <Ionicons style={styles.formicon} name="mail-outline" size={20} color="white" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor='#a4a6a5'
                            autoCorrect={false}
                            autoComplete='off'
                            keyboardType='email-address'
                            style={styles.forminput}
                            placeholder='Email Address'
                        />
                    </View>
                    <View style={styles.formcontainer}>
                        <Feather style={styles.formicon} name="lock" size={20} color="white" />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor='#a4a6a5'
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize='none'
                            style={styles.forminput}
                            placeholder='Password'
                        />
                    </View>
                    <TouchableOpacity onPress={handleLogIn} style={styles.continuecontainer}>
                        <Animated.View style={isLoggingIn ? styles.spinButton : {}}>
                            <Text style={styles.continue}>LOG IN</Text>
                            {isLoggingIn && (
                                <LottieView style={{ width: 100, height: 100 }} autoPlay loop source={rounded} />
                            )}
                        </Animated.View>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    log: {
        flex: 1,
        backgroundColor: '#243035'
    },
    welcome: {
        flex: 0.1,
        marginTop: 70,
    },
    welcometext: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10
    },
    welcomeback: {
        color: 'white',
        fontSize: 30,
        marginLeft: 70,
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
        flex: 0.9,
        paddingTop: 10
    },
    formcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginVertical: 35
    },
    formicon: {
        paddingHorizontal: 5
    },
    forminput: {
        fontSize: 15,
        padding: 13,
        width: 330,
        backgroundColor: '#323E43',
        color: 'white',
        fontFamily: 'Euphemia UCAS',
        borderWidth: 1,
        borderColor: 'white',
    },
    continuecontainer: {
        marginVertical: 10,
        borderColor: 'white',
        alignItems: 'center',
        marginHorizontal: 130,
    },
    continue: {
        padding: 10,
        color: 'white',
        fontSize: 20,
        fontFamily: 'Euphemia UCAS',
        fontWeight: 'bold'
    },
    bgg: {
        flex: 1
    },
    spinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default LogIn;
