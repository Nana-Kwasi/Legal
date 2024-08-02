import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import app from '../../Authentication/Firebase/Config';
import { Ionicons } from '@expo/vector-icons'; 

const LawyerActivity = ({navigation}) => {

    const auth = getAuth(app);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigation.navigate('Continue')
            console.log('Signed Out');
          }).catch((error) => {
            console.log(error);
          });
          navigation.navigate('Home')
    };

    return (
        <SafeAreaView style={styles.activity}>
            <View style={styles.mainactivity}>

            </View>
            <View style={styles.activitycover}>
                <View style={styles.activityemail}>
                    <Ionicons name="caret-forward-outline" size={20} color="#243035" />
                    <Text style={styles.email}> {auth.currentUser?.email} </Text>
                </View>
                <TouchableOpacity style={styles.signOutbtn} onPress={handleSignOut}>
                    <Text style={styles.signOut}>SIGN OUT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    activity: {flex: 1},
    mainactivity: {
        flex: 1,
        backgroundColor: '#243035'
    },
    activitycover: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    activityemail: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    email: {
        fontSize: 15,
        fontWeight: '200',
        color: '#243035',
        fontFamily: 'KohinoorTelugu-Medium' 
    },
    signOutbtn:{
        backgroundColor:'#243035',
        marginVertical: 10,
        margin: 5
    },
    signOut: {
        color: 'white',
        fontWeight: 'bold',
        padding: 15,
        fontFamily: 'KohinoorTelugu-Medium' 
    },
})

export default LawyerActivity;
