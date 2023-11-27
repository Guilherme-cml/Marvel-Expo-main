import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, TextInput, Text, TouchableOpacity, ImageBackground} from 'react-native';
import RNModal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './Tab.Routes';
import { useFonts } from 'expo-font'

export default function App() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0.25)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    'Adventure': require('../assets/fonts/Adventure.otf'),
  },)

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -200,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation completed, show the modal
      setModalVisible(true);
    });
  }, [scaleAnim, translateYAnim]);

  const handleLogin = () => {
    // Add your login logic here
    setModalVisible(false);
    // Navigate to the tab-based content (Personagens as the first tab)
    navigation.navigate('MainTabs', { screen: 'Personagens' });
  };

  return (
    <ImageBackground
      source={require('../assets/the-avengers-team.gif')}
      style={styles.container}
    >
      <Animated.Image
        resizeMode="contain"
        source={require('../assets/marvel.png')}
        style={[
          styles.image,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      />

      <RNModal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        onBackdropPress={() => setModalVisible(true)}
        useNativeDriver
      >
        <View style={styles.modalContent}>
            
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#000000"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
        </View>
      </RNModal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  image: {
    width: '90%',
    height: '100%',
    
  },
  modalContent: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    padding: 25,
    paddingTop: 30,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  input: {
    height: 46,
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 20,
    opacity: 1.0,
    textAlign: 'center',
    fontFamily: 'Adventure',
    fontSize: 25,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'black',
    opacity: 1.0,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Adventure',
  },
 
});