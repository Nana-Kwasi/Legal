import React, { useEffect } from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import app from '.././Authentication/Firebase/Config';
import { getFirestore, query, collection, onSnapshot } from 'firebase/firestore';
import {addIssues} from '.././Redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import SingularCases from './SingularCases';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {MaterialIcons} from '@expo/vector-icons'; 


const MainFrame = () => {

    const db = getFirestore(app);

    const dispatch = useDispatch();

    const insets = useSafeAreaInsets();

    useEffect(()=>{
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
    }, []);

    const showcases = useSelector((state)=>state.Reducer1);

    const cases = showcases.issues
    console.log(cases);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.maincase}>
                <MaterialIcons name="my-library-books" size={40} color="white" />
                <Text style={styles.maincasetext}>CASES</Text>
            </View>
            <View style={styles.display}>
            <FlatList
                data={cases}
                renderItem={(item)=> <SingularCases pass = {item.item.issues} style={{ flex:0.8 }} />} 
                keyExtractor={(item,index)=>index}
                />
            </View>
      </SafeAreaView>
    );
}


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
    },
});

export default MainFrame;
