// import React from 'react';
// import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { getAuth, signOut } from "firebase/auth";
// import app from '../../Authentication/Firebase/Config';

// const LawyerActivity = ({ navigation }) => {
//     const auth = getAuth(app);

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             navigation.navigate('Continue');
//             console.log('Signed Out');
//         }).catch((error) => {
//             console.log(error);
//         });
//         navigation.navigate('Home');
//     };

//     const handleProfilePress = () => {
//         const lawyerId = auth.currentUser.uid; // Assuming the user ID is the document ID
//         console.log('Navigating to ProfileScreen with lawyerId:', lawyerId);
//         navigation.navigate('ProfileScreen', { lawyerId });
//     };

//     return (
//         <SafeAreaView style={styles.activity}>
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.signOutbtn} onPress={handleSignOut}>
//                     <Image source={require('../../assets/log-out.png')} style={styles.icon} />
//                     <Text style={styles.signOut}>SIGN OUT</Text>
//                 </TouchableOpacity>
//                 <View style={styles.profileSection}>
//                     <TouchableOpacity onPress={handleProfilePress}>
//                         <Image source={require('../../assets/profile.png')} style={styles.icon} />
//                     </TouchableOpacity>
//                     <Text style={styles.email}>{auth.currentUser?.email}</Text>
//                 </View>
//             </View>
//             <View style={styles.mainactivity}>
//                 <View style={styles.menu}>
//                     <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyClients')} >
//                         <Image source={require('../../assets/client.png')} style={styles.menuIcon} />
//                         <Text style={styles.menuText}>My Clients</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyCases')}>
//                         <Image source={require('../../assets/briefcase.png')} style={styles.menuIcon} />
//                         <Text style={styles.menuText}>My Cases</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     activity: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 10,
//         backgroundColor: '#ffffff',
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     profileSection: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     mainactivity: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     email: {
//         fontSize: 15,
//         fontWeight: '400',
//         color: '#243035',
//         marginLeft: 10,
//         fontFamily: 'KohinoorTelugu-Medium',
//         marginTop: 40
//     },
//     signOutbtn: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 5,
//     },
//     signOut: {
//         color: 'black',
//         fontWeight: 'bold',
//         marginLeft: 5,
//         fontFamily: 'KohinoorTelugu-Medium',
//         marginTop: 40
//     },
//     icon: {
//         width: 60,
//         height: 60,
//         marginTop: 40
//     },
//     menu: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     menuItem: {
//         alignItems: 'center',
//     },
//     menuIcon: {
//         width: 90,
//         height: 90,
//         marginTop: 90
//     },
//     menuText: {
//         marginTop: 10,
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#243035',
//         fontFamily: 'KohinoorTelugu-Medium',
//     },
// });

// export default LawyerActivity;

import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../Authentication/Firebase/Config';

const LawyerActivity = ({ navigation }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [lawyerId, setLawyerId] = useState(null);
    const [fullName, setFullName] = useState('');
    const userEmail = auth.currentUser ? auth.currentUser.email : null; // Add check here

    useEffect(() => {
        if (userEmail) {  // Check if userEmail is not null
            const fetchLawyerData = async () => {
                try {
                    const q = query(collection(db, 'Lawyer'), where('email', '==', userEmail));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            setLawyerId(doc.id);
                            setFullName(doc.data().fullName); // Fetch the full name
                        });
                    } else {
                        console.log('No matching documents.');
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            };

            fetchLawyerData();
        } else {
            console.log('User is not authenticated or email is not available.');
        }
    }, [userEmail]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigation.navigate('LogIn');
        }).catch((error) => {
            console.log(error);
        });
        navigation.navigate('Home');
    };

    const handleProfilePress = () => {
        if (lawyerId) {
            console.log('Navigating to ProfileScreen with lawyerId:', lawyerId);
            navigation.navigate('ProfileScreen', { lawyerId });
        } else {
            console.log('Lawyer ID not found.');
        }
    };

    return (
        <SafeAreaView style={styles.activity}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.signOutbtn} onPress={handleSignOut}>
                    <Image source={require('../../assets/log-out.png')} style={styles.icon} />
                    <Text style={styles.signOut}>SIGN OUT</Text>
                </TouchableOpacity>
                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={handleProfilePress}>
                        <Image source={require('../../assets/profile.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.fullName}>{fullName}</Text> 
                </View>
            </View>
            <View style={styles.mainactivity}>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyClients')}>
                        <Image source={require('../../assets/client.png')} style={styles.menuIcon} />
                        <Text style={styles.menuText}>My Clients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyCases')}>
                        <Image source={require('../../assets/briefcase.png')} style={styles.menuIcon} />
                        <Text style={styles.menuText}>My Cases</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainactivity: {
        flex: 1,
        backgroundColor: 'white',
    },
    fullName: {  
        fontSize: 15,
        fontWeight: '400',
        color: '#243035',
        marginLeft: 10,
        fontFamily: 'KohinoorTelugu-Medium',
        marginTop: 40
    },
    signOutbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    signOut: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 5,
        fontFamily: 'KohinoorTelugu-Medium',
        marginTop: 40
    },
    icon: {
        width: 60,
        height: 60,
        marginTop: 40
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuIcon: {
        width: 90,
        height: 90,
        marginTop: 90
    },
    menuText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#243035',
        fontFamily: 'KohinoorTelugu-Medium',
    },
});

export default LawyerActivity;

