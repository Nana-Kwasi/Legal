import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';

const LawyerSingularCases = ({ lawyer }) => {
    const [pressed, setPressed] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');

    useEffect(() => {
        // Randomly select color once before rendering
        setBackgroundColor(getRandomColor());
    }, []);

    useEffect(() => {
        // Fetch phone number, email, and WhatsApp number from lawyer data
        // Assuming lawyer data contains phoneNumber, email, and whatsappNumber properties
        setPhoneNumber(lawyer.phoneNumber || '');
        setEmail(lawyer.email || '');
        setWhatsappNumber(lawyer.whatsappNumber || '');
    }, [lawyer]);

    function getRandomColor() {
        const colors = ['#263238', '#4E342E', '#1B5E20', '#3E2723']; // Darker colors matching with white text
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const handlePhonePress = () => {
        console.log("Phone icon pressed");
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };
    
    const handleEmailPress = () => {
        console.log("Email icon pressed");
        if (email) {
            Linking.openURL(`mailto:${email}`);
        }
    };
    
    const handleWhatsappPress = () => {
        console.log("WhatsApp icon pressed");
        if (whatsappNumber) {
            Linking.openURL(`whatsapp://send?phone=${whatsappNumber}`);
        }
    };
    
    return (
        <View>
            <View style={[styles.card, { backgroundColor }]}>
                <View style={styles.caseContent}>
                    <MaterialIcons name={pressed ? "thumb-up-alt" : "thumb-up-off-alt"} size={20} color="#fff" />
                    <Text style={styles.caseText}>{lawyer}</Text>
                </View>
                <View style={styles.additionalInfo}>
                    <TouchableOpacity onPress={handlePhonePress}>
                        <MaterialIcons name="phone" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.infoText}>{phoneNumber}</Text>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.infoText}>{email}</Text>
                    <TouchableOpacity onPress={handleWhatsappPress}>
                        <MaterialIcons name="chat" size={20} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.infoText}>{whatsappNumber}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        marginRight: 5,
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
});

export default LawyerSingularCases;


