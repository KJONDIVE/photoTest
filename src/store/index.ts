import { makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';

class AuthStore {
  isAuthenticated: boolean = false;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
    });
  }

  setAuth(value: boolean) {
    this.isAuthenticated = value;
  }
}

export const authStore = new AuthStore();

export const StoreContext = createContext(authStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);