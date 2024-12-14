import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, Button as RNButton} from 'react-native';

const Button = ({asTouchable = false, disabled = false, ...props}) => {
  const Comp = asTouchable ? TouchableOpacity : RNButton;

  return (
    <Comp
      {...props}
      style={[styles.button, props.style, disabled && styles.disabledButton]}
      disabled={disabled}>
      {props.children}
    </Comp>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
