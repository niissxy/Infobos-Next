import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: 'free' | 'premium' | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<'free' | 'premium' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const token = localStorage.getItem('infobos_token');
      if (!token) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/v1/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok || !data.user) throw new Error('Session invalid');

        setUser(data.user);
        setRole(data.user.role === 'premium' ? 'premium' : 'free');
      } catch {
        localStorage.removeItem('infobos_token');
        localStorage.removeItem('infobos_user');
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    void loadSession();
    window.addEventListener('infobos-auth-changed', loadSession);
    return () => window.removeEventListener('infobos-auth-changed', loadSession);
  }, []);

  return <AuthContext.Provider value={{ user, role, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
