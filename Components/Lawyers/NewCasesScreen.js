import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import app from '../Authentication/Firebase/Config';
import { getFirestore, query, collection, onSnapshot } from 'firebase/firestore';
import { addIssues } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import LawyerSingularCases from './LawyerSingularCases'; // Ensure this import is correct
import { MaterialIcons } from '@expo/vector-icons';

const NewCasesScreen = () => {
    const db = getFirestore(app);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, "Cases"));
            onSnapshot(q, (querySnapshot) => {
                const issues = [];
                querySnapshot.forEach((doc) => {
                    issues.push(doc.data());
                });
                dispatch(addIssues(issues));
            });
        };
        getData();
    }, [dispatch]);

    const showcases = useSelector((state) => state.Reducer1);
    const cases = showcases.issues;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.maincase}>
                <MaterialIcons name="my-library-books" size={40} color="white" />
                <Text style={styles.maincasetext}>NEW CASES</Text>
            </View>
            <View style={styles.display}>
                <FlatList
                    data={cases}
                    renderItem={({ item }) => (
                        <LawyerSingularCases lawyer={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    maincase: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323E43',
        borderTopEndRadius: 100,
        borderTopStartRadius: 100
    },
    maincasetext: {
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    display: {
        flex: 1
    }
});

export default NewCasesScreen;
