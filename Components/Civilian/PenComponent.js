// import React, { useState } from 'react';
// import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { v4 as uuidv4 } from "uuid";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import app from '../../Authentication/Firebase/Config';
// import LottieView from 'lottie-react-native';
// import LoginLoaderOne from '../../assets/LoginLoaderOne.json';

// const PenComponent = ({ navigation }) => {

//     const db = getFirestore(app);

//     let numOfLinesCompany = 0;

//     const [issues, setIssues] = useState('');

//     const handleIssues = async () => {
//         const newIssue = { issues: issues, id: uuidv4() }
//         console.log(newIssue);
//         try {
//             await setDoc(doc(db, "Cases", newIssue.id), newIssue);
//         } catch (error) {
//             console.log(error);
//         }
//         setIssues('');
//         navigation.navigate('MainFrame');
//     };


//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <View style={styles.inner}>
//                     <View style={styles.textInputContainer}>
//                         <TextInput
//                             value={issues}
//                             onChangeText={(text) => { setIssues(text) }}
//                             keyboardType='default'
//                             autoComplete='off'
//                             placeholderTextColor={"white"}
//                             multiline={true}
//                             numberOfLines={numOfLinesCompany}
//                             onContentSizeChange={(e) => {
//                                 numOfLinesCompany = e.nativeEvent.contentSize.height / 20;
//                             }}
//                             placeholder="Enter your complaint here..."
//                             style={styles.textInput}
//                         />
//                     </View>
//                     <TouchableOpacity onPress={handleIssues} style={styles.btnContainer}>
//                         <MaterialCommunityIcons name="plus" size={24} color="white" />
//                     </TouchableOpacity>
//                 </View>
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor:'white'
//     },
//     inner: {
//         padding: 30,
//         flex: 1,
//         justifyContent: "flex-end"
//     },
//     textInputContainer: {
//         flex: 1,
//         backgroundColor: '#26898A',
//         borderRadius: 60,
//         padding: 20,
//         marginBottom: 90,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         color:'white'
//     },
//     textInput: {
//       fontSize: 18,
//       color: 'white',
//       fontFamily: 'Times New Roman', // Change font as desired
//       lineHeight: 25, // Adjust line height as needed
//       borderBottomColor: 'rgba(255, 255, 255, 0.5)', // Change line color
//       borderBottomWidth: 1, // Change line width
//   },
//     btnContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#26898A',
//         width: 80,
//         height: 80,
//         borderRadius: 30,
//         position: 'absolute',
//         bottom: 30,
//         right: 30,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         marginRight:130
//     },
// });

// export default PenComponent;

import React, { useState, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { v4 as uuidv4 } from "uuid";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../../Authentication/Firebase/Config';
import { useCases } from './CaseContext';

const PenComponent = ({ navigation }) => {
    const db = getFirestore(app);
    let numOfLinesCompany = 0;

    const [issues, setIssues] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const { addCase } = useCases();

    const spinValue = useRef(new Animated.Value(0)).current;

    const spin = () => {
        setIsSpinning(true);
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start();
    };

    const spinStyle = {
        transform: [{
            rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
        }]
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        return { date, time };
    };

    const handleIssues = async () => {
        if (!phoneNumber || !email) {
            Alert.alert('Error', 'Please fill in the phone number and email fields before posting a case.');
            return;
        }

        spin();

        const { date, time } = getCurrentDateTime();

        const newIssue = {
            issues: issues,
            id: uuidv4(),
            phoneNumber: phoneNumber,
            email: email,
            date: date,
            time: time
        };

        console.log(newIssue);

        try {
            await setDoc(doc(db, "Cases", newIssue.id), newIssue);
            addCase(newIssue);
        } catch (error) {
            console.log(error);
        }

        setIssues('');
        setPhoneNumber('');
        setEmail('');
        setTimeout(() => {
            setIsSpinning(false);
            // navigation.navigate('Home');
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ScrollView style={styles.textInputContainer}>
                        <TextInput
                            value={issues}
                            onChangeText={(text) => { setIssues(text) }}
                            keyboardType='default'
                            autoComplete='off'
                            placeholderTextColor={"white"}
                            multiline={true}
                            numberOfLines={numOfLinesCompany}
                            onContentSizeChange={(e) => {
                                numOfLinesCompany = e.nativeEvent.contentSize.height / 20;
                            }}
                            placeholder="Enter your complaint here..."
                            style={styles.textInput}
                        />
                        <View style={styles.inputWithIcon}>
                            <MaterialCommunityIcons name="phone" size={24} color="white" style={styles.inputIcon} />
                            <TextInput
                                value={phoneNumber}
                                onChangeText={(text) => { setPhoneNumber(text) }}
                                keyboardType='phone-pad'
                                autoComplete='off'
                                placeholderTextColor={"white"}
                                placeholder="Phone Number"
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputWithIcon}>
                            <MaterialCommunityIcons name="email" size={24} color="white" style={styles.inputIcon} />
                            <TextInput
                                value={email}
                                onChangeText={(text) => { setEmail(text) }}
                                keyboardType='email-address'
                                autoComplete='off'
                                placeholderTextColor={"white"}
                                placeholder="Email"
                                style={styles.textInput}
                            />
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={handleIssues} style={styles.btnContainer}>
                        <Animated.View style={[styles.button, isSpinning && spinStyle]}>
                            <MaterialCommunityIcons name="plus" size={24} color="white" />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inner: {
        padding: 30,
        flex: 1,
        justifyContent: "flex-end"
    },
    textInputContainer: {
        flex: 1,
        backgroundColor: '#26898A',
        borderRadius: 60,
        padding: 20,
        marginBottom: 90,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        color: 'white'
    },
    textInput: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Times New Roman', 
        lineHeight: 25, 
        borderBottomColor: 'rgba(255, 255, 255, 0.5)', 
        borderBottomWidth: 1, 
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#26898A',
        width: 80,
        height: 80,
        borderRadius: 30,
        position: 'absolute',
        bottom: 30,
        right: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginRight: 130
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});

export default PenComponent;


