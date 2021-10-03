import { useState, useEffect, createContext, useCallback } from 'react';
import { nextApiFetcher } from '../lib/httpClient';

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const checkLoggedIn = async () => {
    await nextApiFetcher('/api/users/me', {}, setError, setUser);
    setError(null);
  };
  const signup = useCallback(async ({ username, email, password }) => {
    await nextApiFetcher(
      '/api/account/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      },
      setError,
      setUser
    );
  }, []);
  const login = useCallback(async ({ email: identifier, password }) => {
    await nextApiFetcher(
      '/api/account/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      },
      setError,
      setUser
    );
  }, []);

  const logout = useCallback(async () => {
    await nextApiFetcher('/api/account/logout', {}, setError, setUser);
  }, []);

  const resetError = () => {
    setError(null);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, error, signup, login, logout, resetError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
