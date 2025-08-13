import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import ListComponent from './components/ListComponent/Index';
import CustomInput from '../../components/Input/index';

import {fetchUsers, searchUsers} from '../../redux/Actions/userAction';
import {debounce} from 'lodash';
import {useDispatch} from 'react-redux';

const Index = () => {
  const inputTextRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);
  const dispatch: any = useDispatch();

  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        if (inputTextRef.current.trim()) {
          dispatch(fetchUsers(0, inputTextRef.current));
        } else {
          dispatch(fetchUsers(0)); // Reset to normal list
        }
      }, 500),
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.hdr}>
        <Text style={styles.appName}>Test App</Text>
      </View>
      <View style={styles.afterhdr}>
        <CustomInput
          debounceSearch={debouncedSearch}
          inputRef={inputRef}
          inputTextRef={inputTextRef}
        />
        <ListComponent
          style={styles.liststyle}
          inputTextRef={inputTextRef}
          inputRef={inputRef}
        />
      </View>
    </View>
  );
};

export default Index;
const styles = StyleSheet.create({
  liststyle: {
    marginBottom: 20,
    // Adjusted to match the FlatList style,
  },
  afterhdr: {
    padding: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hdr: {
    gap: 10,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
