import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateJwtToken, decodeJwtToken, isTokenExpired } from '../utils/jwtUtils';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: 'authguard_token',
  USER: 'authguard_user',
  REMEMBER: 'authguard_remember_me'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [storageType, setStorageType] = useState('none'); // 'localStorage' | 'sessionStorage' | 'none'
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on initial application load
  useEffect(() => {
    try {
      const isRemembered = localStorage.getItem(STORAGE_KEYS.REMEMBER) === 'true';
      let storedToken = null;
      let storedUserStr = null;
      let detectedStorage = 'none';

      if (isRemembered) {
        storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        storedUserStr = localStorage.getItem(STORAGE_KEYS.USER);
        detectedStorage = 'localStorage';
      } else {
        storedToken = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
        storedUserStr = sessionStorage.getItem(STORAGE_KEYS.USER);
        detectedStorage = 'sessionStorage';
      }

      if (storedToken && storedUserStr) {
        const decoded = decodeJwtToken(storedToken);
        if (decoded && !decoded.isExpired) {
          const parsedUser = JSON.parse(storedUserStr);
          setUser(parsedUser);
          setToken(storedToken);
          setDecodedToken(decoded);
          setIsAuthenticated(true);
          setRememberMe(isRemembered);
          setStorageType(detectedStorage);
        } else {
          // Token expired or invalid
          clearAllStorage();
        }
      }
    } catch (err) {
      console.error('Failed to restore authentication session:', err);
      clearAllStorage();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Periodic expiration checker (every 10 seconds)
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        logout();
        alert('Your simulated JWT session has expired. Please sign in again.');
      } else {
        setDecodedToken(decodeJwtToken(token));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  const clearAllStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
  };

  /**
   * Login handler
   * @param {string} username 
   * @param {string} password 
   * @param {boolean} remember 
   * @param {string} [customRole]
   */
  const login = useCallback(async (username, password, remember = false, customRole = null) => {
    setIsLoading(true);

    // Simulate network authentication round-trip
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const sanitizedUsername = username.trim();
      const role = customRole || (sanitizedUsername.toLowerCase() === 'admin' 
        ? 'Security Administrator' 
        : 'Cyber Defense Analyst');

      const userProfile = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        username: sanitizedUsername,
        name: sanitizedUsername.toLowerCase() === 'admin' ? 'Security Operations Lead' : 'Saibadeep Mullick',
        role: role,
        department: 'BCA Cyber Defense Research',
        loginTime: new Date().toISOString()
      };

      // 1 hour expiry simulated token (3600 seconds)
      const newToken = generateJwtToken(userProfile, 3600);
      const decoded = decodeJwtToken(newToken);

      // Clean existing storage first
      clearAllStorage();

      if (remember) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userProfile));
        localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
        setStorageType('localStorage');
      } else {
        sessionStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userProfile));
        setStorageType('sessionStorage');
      }

      setUser(userProfile);
      setToken(newToken);
      setDecodedToken(decoded);
      setIsAuthenticated(true);
      setRememberMe(remember);
      setIsLoading(false);

      return { success: true, user: userProfile };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  }, []);

  /**
   * Logout handler
   */
  const logout = useCallback(() => {
    clearAllStorage();
    setUser(null);
    setToken(null);
    setDecodedToken(null);
    setIsAuthenticated(false);
    setRememberMe(false);
    setStorageType('none');
  }, []);

  /**
   * Refresh the simulated token with a fresh 1-hour expiry
   */
  const refreshToken = useCallback(() => {
    if (!user) return;
    const newToken = generateJwtToken(user, 3600);
    const decoded = decodeJwtToken(newToken);

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    }

    setToken(newToken);
    setDecodedToken(decoded);
  }, [user, rememberMe]);

  const value = {
    user,
    token,
    decodedToken,
    isAuthenticated,
    rememberMe,
    storageType,
    isLoading,
    login,
    logout,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
