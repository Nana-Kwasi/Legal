import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useCases } from '../Civilian/CaseContext';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const MyClients = () => {
    const { lawyerCases, cases } = useCases();
    const navigation = useNavigation();

    const takenCases = lawyerCases.map(caseId =>
        cases.find(c => c.id === caseId)
    ).filter(Boolean);

    const handleContactPress = (type, value) => {
        if (type === 'phone') {
            Linking.openURL(`tel:${value}`);
        } else if (type === 'email') {
            Linking.openURL(`mailto:${value}`);
        } else if (type === 'whatsapp') {
            Linking.openURL(`whatsapp://send?phone=${value}`);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={34} color="#000" />
                <Text style={styles.backButtonText}>YOUR CLIENTS</Text>
            </TouchableOpacity>

            <FlatList
                data={takenCases}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.caseCard}>
                        <View style={styles.cardContent}>
                            {/* <View style={styles.textContent}>
                                <Text style={styles.caseDetails}>{item.email}</Text>
                            </View> */}
                            <Ionicons name="person-circle-outline" size={60} color="#333" style={styles.profileIcon} />
                            <Text style={styles.caseDetails}>{item.email}</Text>
 
                        </View>
                        <View style={styles.iconRow}>
                            <TouchableOpacity onPress={() => handleContactPress('phone', item.phoneNumber)}>
                                <MaterialIcons name="phone" size={24} color="#000" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleContactPress('email', item.email)}>
                                <MaterialIcons name="email" size={24} color="#000" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleContactPress('whatsapp', item.phoneNumber)}>
                                <FontAwesome name="whatsapp" size={24} color="#000" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No clients assigned yet.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        padding: 20,
    },
    caseCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
    },
    caseDetails: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
        marginTop: 10,
        color: 'red',
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 90,
    },
    backButtonText: {
        fontSize: 18,
        marginLeft: 90,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    profileIcon: {
        marginLeft: 15,
    },
});

export default MyClients;
