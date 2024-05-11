 import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons'; 
import app from '../../Authentication/Firebase/Config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import energy from '../../assets/energy.jpg'
import LottieView from 'lottie-react-native';
import rounded from '../../assets/rounded.json';
import { useRef } from 'react';

const LogIn = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(app);

    const progress = useRef(new Animated.Value(0)).current;
    const [hasClicked, setHasClicked] = useState(false);

    const handleLogIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged In with:', user.email);
            navigation.navigate('Continue')
        })
        .catch(error =>alert('Log In First'));
        try {
            await AsyncStorage.setItem('MyEmail', email);
        } catch (error) {
            console.log(error);
        };
        const newValue = hasClicked ? 0 : 1;
        Animated.loop(progress,{
            toValue: newValue,
            duration: 1000,
            useNativeDriver: true,
        }).start()
        setHasClicked(!hasClicked);
    };


    const load = async () => {
        try {
            let email = await AsyncStorage.getItem('MyEmail');

            if (email !== null) {
                setEmail(email);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        load();
    },[]);
 

    return (
        <SafeAreaView style={styles.log}>
            <ImageBackground resizeMode='cover' source={energy} style={styles.bgg} >

            <View style={styles.welcome}>
                <View style={styles.welcometext}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                        <Ionicons  name="ios-home-outline" size={25} color="white" />
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
                    <Ionicons style={styles.formicon} name="ios-mail-outline" size={20} color="white" />
                    <TextInput
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                    placeholderTextColor='#a4a6a5'
                    autoCorrect={false} autoComplete='off' 
                    keyboardType='email-address' 
                    style={styles.forminput} placeholder='Email Address' />
                </View>

                <View style={styles.formcontainer}>
                    <Feather style={styles.formicon} name="lock" size={20} color="white"  />
                    <TextInput 
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    placeholderTextColor='#a4a6a5'
                    secureTextEntry={true} 
                    autoCorrect={false} autoCapitalize='none'
                    style={styles.forminput} placeholder='Password' />
                </View>

                <TouchableOpacity onPress={handleLogIn} style={styles.continuecontainer}>
                    <Text style={styles.continue}>LOG IN</Text>
                    <LottieView style={{width:100, height:100}} progress={progress} source={rounded} /> 
                </TouchableOpacity>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    log: {
        flex: 1,
        backgroundColor: '#243035'
    },
    welcome: {
        flex: 0.1,
    },
    welcometext : {
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
});

export default LogIn;