// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const LawyerSingularCases = ({ lawyer }) => {
//     const [pressed, setPressed] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [whatsappNumber, setWhatsappNumber] = useState('');
//     const navigation = useNavigation();

//     useEffect(() => {
//         setBackgroundColor(getRandomColor());
//     }, []);

//     useEffect(() => {
//         setPhoneNumber(lawyer.phoneNumber || '');
//         setEmail(lawyer.email || '');
//         setWhatsappNumber(lawyer.whatsappNumber || '');
//     }, [lawyer]);

//     function getRandomColor() {
//         const colors = ['#263238', '#4E342E', '#1B5E20', '#3E2723']; // Darker colors matching with white text
//         return colors[Math.floor(Math.random() * colors.length)];
//     }

//     const handleThumbPress = () => {
//         Alert.alert(
//             "Confirmation",
//             "Do you want to take on this case?",
//             [
//                 {
//                     text: "No",
//                     onPress: () => setPressed(false),
//                     style: "cancel"
//                 },
//                 {
//                     text: "Yes",
//                     onPress: () => {
//                         setPressed(true);
//                         navigation.navigate('Chat'); // Replace 'ChatScreen' with your actual chat screen name
//                     }
//                 }
//             ],
//             { cancelable: true }
//         );
//     };

//     return (
//         <View>
//             <View style={[styles.card, { backgroundColor }]}>
//                 <View style={styles.caseContent}>
//                     <TouchableOpacity onPress={handleThumbPress}>
//                         <MaterialIcons name={pressed ? "thumb-up-alt" : "thumb-up-off-alt"} size={30} color="#fff" />
//                     </TouchableOpacity>
//                     <Text style={styles.caseText}>{lawyer}</Text>
//                 </View>
//                 <View style={styles.additionalInfo}>
//                     <Text style={styles.infoText}>{phoneNumber}</Text>
//                     <Text style={styles.infoText}>{email}</Text>
//                     <Text style={styles.infoText}>{whatsappNumber}</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         margin: 10,
//         padding: 15,
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         justifyContent: 'flex-start',
//         borderRadius: 10,
//     },
//     caseContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     caseText: {
//         color: '#fff',
//         fontSize: 16,
//         marginLeft: 10,
//         flex: 1,
//     },
//     additionalInfo: {
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         marginTop: 10,
//     },
//     infoText: {
//         color: '#fff',
//         fontSize: 14,
//         marginLeft: 5,
//     },
// });

// export default LawyerSingularCases;







// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
// import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const LawyerSingularCases = ({ lawyer }) => {
//     const { id, issues: caseName, phoneNumber, email } = lawyer;
//     const [pressed, setPressed] = useState(false);
//     const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
//     const navigation = useNavigation();

//     useEffect(() => {
//         setBackgroundColor(getRandomColor());
//     }, []);

//     function getRandomColor() {
//         const colors = ['#263238', '#4E342E', '#1B5E20', '#3E2723']; // Darker colors matching with white text
//         return colors[Math.floor(Math.random() * colors.length)];
//     }

//     const handleThumbPress = () => {
//         Alert.alert(
//             "Confirmation",
//             "Do you want to take on this case?",
//             [
//                 {
//                     text: "No",
//                     onPress: () => setPressed(false),
//                     style: "cancel"
//                 },
//                 {
//                     text: "Yes",
//                     onPress: () => {
//                         setPressed(true);
//                         navigation.navigate('Chat'); // Replace 'Chat' with your actual chat screen name
//                     }
//                 }
//             ],
//             { cancelable: true }
//         );
//     };

//     const handlePhonePress = () => {
//         if (phoneNumber) {
//             Linking.openURL(`tel:${phoneNumber}`);
//         }
//     };

//     const handleEmailPress = () => {
//         if (email) {
//             Linking.openURL(`mailto:${email}`);
//         }
//     };

