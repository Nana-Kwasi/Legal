// import React, { useEffect } from 'react';
// import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
// import official from '../assets/official.png';
// import { FontAwesome } from '@expo/vector-icons';
// import tryone from '../assets/tryone.jpg';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Home = ({navigation}) => {




//     return (
//         <View style={styles.container}>
//             <ImageBackground source={tryone} resizeMode='cover' style={styles.bg}>

//             <View style={styles.logocontainer}>
//                 <Image style={styles.logo} source={official} />
//             </View>

//             <View style={styles.title}>
//                     <Text style={styles.legal}>GO LEGAL</Text>
//                 <View style={styles.purpose}>
//                     <Text style={styles.case}>Pen your cases today!</Text>
//                     <FontAwesome name="pencil-square-o" size={40} color="white" />
//                 </View>
//             </View>

//             <View style={styles.choice}>
//                 <TouchableOpacity style={styles.in} onPress={()=>{navigation.navigate('LogIn')}}>
//                     <Text style={styles.sign}>LOG IN</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.in} onPress={()=>{navigation.navigate('Register')}}>
//                     <Text style={styles.sign}>REGISTER</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.description}>
//                     <Text style={styles.agree}>By using Go Legal's app you agree to our</Text>
//                     <Text style={styles.agree}>privacy policy and end user license agreement</Text>
//             </View>

//             </ImageBackground>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container:{flex: 1},
//     bg: {
//         flex: 1,
//     },
//     logocontainer: {
//         flex: 0.5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         flex: 0.2,
//         alignItems: 'center',
//         justifyContent: 'flex-start'
//     },
//     legal: {
//         fontSize: 50,
//         fontWeight: '100',
//         marginTop: 30,
//         color: 'white',
//         fontFamily: 'Courier New'
//     },
//     purpose: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: 1,
//         borderColor: 'white',
//         padding: 10,
//         borderRadius: 10
//     },
//     case: {
//         fontSize: 15,
//         paddingHorizontal: 10,
//         color: 'white',
//         fontWeight: '200',
//         fontFamily: 'Euphemia UCAS'
//     },
//     choice: {
//         flex: 0.2,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-evenly',
//     },
//     description: {
//         flex: 0.1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     logo: {
//         marginTop: 150,
//     },
//     agree: {
//         fontSize: 10,
//         color: 'white',
//     },
//     sign: {
//         color: 'white',
//         alignSelf: 'center',
//         fontSize: 15,
//         fontFamily: 'Euphemia UCAS'
//     },
//     in: {
//         padding: 10,
//         width: 100,
//         borderBottomWidth: 1,
//         borderBottomColor: 'white'
//     },
// });

// export default Home;

import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import official from '../assets/official.png';
import { FontAwesome } from '@expo/vector-icons';
import tryone from '../assets/tryone.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {

    const handleRegister = () => {
        // Show options for registering as a lawyer or civilian
        Alert.alert(
            'Register as',
            'Choose an option to register as:',
            [
                {
                    text: 'Lawyer',
                    onPress: () => navigation.navigate('LawyerRegistration'), // Navigate to lawyer registration screen
                },
                {
                    text: 'Civilian',
                    onPress: () => navigation.navigate('Register'), // Navigate to civilian registration screen
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={tryone} resizeMode='cover' style={styles.bg}>

            <View style={styles.logocontainer}>
                <Image style={styles.logo} source={official} />
            </View>

            <View style={styles.title}>
                    <Text style={styles.legal}>GO LEGAL</Text>
                <View style={styles.purpose}>
                    <Text style={styles.case}>Pen your cases today!</Text>
                    <FontAwesome name="pencil-square-o" size={40} color="white" />
                </View>
            </View>

            <View style={styles.choice}>
                <TouchableOpacity style={styles.in} onPress={()=>{navigation.navigate('LogIn')}}>
                    <Text style={styles.sign}>LOG IN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.in} onPress={handleRegister}>
                    <Text style={styles.sign}>REGISTER</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.description}>
                    <Text style={styles.agree}>By using Go Legal's app you agree to our</Text>
                    <Text style={styles.agree}>privacy policy and end user license agreement</Text>
            </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{flex: 1},
    bg: {
        flex: 1,
    },
    logocontainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    legal: {
        fontSize: 50,
        fontWeight: '100',
        marginTop: 30,
        color: 'white',
        fontFamily: 'Courier New'
    },
    purpose: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    case: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: 'white',
        fontWeight: '200',
        fontFamily: 'Euphemia UCAS'
    },
    choice: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    description: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: 150,
    },
    agree: {
        fontSize: 10,
        color: 'white',
    },
    sign: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'Euphemia UCAS'
    },
    in: {
        padding: 10,
        width: 100,
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
});

export default Home;
