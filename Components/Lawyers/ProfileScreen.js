import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../../Authentication/Firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ route, navigation }) => {
    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingField, setEditingField] = useState('');
    const [passwordFields, setPasswordFields] = useState({ newPassword: '', confirmPassword: '' });

    const { lawyerId } = route.params;
    const db = getFirestore(app);

    useEffect(() => {
        const fetchLawyerData = async () => {
            try {
                console.log('Navigating to ProfileScreen with lawyerId:', lawyerId);
                const docRef = doc(db, 'Lawyer', lawyerId);
                console.log('Document reference path:', docRef.path);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const lawyerData = docSnap.data();
                    setLawyer(lawyerData);
                    console.log('Document data:', lawyerData);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLawyerData();
    }, [lawyerId]);

    const handleUpdate = async () => {
        if (editingField === 'password') {
            if (passwordFields.newPassword !== passwordFields.confirmPassword) {
                console.error('New password and confirm password do not match');
                return;
            } else {
                setLawyer({ ...lawyer, password: passwordFields.newPassword });
            }
        }

        try {
            setIsSubmitting(true);
            const docRef = doc(db, 'Lawyer', lawyerId);
            await updateDoc(docRef, lawyer);
            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFieldEdit = (field) => {
        setEditingField(field);
    };

    const handlePasswordChange = (field, value) => {
        setPasswordFields({ ...passwordFields, [field]: value });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (!lawyer) {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={34} color="#000" />
                </TouchableOpacity>
                <Text>No lawyer data found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={34} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.profileHeader}>
                        <Image
                            source={require('../../assets/profile.png')}
                            style={styles.profileIcon}
                        />
                        <Text style={styles.fullName}>{lawyer.fullName}</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.profileContainer}>
                        {[
                            { label: 'Full Name', value: lawyer.fullName, key: 'fullName' },
                            { label: 'Email', value: lawyer.email, key: 'email' },
                            { label: 'Bar Association', value: lawyer.barAssociation, key: 'barAssociation' },
                            { label: 'License Number', value: lawyer.licenseNumber, key: 'licenseNumber' },
                            { label: 'Phone Number', value: lawyer.phoneNumber, key: 'phoneNumber' },
                        ].map(({ label, value, key }) => (
                            <View key={key}>
                                <Text style={styles.label}>{label}:</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={value}
                                        editable={editingField === key}
                                        onChangeText={(text) => setLawyer({ ...lawyer, [key]: text })}
                                    />
                                    <Button title="Edit" onPress={() => handleFieldEdit(key)} />
                                </View>
                            </View>
                        ))}
                        <Text style={styles.label}>Password:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={lawyer.password}
                                editable={editingField === 'password'}
                                secureTextEntry={true}
                                onChangeText={(text) => setLawyer({ ...lawyer, password: text })}
                            />
                            <Button title="Edit" onPress={() => handleFieldEdit('password')} />
                        </View>
                        {editingField === 'password' && (
                            <View>
                                <Text style={styles.label}>New Password:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passwordFields.newPassword}
                                    secureTextEntry={true}
                                    onChangeText={(text) => handlePasswordChange('newPassword', text)}
                                />
                                <Text style={styles.label}>Confirm Password:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passwordFields.confirmPassword}
                                    secureTextEntry={true}
                                    onChangeText={(text) => handlePasswordChange('confirmPassword', text)}
                                />
                            </View>
                        )}
                        {isSubmitting ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    headerContainer: {
        backgroundColor: '#f8f8f8',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    fullName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        padding: 20,
    },
    profileContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#666',
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    backButton: {
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        width:150,
        marginHorizontal:80
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
