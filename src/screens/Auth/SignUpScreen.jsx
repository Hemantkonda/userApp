import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopSection from '../../components/TopSection';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
  });
  const handleInputChange = (field, value) =>
    setFormData({...formData, [field]: value});

  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = password => passwordRegex.test(password);
    const {name, phone, email, password} = formData;
    if (phone?.length > 10) {
      Alert.alert('Error', 'Phone No. Must Be 10 Digits.');
      return false;
    }
    // Check if password meets the criteria
    if (!isValidPassword(password)) {
      Alert.alert(
        'Error',
        'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
      );
      return false;
    }
    if (!name || !phone || !email || !password) {
      Alert.alert('Error', 'All fields except Address are mandatory.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Invalid email address.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    await AsyncStorage.setItem('userData', JSON.stringify(formData));
    await AsyncStorage.getItem('userData').then(data =>
      console.log(JSON.parse(data)),
    );
    Alert.alert('Success', 'Sign up successful!', [
      {text: 'OK', onPress: () => navigation.navigate('Login')},
    ]);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopSection />
      <View style={{padding: 16}}>
        <Text style={styles.titleText}>Create New Account</Text>
        <View style={styles.container}>
          <TextInput
            placeholder="Name"
            onChangeText={text => handleInputChange('name', text)}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <TextInput
            placeholder="Phone"
            keyboardType="phone-pad"
            onChangeText={text => handleInputChange('phone', text)}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => handleInputChange('email', text)}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <TextInput
            placeholder="Address"
            multiline
            onChangeText={text => handleInputChange('address', text)}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={text => handleInputChange('password', text)}
            style={styles.input}
            placeholderTextColor="rgba(34, 34, 34, 0.5)"
          />
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            asTouchable
            style={styles.signUpBtn}>
            <Text style={{color: '#fff', fontSize: 16}}>Sign Up</Text>
          </Button>
          <Text style={{textAlign: 'center'}}>OR</Text>
          <Button
            title="Sign Up"
            onPress={() => {
              navigation.navigate('Login');
            }}
            asTouchable
            style={{backgroundColor: '#213578', padding: 12, borderRadius: 32}}>
            <Text style={{color: '#fff', fontSize: 16}}>Log In</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
