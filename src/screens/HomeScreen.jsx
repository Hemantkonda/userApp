// HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState({});
  const {latitude, longitude} = route.params;

  useEffect(() => {
    AsyncStorage.getItem('userData').then(data => setUser(JSON.parse(data)));
  }, []);

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('SignUp');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome, {user.name}!</Text>
        <Text style={styles.locationText}>
          Location: {latitude}, {longitude}
        </Text>
        <Button
          title="Go to Profile"
          asTouchable
          onPress={handleNavigateToProfile}
          style={{backgroundColor: '#213578', padding: 18, borderRadius: 32}}>
          <Text style={{color: '#fff', fontSize: 16}}>Go to Profile</Text>
        </Button>
        <Button
          title="Logout"
          asTouchable
          onPress={handleLogout}
          style={{backgroundColor: '#213578', padding: 18, borderRadius: 32}}>
          <Text style={{color: '#fff', fontSize: 16}}>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    color: '#FF033E',
  },
  locationText: {
    fontSize: 18,
  },
  container: {
    paddingHorizontal: 16,
    gap: 20,
  },
});
