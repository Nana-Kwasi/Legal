import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Alert, Modal } from 'react-native';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons'; 
import app from '../../Authentication/Firebase/Config';
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
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
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false); // State for login spinner

    const handleLogIn = async () => {
        setIsLoggingIn(true); // Start spinner for login
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
            setIsLoggingIn(false); // Stop spinner after login attempt
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        try {
            setIsResettingPassword(true); // Start spinner for reset

            // Send a password reset email to the provided email
            await sendPasswordResetEmail(auth, email);

            Alert.alert('Success', 'Password reset email has been sent to your email address.');
            setModalVisible(false); // Close modal after sending email
        } catch (error) {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', 'Failed to send password reset email. Please try again.');
        } finally {
            setIsResettingPassword(false); // Stop spinner for reset
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
                    {/* Modified Login Button */}
                    <TouchableOpacity onPress={handleLogIn} style={styles.continuecontainer}>
                        <Animated.View style={isLoggingIn ? styles.spinButton : {}}>
                            <Text style={styles.continue}>LOG IN</Text>
                            {isLoggingIn && (
                                <LottieView style={{ width: 100, height: 100 }} autoPlay loop source={rounded} />
                            )}
                        </Animated.View>
                    </TouchableOpacity>

                    {/* Forgot Password Button */}
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Modal for Resetting Password */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={{fontSize:20, color:"red"}}>Reset Password</Text>
                        <TextInput
                            value={email} // Pre-filled email from input
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            placeholderTextColor="#a4a6a5"
                            keyboardType="email-address"
                            style={styles.modalInput}
                        />
                        <TouchableOpacity onPress={handlePasswordReset} style={styles.resetButton}>
                            <Animated.View style={isResettingPassword ? styles.spinButton : {}}>
                                <Text style={styles.resetButtonText}>Send Reset Email</Text>
                                {isResettingPassword && (
                                    <LottieView style={{ width: 100, height: 100 }} autoPlay loop source={rounded} />
                                )}
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
        log: {
            flex: 1,
            backgroundColor: '#243035',
        },
        welcome: {
            flex: 0.1,
            marginTop: 70,
        },
        welcometext: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            paddingHorizontal: 10,
        },
        welcomeback: {
            color: 'white',
            fontSize: 30,
            marginLeft: 70,
            fontFamily: 'Courier New',
        },
        fill: {
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 1,
            padding: 10,
            alignItems: 'center',
        },
        filltext: {
            color: 'white',
            paddingHorizontal: 10,
            fontFamily: 'Euphemia UCAS',
        },
        form: {
            flex: 0.9,
            paddingTop: 10,
        },
        formcontainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginVertical: 35,
        },
        formicon: {
            paddingHorizontal: 5,
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
            fontWeight: 'bold',
        },
        bgg: {
            flex: 1,
        },
        spinButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        forgotPasswordContainer: {
            marginTop: 10,
            alignItems: 'center',
        },
        forgotPasswordText: {
            color: 'white',
            fontSize: 19,
            fontFamily: 'Euphemia UCAS',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalView: {
            width: 300,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            position: 'absolute',  // Add this line
            top: '50%',  // Center vertically
            left: '50%',  // Center horizontally
            transform: [{ translateX: -150 }, { translateY: -150 }],  // Adjust based on modal width/height
        },
        modalText: {
            fontSize: 18,
            marginBottom: 15,
            textAlign: 'center',
        },
        modalInput: {
            fontSize: 15,
            padding: 10,
            width: '100%',
            backgroundColor: '#f0f0f0',
            marginVertical: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
        },
        resetButton: {
            backgroundColor: '#243035',
            padding: 10,
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
            marginVertical: 10,
        },
        resetButtonText: {
            color: 'white',
            fontSize: 19,
        },
        closeButton: {
            padding: 10,
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#ccc',
        },
        closeButtonText: {
            color: '#000',
            fontSize: 16,
        },
    spinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default LogIn;


// import React, { useEffect, useState, useRef } from 'react';
// import { StyleSheet, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, ImageBackground, Animated, Alert, Modal } from 'react-native';
// import { Foundation, Ionicons, Feather } from '@expo/vector-icons'; 
// import app from '../../Authentication/Firebase/Config';
// import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';  // Import sendPasswordResetEmail
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import energy from '../../assets/energy.jpg';
// import LottieView from 'lottie-react-native';
// import rounded from '../../assets/rounded.json';

// const LogIn = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);  // New state for modal visibility
//     const [isResettingPassword, setIsResettingPassword] = useState(false); // For spinner during password reset
//     const auth = getAuth(app);

//     // Function for Logging In (remains the same)
//     const handleLogIn = async () => {
//         try {
//             const userCredentials = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredentials.user;
//             console.log('Logged In with:', user.email);
//             // Other login logic
//         } catch (error) {
//             Alert.alert('Error', 'Invalid email or password.');
//         }
//     };

//     // Updated function for password reset using sendPasswordResetEmail
//     const handlePasswordReset = async () => {
//         if (!email) {
//             Alert.alert('Error', 'Please enter your email address.');
//             return;
//         }

//         try {
//             setIsResettingPassword(true); // Start spinner

//             // Send a password reset email to the provided email
//             await sendPasswordResetEmail(auth, email);

//             Alert.alert('Success', 'Password reset email has been sent to your email address.');
//             setModalVisible(false); // Close modal after sending email
//         } catch (error) {
//             console.error('Error sending password reset email:', error);
//             Alert.alert('Error', 'Failed to send password reset email. Please try again.');
//         } finally {
//             setIsResettingPassword(false); // Stop spinner
//         }
//     };

//     useEffect(() => {
//         const load = async () => {
//             try {
//                 const savedEmail = await AsyncStorage.getItem('MyEmail');
//                 if (savedEmail !== null) {
//                     setEmail(savedEmail);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         load();
//     }, []);
//     return (
//         <SafeAreaView style={styles.log}>
//             <ImageBackground resizeMode='cover' source={energy} style={styles.bgg}>
//                 <View style={styles.welcome}>
//                     <View style={styles.welcometext}>
//                         <TouchableOpacity onPress={() => { navigation.navigate('Home'); }}>
//                             <Ionicons name="home-outline" size={25} color="white" />
//                         </TouchableOpacity>
//                         <Text style={styles.welcomeback}>WELCOME BACK!</Text>
//                     </View>
//                 </View>
//                 <ScrollView style={styles.form}>
//                     <View style={styles.fill}>
//                         <Text style={styles.filltext}>Fill in the forms below to continue</Text>
//                         <Foundation name="clipboard-pencil" size={30} color="white" />
//                     </View>
//                     <View style={styles.formcontainer}>
//                         <Ionicons style={styles.formicon} name="mail-outline" size={20} color="white" />
//                         <TextInput
//                             value={email}
//                             onChangeText={(text) => setEmail(text)}
//                             placeholderTextColor='#a4a6a5'
//                             autoCorrect={false}
//                             autoComplete='off'
//                             keyboardType='email-address'
//                             style={styles.forminput}
//                             placeholder='Email Address'
//                         />
//                     </View>
//                     <View style={styles.formcontainer}>
//                         <Feather style={styles.formicon} name="lock" size={20} color="white" />
//                         <TextInput
//                             value={password}
//                             onChangeText={(text) => setPassword(text)}
//                             placeholderTextColor='#a4a6a5'
//                             secureTextEntry={true}
//                             autoCorrect={false}
//                             autoCapitalize='none'
//                             style={styles.forminput}
//                             placeholder='Password'
//                         />
//                     </View>
//                     <TouchableOpacity onPress={handleLogIn} style={styles.continuecontainer}>
//                         <Text style={styles.continue}>LOG IN</Text>
//                     </TouchableOpacity>

//                     {/* Forgot Password Button */}
//                     <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.forgotPasswordContainer}>
//                         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                     </TouchableOpacity>
//                 </ScrollView>

//                 {/* Modal for Resetting Password */}
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => setModalVisible(false)}
//                 >
//                     <View style={styles.modalView}>
//                         <Text style={{fontSize:20, color:"red"}}>Reset Password</Text>
//                         <TextInput
//                             value={email} // Pre-filled email from input
//                             onChangeText={setEmail}
//                             placeholder="Enter your email"
//                             placeholderTextColor="#a4a6a5"
//                             keyboardType="email-address"
//                             style={styles.modalInput}
//                         />
//                         <TouchableOpacity onPress={handlePasswordReset} style={styles.resetButton}>
//                             <Animated.View style={isResettingPassword ? styles.spinButton : {}}>
//                                 <Text style={styles.resetButtonText}>Send Reset Email</Text>
//                                 {isResettingPassword && (
//                                     <LottieView style={{ width: 100, height: 100 }} autoPlay loop source={rounded} />
//                                 )}
//                             </Animated.View>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
//                             <Text style={styles.closeButtonText}>Close</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Modal>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     log: {
//         flex: 1,
//         backgroundColor: '#243035',
//     },
//     welcome: {
//         flex: 0.1,
//         marginTop: 70,
//     },
//     welcometext: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 30,
//         paddingHorizontal: 10,
//     },
//     welcomeback: {
//         color: 'white',
//         fontSize: 30,
//         marginLeft: 70,
//         fontFamily: 'Courier New',
//     },
//     fill: {
//         flexDirection: 'row',
//         alignSelf: 'center',
//         marginVertical: 1,
//         padding: 10,
//         alignItems: 'center',
//     },
//     filltext: {
//         color: 'white',
//         paddingHorizontal: 10,
//         fontFamily: 'Euphemia UCAS',
//     },
//     form: {
//         flex: 0.9,
//         paddingTop: 10,
//     },
//     formcontainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 20,
//         marginVertical: 35,
//     },
//     formicon: {
//         paddingHorizontal: 5,
//     },
//     forminput: {
//         fontSize: 15,
//         padding: 13,
//         width: 330,
//         backgroundColor: '#323E43',
//         color: 'white',
//         fontFamily: 'Euphemia UCAS',
//         borderWidth: 1,
//         borderColor: 'white',
//     },
//     continuecontainer: {
//         marginVertical: 10,
//         borderColor: 'white',
//         alignItems: 'center',
//         marginHorizontal: 130,
//     },
//     continue: {
//         padding: 10,
//         color: 'white',
//         fontSize: 20,
//         fontFamily: 'Euphemia UCAS',
//         fontWeight: 'bold',
//     },
//     bgg: {
//         flex: 1,
//     },
//     spinButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     forgotPasswordContainer: {
//         marginTop: 10,
//         alignItems: 'center',
//     },
//     forgotPasswordText: {
//         color: 'white',
//         fontSize: 19,
//         fontFamily: 'Euphemia UCAS',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalView: {
//         width: 300,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//         position: 'absolute',  // Add this line
//         top: '50%',  // Center vertically
//         left: '50%',  // Center horizontally
//         transform: [{ translateX: -150 }, { translateY: -150 }],  // Adjust based on modal width/height
//     },
//     modalText: {
//         fontSize: 18,
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     modalInput: {
//         fontSize: 15,
//         padding: 10,
//         width: '100%',
//         backgroundColor: '#f0f0f0',
//         marginVertical: 10,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//     },
//     resetButton: {
//         backgroundColor: '#243035',
//         padding: 10,
//         borderRadius: 5,
//         width: '100%',
//         alignItems: 'center',
//         marginVertical: 10,
//     },
//     resetButtonText: {
//         color: 'white',
//         fontSize: 19,
//     },
//     closeButton: {
//         padding: 10,
//         borderRadius: 5,
//         width: '100%',
//         alignItems: 'center',
//         backgroundColor: '#ccc',
//     },
//     closeButtonText: {
//         color: '#000',
//         fontSize: 16,
//     },
// });

// export default LogIn;
