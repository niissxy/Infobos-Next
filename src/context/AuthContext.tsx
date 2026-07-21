import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  role: 'free' | 'premium' | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'free' | 'premium' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth is not initialized. Falling back to default role.");
      setRole('free');
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser && db) {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            setRole(userDoc.exists() ? userDoc.data().role : 'free');
          } catch (docErr) {
            console.error("Failed to fetch user doc from Firestore:", docErr);
            setRole('free');
          }
        } else {
          setRole(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (authErr) {
      console.error("Failed to register onAuthStateChanged listener:", authErr);
      setRole('free');
      setLoading(false);
    }
  }, []);

  return <AuthContext.Provider value={{ user, role, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
