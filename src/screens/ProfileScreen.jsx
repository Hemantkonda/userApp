import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TopSection from '../components/TopSection';
import Button from '../components/Button';

export default function ProfileScreen() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userData').then(data => {
      if (data) {
        setUser(JSON.parse(data));
      }
    });
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        return cameraPermission === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS permissions are handled via the app's Info.plist
    }
  };

  const captureImage = async type => {
    if (type === 'camera') {
      const hasCameraPermission = await requestCameraPermission();
      if (!hasCameraPermission) {
        Alert.alert(
          'Permission Denied',
          'You need to allow camera permissions to proceed.',
        );
        return;
      }
    }

    const options = {mediaType: 'photo', saveToPhotos: true};
    const callback = response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets) {
        setImage(response.assets[0].uri);
      }
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  return (
    <>
      <TopSection />
      <View style={styles.container}>
        <View>
          <Text style={styles.locationText}>Name: {user.name}</Text>
          <Text style={styles.locationText}>Phone: {user.phone}</Text>
          <Text style={styles.locationText}>Email: {user.email}</Text>
        </View>
        {image && (
          <Image
            source={{uri: image}}
            style={{
              width: 300,
              height: 300,
              resizeMode: 'contain',
            }}
          />
        )}

        <Button
          asTouchable
          title="Capture Image"
          onPress={() => captureImage('camera')}
          style={{backgroundColor: '#213578', padding: 18, borderRadius: 32}}>
          <Text style={{color: '#fff', fontSize: 16}}>Capture Image</Text>
        </Button>
        <Button
          title="Pick from Gallery"
          onPress={() => captureImage('gallery')}
          style={{backgroundColor: '#213578', padding: 18, borderRadius: 32}}
          asTouchable>
          <Text style={{color: '#fff', fontSize: 16}}>Pick from Gallery</Text>
        </Button>
      </View>
    </>
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
