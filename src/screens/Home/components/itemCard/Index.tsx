import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const Index = ({
  item,
  index,
  setModalVisible,
}: {
  item: any;
  index: number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<{visible: boolean; item: any}>
  >;
}) => {
  return (
    <Pressable
      style={styles.userContainer}
      onPress={() => setModalVisible({visible: true, item})}>
      <Image source={{uri: item.avatar_url}} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.login}</Text>
        <Text style={styles.url}>{item.html_url}</Text>
      </View>
    </Pressable>
  );
};

export default Index;

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    padding: 15,
    paddingHorizontal: 0,
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
});
