// LoginScreen.js
import React, {useState} from 'react';
import {View, TextInput, Alert, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import TopSection from '../../components/TopSection';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const requestLocationPermission = async () => {
    let permissionStatus;
    if (Platform.OS === 'android') {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    } else if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
    return permissionStatus === RESULTS.GRANTED;
  };
  const getLocation = async () => {
    try {
      // Request permission to access the location
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to fetch your pincode.',
        );
        return;
      }

      // Get the current location using Geolocation
      Geolocation.getCurrentPosition(info => {
        if (info?.coords) {
          console.log(info, 'DATA');

          // Destructure the coordinates
          const {latitude, longitude} = info.coords;

          // Navigate to the 'Home' screen with location data
          navigation.navigate('Home', {
            latitude,
            longitude,
          });
        } else {
          Alert.alert('Location fetch issue');
        }
      });
    } catch (error) {
      console.error('Error in getting location:', error);
      Alert.alert('Error', 'An error occurred while fetching your location.');
    }
  };
  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem('userData');
    if (!storedUser) return Alert.alert('Error', 'User not found.');

    const {email: storedEmail, password: storedPassword} =
      JSON.parse(storedUser);

    if (email !== storedEmail || password !== storedPassword) {
      return Alert.alert('Error', 'Invalid credentials.');
    }
    getLocation();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopSection />
      <View style={{padding: 16}}>
        <Text style={styles.titleText}>Sign In</Text>
        <View style={styles.container}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <Button
            title="Sign Up"
            onPress={handleLogin}
            asTouchable
            style={styles.signUpBtn}>
            <Text style={{color: '#fff', fontSize: 16}}>Log In</Text>
          </Button>
          <Text style={{textAlign: 'center'}}>OR</Text>
          <Button
            title="Sign Up"
            onPress={() => {}}
            asTouchable
            style={{backgroundColor: '#213578', padding: 12, borderRadius: 32}}>
            <Text style={{color: '#fff', fontSize: 16}}>
              Login with FaceBook
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    fontSize: 14,
    fontWeight: '400',
    borderWidth: 1,
    borderRadius: 32,
    borderColor: '#D3D3D3',
    paddingHorizontal: 16,
    color: '#000',
  },
  titleText: {
    fontSize: 24,
    color: '#FF033E',
  },
  container: {
    paddingTop: 18,
    gap: 16,
  },
  signUpBtn: {
    padding: 12,
    borderRadius: 32,
    backgroundColor: '#FF033E',
  },
});
