import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import legalback from '../assets/legalback.jpg';

const Continue = ({navigation}) => {

    return (
        <SafeAreaView style={styles.maincontinue}>
            <ImageBackground source={legalback} resizeMode='cover' style={styles.bg}>
            <ScrollView >
                <View style={styles.continue}>
                    <View style={styles.continuetext}>
                        <Text style={styles.hello}>Hello!</Text>
                        <Text style={styles.wish}>Do you wish to continue as</Text>   
                    </View>
                    <View style={styles.continuechoice}>

                        <TouchableOpacity onPress={()=>{navigation.navigate('LawyerBottomNav')}} style={styles.continuebtn}>
                            <Fontisto name="person" size={30} color="white" />
                            <Text style={styles.btnchoice}>A LAWYER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('CivilianBottomNav')}} style={styles.continuebtn}>
                            <Ionicons name="person-outline" size={30} color="white" />
                            <Text style={styles.btnchoice}>A CIVILIAN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    maincontinue: {
        flex: 1,
        backgroundColor: '#243035',
    },
    bg: {
        flex: 1,
    },
    continue:{
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: 'white',
        marginTop: 300
    },
    continuetext: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    continuechoice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#323E43',
        borderWidth: 5,
        borderColor: 'white'
    },
    hello: {
        fontSize: 30,
        fontWeight: '200',
        color: '#243035'
    },
    wish:{
        fontSize: 13,
        fontWeight: 'bold',
        color: '#243035',
        padding: 5,
    },
    continuebtn:{
        padding: 20,
        alignItems: 'center',
    },
    btnchoice:{
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        fontFamily: 'Courier New'  
    },
})

export default Continue;