//     const handleWhatsAppPress = () => {
//         if (phoneNumber) {
//             Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
//         }
//     };

//     return (
//         <View>
//             <View style={[styles.card, { backgroundColor }]}>
//                 <View style={styles.caseContent}>
//                     <TouchableOpacity onPress={handleThumbPress}>
//                         <MaterialIcons name={pressed ? "thumb-up-alt" : "thumb-up-off-alt"} size={30} color="#fff" />
//                     </TouchableOpacity>
//                     <Text style={styles.caseText}>{caseName || "No case name available"}</Text> 
//                 </View>
//                 <View style={styles.additionalInfo}>
//                     {/* <Text style={styles.infoText}>CASE ID: {id || "No ID available"}</Text> */}
//                 </View>
//                 <View style={styles.iconRow}>
//                     <TouchableOpacity onPress={handlePhonePress}>
//                         <MaterialIcons name="phone" size={24} color="#fff" style={styles.icon} />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={handleEmailPress}>
//                         <MaterialIcons name="email" size={24} color="#fff" style={styles.icon} />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={handleWhatsAppPress}>
//                         <FontAwesome name="whatsapp" size={24} color="#fff" style={styles.icon} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         margin: 10,
//         padding: 15,
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         justifyContent: 'flex-start',
//         borderRadius: 10,
//     },
//     caseContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     caseText: {
//         color: '#fff',
//         fontSize: 16,
//         marginLeft: 10,
//         flex: 1,
//     },
//     additionalInfo: {
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         marginTop: 10,
//     },
//     infoText: {
//         color: '#fff',
//         fontSize: 14,
//         marginLeft: 5,
//     },
//     iconRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//         width: '50%',
//     },
//     icon: {
//         marginHorizontal: 10,
//     },
// });

// export default LawyerSingularCases;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../../Authentication/Firebase/Config';

const LawyerSingularCases = ({ lawyer }) => {
    const { id, issues: caseName, phoneNumber, email, taken } = lawyer; // Add 'taken' field
    const [pressed, setPressed] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
    const navigation = useNavigation();
    const db = getFirestore(app);

    useEffect(() => {
        setBackgroundColor(getRandomColor());
    }, []);

    function getRandomColor() {
        const colors = ['#263238', '#4E342E', '#1B5E20', '#3E2723']; // Darker colors matching with white text
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const handleThumbPress = () => {
        Alert.alert(
            "Confirmation",
            "Do you want to take on this case?",
            [
                {
                    text: "No",
                    onPress: () => setPressed(false),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        setPressed(true);
                        navigation.navigate('Chat'); // Replace 'Chat' with your actual chat screen name
                        // Update Firestore document to mark the case as taken
                        const caseDocRef = doc(db, "Cases", id);
                        await updateDoc(caseDocRef, {
                            taken: true
                        });
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handlePhonePress = () => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const handleEmailPress = () => {
        if (email) {
            Linking.openURL(`mailto:${email}`);
        }
    };

    const handleWhatsAppPress = () => {
        if (phoneNumber) {
            Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
        }
    };

    return (
        <View>
            <View style={[styles.card, { backgroundColor }]}>
                <View style={styles.caseContent}>
                    <TouchableOpacity onPress={handleThumbPress} disabled={taken}>
                        <MaterialIcons name={pressed ? "thumb-up-alt" : "thumb-up-off-alt"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.caseText}>{caseName || "No case name available"}</Text>
                    {taken && <Text style={styles.takenText}>Taken</Text>}
                </View>
                <View style={styles.additionalInfo}></View>
                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={handlePhonePress}>
                        <MaterialIcons name="phone" size={24} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <MaterialIcons name="email" size={24} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleWhatsAppPress}>
                        <FontAwesome name="whatsapp" size={24} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    caseContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    caseText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    takenText: {
        color: '#ff0000', 
        fontSize: 40,
        marginLeft: 10,
    },
    additionalInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '50%',
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default LawyerSingularCases;
