import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const index = ({
  inputTextRef,
  inputRef,
  placeholder,
  debounceSearch,
}: {
  inputTextRef: React.MutableRefObject<string>;
  inputRef: React.RefObject<TextInput>;
  placeholder?: string;
  debounceSearch?: (text: string) => void;
}) => {
  return (
    <TextInput
      ref={inputRef}
      style={styles.input}
      placeholder={placeholder ? placeholder : 'Enter text'}
      onChangeText={text => {
        inputTextRef.current = text;
        debounceSearch?.(text);
      }}
    />
  );
};

export default index;

const styles = StyleSheet.create({
  input: {
    padding: 13,
    paddingVertical: 18,
    borderColor: '#00000030',
    borderWidth: 1,
    borderRadius: 10,
  },
});
