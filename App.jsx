import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
