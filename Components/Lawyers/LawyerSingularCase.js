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

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LawyerSingularCases = ({ lawyer }) => {
    const { id, issues: caseName, phoneNumber, email, whatsappNumber } = lawyer;
    const [pressed, setPressed] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
    const navigation = useNavigation();

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
                    onPress: () => {
                        setPressed(true);
                        navigation.navigate('Chat'); // Replace 'Chat' with your actual chat screen name
                    }
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View>
            <View style={[styles.card, { backgroundColor }]}>
                <View style={styles.caseContent}>
                    <TouchableOpacity onPress={handleThumbPress}>
                        <MaterialIcons name={pressed ? "thumb-up-alt" : "thumb-up-off-alt"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.caseText}>{caseName || "No case name available"}</Text> 
                </View>
                <View style={styles.additionalInfo}>
                    <Text style={styles.infoText}>CASE ID: {id || "No ID available"}</Text>
                    <Text style={styles.infoText}>Phone: {phoneNumber || "No phone number available"}</Text>
                    <Text style={styles.infoText}>Email: {email || "No email available"}</Text>
                    <Text style={styles.infoText}>WhatsApp: {phoneNumber || "No WhatsApp number available"}</Text>
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
});

export default LawyerSingularCases;
