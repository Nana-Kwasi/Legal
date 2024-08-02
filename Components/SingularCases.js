import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SingularCases = ({pass}) => {
    return (
        <SafeAreaView style={styles.maincase}>
            <View style={styles.maincaseinput}>
            <Ionicons name="arrow-redo-outline" size={20} color="#323E43" />
                <Text style={styles.caseinput}> {pass} </Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    maincase: {
        flex: 1
    },
    maincaseinput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginVertical: 20,
        borderBottomWidth: 1
    },
    caseinput: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
        color: '#323E43',  
        fontFamily: 'KohinoorTelugu-Medium'
    },
});

export default SingularCases;




  //   import React from 'react';
// import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Linking } from 'react-native';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// const SingularCases = ({ pass, phoneNumber, email }) => {

//     const handleEmailPress = () => {
//         Linking.openURL(`mailto:${email}`);
//     };

//     const handlePhonePress = () => {
//         Linking.openURL(`tel:${phoneNumber}`);
//     };

//     const handleWhatsAppPress = () => {
//         const url = `whatsapp://send?phone=${phoneNumber}`;
//         Linking.openURL(url).catch(() => {
//             alert('Make sure WhatsApp is installed on your device');
//         });
//     };

//     return (
//         <SafeAreaView style={styles.maincase}>
//             <View style={styles.maincaseinput}>
//                 <Ionicons name="arrow-redo-outline" size={20} color="#323E43" />
//                 <Text style={styles.caseinput}> {pass} </Text>
//             </View>
//             <View style={styles.iconContainer}>
//                 <TouchableOpacity onPress={handlePhonePress} style={styles.iconButton}>
//                     <MaterialCommunityIcons name="phone" size={24} color="#323E43" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleEmailPress} style={styles.iconButton}>
//                     <MaterialCommunityIcons name="email" size={24} color="#323E43" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleWhatsAppPress} style={styles.iconButton}>
//                     <MaterialCommunityIcons name="whatsapp" size={24} color="#323E43" />
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     maincase: {
//         flex: 1
//     },
//     maincaseinput: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         marginHorizontal: 20,
//         marginVertical: 20,
//         borderBottomWidth: 1
//     },
//     caseinput: {
//         fontWeight: 'bold',
//         fontSize: 15,
//         padding: 10,
//         color: '#323E43',  
//         fontFamily: 'KohinoorTelugu-Medium'
//     },
//     iconContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginHorizontal: 20,
//         marginVertical: 10,
//     },
//     iconButton: {
//         padding: 10,
//     },
// });

// export default SingularCases;
