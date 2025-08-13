import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';

const UserDetailsModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: {visible: boolean; item: any};
  setModalVisible: React.Dispatch<
    React.SetStateAction<{visible: boolean; item: any}>
  >;
}) => {
  const [userInfo, setUserInfo] = React.useState({
    loading: true,
    followers: 0,
    following: 0,
    error: null,
  });

  const getFollowerNFollowingInfo = async () => {
    try {
      setUserInfo(prev => ({...prev, loading: true, error: null}));

      const [followersResponse, followingResponse] = await Promise.all([
        fetch(modalVisible.item?.followers_url),
        fetch(modalVisible.item?.following_url.replace('{/other_user}', '')),
      ]);

      if (!followersResponse.ok || !followingResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const [followersData, followingData] = await Promise.all([
        followersResponse.json(),
        followingResponse.json(),
      ]);

      setUserInfo({
        loading: false,
        followers: followersData.length,
        following: followingData.length,
        error: null,
      });
    } catch (error: any) {
      setUserInfo(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load user data',
      }));
    }
  };

  React.useEffect(() => {
    if (modalVisible.visible && modalVisible.item) {
      getFollowerNFollowingInfo();
    }
  }, [modalVisible.visible, modalVisible.item]); // Added dependencies

  const handleClose = () => {
    setModalVisible({visible: false, item: null});
    // Reset state when closing
    setUserInfo({
      loading: true,
      followers: 0,
      following: 0,
      error: null,
    });
  };

  return (
    <ReactNativeModal
      isVisible={modalVisible.visible}
      onBackdropPress={handleClose}
      style={{margin: 0, justifyContent: 'center'}}
      backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {userInfo.loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Loading user details...</Text>
            </View>
          ) : userInfo.error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{userInfo.error}</Text>
              <Pressable
                onPress={getFollowerNFollowingInfo}
                style={styles.retryButton}>
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {modalVisible.item && (
                <>
                  <Image
                    source={{uri: modalVisible.item?.avatar_url}}
                    style={styles.avatar}
                  />
                  <Text style={styles.username}>{modalVisible.item.login}</Text>
                  <Text style={styles.url}>{modalVisible.item?.html_url}</Text>
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>
                        {userInfo.followers}
                      </Text>
                      <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>
                        {userInfo.following}
                      </Text>
                      <Text style={styles.statLabel}>Following</Text>
                    </View>
                  </View>
                </>
              )}
              <Pressable onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '50%',
    marginHorizontal: 20,
  },
  modalContent: {
    alignItems: 'center',
    width: '100%',
  },
  loaderContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  url: {
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
});

export default UserDetailsModal;
