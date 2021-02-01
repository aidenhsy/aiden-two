import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import User from '../models/User';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const newUser = new User(userAuth);
        await newUser.create();
        const user = await User.getUser(userAuth.uid);
        const setUser = new User(user);
        setCurrentUser(setUser);
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
