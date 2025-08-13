import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddPost from '../screens/AddPost';
import Comments from '../screens/Comments';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

const BottomTab = ({route}: any) => {
  console.log(route);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',

        tabBarIcon: ({focused}) => {
          return (
            <Image
              tintColor={focused ? 'tomato' : 'gray'}
              source={
                route.name === 'HomeStack'
                  ? {uri: 'https://img.icons8.com/ios/452/home.png'}
                  : {uri: 'https://img.icons8.com/ios/452/plus-math.png'}
              }
              style={{width: 20, height: 20}}
            />
          );
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="HomeStack"
        component={HomeStack}
      />

      <Tab.Screen
        options={{headerShown: false}}
        name="AddPost"
        component={AddPost}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
