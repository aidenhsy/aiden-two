import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import User from '../models/User';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const newUser = new User(userAuth);
        await newUser.create();
        setCurrentUser(newUser);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
