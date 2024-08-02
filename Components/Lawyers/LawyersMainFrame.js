import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { collection, query, onSnapshot, getFirestore } from 'firebase/firestore';
import { addIssues } from '../../Redux/Action';
import { useSelector, useDispatch } from 'react-redux';
import app from '../../Authentication/Firebase/Config';
import LawyerSingularCases from './LawyerSingularCase';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

const LawyersMainFrame = () => {
    const db = getFirestore(app);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCases = async () => {
            const q = query(collection(db, "Cases"));
            onSnapshot(q, (querySnapshot) => {
                const issues = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log('Fetched case data:', data); 
                    issues.push(data);
                });
                dispatch(addIssues(issues));
            });
        };
        getCases();
    }, [dispatch]);

    const cases = useSelector((state) => state.Reducer1);
    const receivecases = cases.issues;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.maincase}>
                <MaterialIcons name="my-library-books" size={40} color="white" />
                <Text style={styles.maincasetext}>CASES</Text>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="arrow-collapse-right" size={20} color="white" />
                <Text style={styles.infotext}>Press on the thumbs icon to show interest</Text>
                <MaterialCommunityIcons name="arrow-collapse-left" size={20} color="white" />
            </View>
            <View style={styles.datadisplay}>
                <FlatList
                    data={receivecases}
                    renderItem={({ item }) => (
                        <LawyerSingularCases
                            lawyer={item} 
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
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
        backgroundColor: '#243035',
        borderTopEndRadius: 100,
        borderTopStartRadius: 100,
        padding: 1,
    },
    maincasetext: {
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontFamily: 'MalayalamSangamMN-Bold',
        fontWeight: 'bold'
    },
    info: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323E43',
    },
    infotext: {
        color: 'white',
        fontWeight: '400',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 5,
        fontSize: 13,
    },
    datadisplay: {
        flex: 1,
    },
});

export default LawyersMainFrame;
