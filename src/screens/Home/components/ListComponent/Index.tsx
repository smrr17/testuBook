import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {fetchMoreUsers, fetchUsers} from '../../../../redux/Actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
import ItemCard from '../../components/itemCard/Index';
import ItemModal from '../../components/ItemModal/Index';

const Index = ({
  style,
  inputTextRef,
  inputRef,
}: {
  style: FlatList['props']['style'];
  inputTextRef: React.MutableRefObject<string>;
  inputRef: React.RefObject<TextInput>;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: any = useDispatch();
  const {loading, loadingMore, users, error, since, hasMore} = useSelector(
    (state: any) => state.UserReducer,
  );

  const [modalVisible, setModalVisible] = useState<{
    visible: boolean;
    item: any;
  }>({
    visible: false,
    item: null,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const loadMoreUsers = useCallback(() => {
    if (hasMore && !loadingMore) {
      dispatch(fetchMoreUsers(since, inputTextRef.current));
    }
  }, [hasMore, loadingMore, since]);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
        <Text style={styles.footerText}>Loading more users...</Text>
      </View>
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <ItemCard setModalVisible={setModalVisible} item={item} index={index} />
  );
  if (loading && users.length === 0) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  // if (error) {
  //   return <Text style={styles.error}>{error}</Text>;
  // }
  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);

          dispatch(fetchUsers());
          inputRef.current?.clear();
          inputRef.current?.blur();
          inputTextRef.current = '';
          setRefreshing(false);
        }}
        data={users}
        contentContainerStyle={{flexGrow: 1}}
        style={style}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.8}
        ListFooterComponent={renderFooter}
      />
      <ItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  userContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  url: {
    color: '#666',
    fontSize: 14,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    marginLeft: 10,
    color: '#666',
  },
});
