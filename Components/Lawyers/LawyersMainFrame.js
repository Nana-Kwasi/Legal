import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import app from '../../Authentication/Firebase/Config';
import { getFirestore, query, collection, onSnapshot } from 'firebase/firestore';
import { addIssues } from '../../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import SingularCases from '../SingularCases';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LawyerSingularCases from './LawyerSingularCase';







const LawyersMainFrame = () => {
    const db = getFirestore(app);
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('New Cases');

    useEffect(() => {
        const getCases = async () => {
            const q = query(collection(db, "Cases"));
            onSnapshot(q, (querySnapshot) => {
                const issues = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    issues.push({
                        id: doc.id,
                        caseName: data.caseName,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        whatsappNumber: data.whatsappNumber,
                        ...data
                    });
                });
                dispatch(addIssues(issues));
            });
        };
        getCases();
    }, [dispatch]);

    const cases = useSelector((state) => state.Reducer1);
    const receivecases = cases.issues;

    const renderContent = () => {
        const filteredCases = receivecases.filter(caseItem => 
            activeTab === 'New Cases' ? !caseItem.taken : caseItem.taken
        );

        return (
            <FlatList
                data={filteredCases}
                renderItem={({ item }) => <LawyerSingularCases lawyer={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    };

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
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'New Cases' && styles.activeTab]}
                    onPress={() => setActiveTab('New Cases')}>
                    <Text style={[styles.tabText, activeTab === 'New Cases' && styles.activeTabText]}>New Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Taken Cases' && styles.activeTab]}
                    onPress={() => setActiveTab('Taken Cases')}>
                    <Text style={[styles.tabText, activeTab === 'Taken Cases' && styles.activeTabText]}>Taken Cases</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.datadisplay}>
                {renderContent()}
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
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: 'white',
    },
    tab: {
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 19,
        color: '#666',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',

    },
    activeTabText: {
        color: '#501B73',
    },
    datadisplay: {
        flex: 1,
    },
});

export default LawyersMainFrame;
