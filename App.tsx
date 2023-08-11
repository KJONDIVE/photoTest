// *** NPM ***
import * as React from 'react';

import {observer} from 'mobx-react';

// *** OTHER ***
import {authStore} from './src/store';
import LoginScreen from './src/router/auth/LoginScreen';
import RootNavigation from './src/router/RootNavigation';

const App = (): JSX.Element => {
  if (authStore.isAuthenticated === false) {
    return <LoginScreen></LoginScreen>;
  }

  return <RootNavigation></RootNavigation>;
};

export default observer(App);
