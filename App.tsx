import {View, Text} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
