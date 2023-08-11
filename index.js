// *** NPM ***
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';

// *** OTHER ***
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import { authStore, StoreProvider } from "./src/store/index";

const Main = () => {
  return (
    <StoreProvider value={authStore}>
      <NavigationContainer>
        <App></App>
      </NavigationContainer>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
