// Experiment 3.1.1 & 3.1.2 — Global auth state shared across the app
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // initialize from localStorage so the session survives a page refresh
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const login = useCallback((tokenValue, userInfo) => {
    // persist to localStorage for JWT storage requirement (Exp 3.1.2)
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('user', JSON.stringify(userInfo));
    setToken(tokenValue);
    setUser(userInfo);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for convenient access in any component
export const useAuth = () => useContext(AuthContext);
