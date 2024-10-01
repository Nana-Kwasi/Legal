import React, { useState, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { v4 as uuidv4 } from "uuid";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../../Authentication/Firebase/Config';

const ReportAbuse = ({ navigation }) => {
    const db = getFirestore(app);
    const [reportText, setReportText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);

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

    const handleReportSubmit = async () => {
        if (!phoneNumber || !email || !reportText) {
            Alert.alert('Error', 'Please fill in all fields before submitting your report.');
            return;
        }

        spin();

        const { date, time } = getCurrentDateTime();

        const newReport = {
            reportText: reportText,
            id: uuidv4(),
            phoneNumber: phoneNumber,
            email: email,
            date: date,
            time: time
        };

        console.log(newReport);

        try {
            await setDoc(doc(db, "Report", newReport.id), newReport);
            Alert.alert('Success', 'Your report has been submitted, you will hear from our Management.Thank You!.');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while submitting your report.');
        }

        setReportText('');
        setPhoneNumber('');
        setEmail('');
        setTimeout(() => {
            setIsSpinning(false);
            // navigation.navigate('Home'); // Uncomment to navigate after submission
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.scrollContainer}> 
                    <View style={styles.inner}>
                        <View style={styles.card}> 
                            <Text style={styles.header}>Report Incident</Text>
                            <Text style={styles.subText}>Please use this form to report any cases of abuse, fraud, violence, or other inappropriate behavior from civilian. Your report is important to us, and we take these matters seriously. Please note that submitting false reports can result in consequences.</Text>
                        </View>

                        <View style={styles.card}>
                            <TextInput
                                value={reportText}
                                onChangeText={(text) => setReportText(text)}
                                keyboardType='default'
                                autoComplete='off'
                                placeholderTextColor={"white"}
                                multiline={true}
                                placeholder="Describe the inappropriate behavior..."
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.card}>
                            <View style={styles.inputWithIcon}>
                                <MaterialCommunityIcons name="phone" size={24} color="white" style={styles.inputIcon} />
                                <TextInput
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                    keyboardType='phone-pad'
                                    autoComplete='off'
                                    placeholderTextColor={"white"}
                                    placeholder="Phone Number"
                                    style={styles.textInput}
                                />
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.inputWithIcon}>
                                <MaterialCommunityIcons name="email" size={24} color="white" style={styles.inputIcon} />
                                <TextInput
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    keyboardType='email-address'
                                    autoComplete='off'
                                    placeholderTextColor={"white"}
                                    placeholder="Email"
                                    style={styles.textInput}
                                />
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleReportSubmit} style={styles.btnContainer}>
                            <Animated.View style={[styles.button, isSpinning && spinStyle]}>
                                <MaterialCommunityIcons name="send" size={24} color="white" />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-between',
    },
    card: { 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10, 
        elevation: 5, 
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 10,
    },
    subText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    textInput: {
        height: 100,
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
        padding: 10,
        marginVertical: 10,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
        marginVertical: 10,
    },
    inputIcon: {
        padding: 10,
    },
    btnContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0066CC',
        padding: 15,
        borderRadius: 50,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ReportAbuse;
