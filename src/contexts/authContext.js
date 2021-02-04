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
      setLoading(true);
      if (userAuth) {
        const user = new User(userAuth);
        if (user.displayName) {
          await user.create();
        }
        if (!user.displayName) {
          const fetchedUser = await User.getUser(userAuth.uid);
          const user = fetchedUser;
          setCurrentUser(user);
          setLoading(false);
          return;
        }
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
