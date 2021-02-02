import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';
import Index from '../pages/index';

export default function withAuth(AuthComponent) {
  return function AuthWrapped() {
    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const { currentUser, loading } = useAuth();
    useEffect(() => {
      console.log(loading);
    }, [loading]);

    if (!loading) {
      if (currentUser) {
        return <AuthComponent />;
      }
    } else {
      return null;
    }
  };
}
