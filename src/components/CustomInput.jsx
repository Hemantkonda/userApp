import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = ({style, placeholder, onChange = () => {}}) => {
  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
