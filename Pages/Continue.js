import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, ImageBackground, Modal, TextInput, Alert, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import legalback from '../assets/legalback.jpg';
import LottieView from 'lottie-react-native';
import rounded from '../assets/rounded.json';

const Continue = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('We Are verifying');
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isLoading) {
            let messageTimeouts = [
                setTimeout(() => setLoadingMessage('We are almost done'), 1000),
                setTimeout(() => setLoadingMessage('Here you go,Thank you for your time'), 1000)
            ];

            let loadingTimeout = setTimeout(() => {
                const correctLicenseNumber = '123456';
                setIsLoading(false);
                if (licenseNumber === correctLicenseNumber) {
                    setModalVisible(false);
                    navigation.navigate('LawyerBottomNav');
                } else {
                    Alert.alert('Error', 'Invalid license number. Please try again.');
                }
            }, 30000);

            return () => {
                messageTimeouts.forEach(timeout => clearTimeout(timeout));
                clearTimeout(loadingTimeout);
            };
        }
    }, [isLoading, licenseNumber, navigation]);

    const verifyLicenseNumber = () => {
        setIsLoading(true);
        Animated.timing(progress, {
            toValue: 1,
            duration: 30000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.maincontinue}>
            <ImageBackground source={legalback} resizeMode='cover' style={styles.bg}>
                <View style={styles.welcome}>
                    <View style={styles.welcometext}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={{ marginTop: 40, marginHorizontal: 30 }}>
                            <Ionicons name="home-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.continue}>
                        <View style={styles.continuetext}>
                            <Text style={styles.hello}>Hello!</Text>
                            <Text style={styles.wish}>Do you wish to continue as</Text>
                        </View>
                        <View style={styles.continuechoice}>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.continuebtn}>
                                <Fontisto name="person" size={30} color="white" />
                                <Text style={styles.btnchoice}>A LAWYER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('CivilianBottomNav')} style={styles.continuebtn}>
                                <Ionicons name="person-outline" size={30} color="white" />
                                <Text style={styles.btnchoice}>A CIVILIAN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    {!isLoading ? (
                        <>
                            <Text style={styles.modalText}>Enter License Number For Verification</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setLicenseNumber}
                                value={licenseNumber}
                                placeholder="Input Your License Number here"
                                placeholderTextColor={"black"}
                            />
                            <TouchableOpacity
                                style={styles.verifyButton}
                                onPress={verifyLicenseNumber}
                            >
                                <Text style={styles.verifyButtonText}>Verify</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <LottieView style={{ width: 100, height: 100 }} progress={progress} source={rounded} />
                            <Text style={styles.loadingMessage}>{loadingMessage}</Text>
                        </>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    maincontinue: {
        flex: 1,
        backgroundColor: '#243035',
    },
    bg: {
        flex: 1,
    },
    continue: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: 'white',
        marginTop: 300
    },
    continuetext: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    continuechoice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#323E43',
        borderWidth: 5,
        borderColor: 'white'
    },
    hello: {
        fontSize: 30,
        fontWeight: '200',
        color: '#243035'
    },
    wish: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#243035',
        padding: 5,
    },
    continuebtn: {
        padding: 20,
        alignItems: 'center',
    },
    btnchoice: {
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        fontFamily: 'Courier New'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        width: '80%',
        paddingLeft: 10,
    },
    verifyButton: {
        backgroundColor: '#243035',
        width: 170,
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        marginTop: 10
    },
    verifyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 50
    },
    cancelButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
        width: 170,
        marginTop: 10
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 50
    },
    loadingMessage: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default Continue;
