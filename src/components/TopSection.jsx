import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from './Icons/ArrowLeft';

const TopSection = ({...props}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const onHandleNavigateToNewSearch = () => {};

  return (
    <>
      <View style={[styles.newVehicleContainer, props.style]}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={styles.iconsAndTextSection}>
          <ArrowLeft stroke={'red'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TopSection;

const styles = StyleSheet.create({
  newVehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  iconsAndTextSection: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
});
