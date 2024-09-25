import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import useLinker from 'hooks/useLinker';
import helloWorld from '../Welcome';

const AuthContext = createContext();
const API = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? `${process.env.REACT_APP_DEV_DOMAIN}api/users/`
  : `${process.env.REACT_APP_PROD_DOMAIN}api/users/`;

const currentBaseName = JSON.parse(process.env.REACT_APP_DEVELOPMENT)
  ? process.env.REACT_APP_BASENAME_DEV
  : process.env.REACT_APP_BASENAME;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [darkmode, setDarkmode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);

  const navigateToLogin = () => useLinker(`${currentBaseName}/#/auth/sign-in`);

  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('authUser');
    if (storedUser && storedUser !== 'undefined') {
      setUser(JSON.parse(storedUser));
    } else if (window.location.pathname !== '/auth/sign-up' && !localStorage.getItem('token') && window.location.pathname !== `${currentBaseName}/`) {
      console.log(window.location.pathname !== `${currentBaseName}/`);
      console.log(window.location.pathname);
      console.log('navigate to login');
      navigateToLogin();
    }
    setLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const signOut = () => {
    setUser(null);
    localStorage.clear();
    navigateToLogin();
  };

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
  });

  const fetchData = async (
    endpoint,
    method,
    body,
  ) => fetch(endpoint, { method, headers: getHeaders(), body });

  const validateUser = () => {
    if (!isLoading && user) {
      return true;
    } if (isLoading) {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        return false;
      }
      return true;
    }
    return false;
  };

  const setMode = (darkMode) => {
    setDarkmode(() => darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  };

  const getUser = async () => {
    let data;
    setLoading(true);
    try {
      const response = await fetchData(API, 'GET');
      data = await response.json();
      if (data?.msg === 'Token is not valid' || data?.msg === 'User not found') {
        signOut();
      }
      setUser(() => data);
    } catch (error) {
      signOut();
      navigateToLogin();
    } finally {
      setLoading(false);
    }
    return data;
  };

  const signUp = async (userData) => {
    let data;
    setLoading(true);
    try {
      const response = await fetchData(`${API}register`, 'POST', JSON.stringify(userData));
      data = await response.json();
      setUser(data);
      if (data.firstname && data.email) {
        localStorage.setItem('token', data.token);
        window.location.href = `${currentBaseName}/#/admin/default`;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return data;
  };

  const signIn = async (userData) => {
    let data;
    setLoading(true);
    try {
      const response = await fetchData(API, 'POST', JSON.stringify(userData));
      data = await response.json();
      setUser(data);
      if (data.email && data.firstname) {
        localStorage.setItem('token', data.token);
        window.location.href = `${currentBaseName}/#/admin/default`;
      }
    } catch (error) {
      console.error(error);
    } finally {
      helloWorld();
      setLoading(false);
    }
    return data;
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    signIn,
    signOut,
    signUp,
    validateUser,
    getUser,
    setMode,
    darkmode,
  }), [user, isLoading, darkmode]);

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
