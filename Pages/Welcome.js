import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure you have react-native-vector-icons or similar

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const notices = [
    "Welcome to our platform, where civilians can easily connect with lawyers.",
    "As a civilian, you can post your cases for lawyers to view.",
    "Lawyers can browse posted cases and express interest by tapping the like icon.",
    "There are three communication channels for lawyers to reach civilians: WhatsApp, Call, and Email.",
    "Our platform does not monitor these communications as they occur outside our app.",
    "Civilians and Lawyers can report issues to us.",
    "Lawyers must input their license number to verify before accessing cases to get access to cases",
    "Both civilians and lawyers must sign up on our platform to use our services.",
    "Our app acts as a bridge, connecting civilians with the right legal professionals."
  ];

  const handleNext = () => {
    if (currentIndex < notices.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.noticeText}>{item}</Text>
      {index < notices.length - 1 && (
        <TouchableOpacity onPress={handleNext} style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward" size={60} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground source={require('../assets/welcom.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notices}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width))}
        />
        {currentIndex === notices.length - 1 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width, // Full width of the screen
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    elevation: 3,
  },
  noticeText: {
    fontSize: 28,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20, 
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black', 
    padding: 15,
    borderRadius: 15,
    width: '190%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default WelcomeScreen;
