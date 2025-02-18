const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from './NavigationHeader';

import { Outlet, useLocation } from 'react-router-dom';

import styles from './RootContainer.module.css';


const RootContainer = ({
  isAuthenticated,
  setIsAuthenticated,
  logOutHandler,
  user,
  setUser,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const checkStatus = async () => {
        const response = await fetch(`${API_URL}/status`, {
          method: 'GET',
          headers: {
            'X-Client-Secret': `${API_SECRET}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          console.log('Not logged in!');
        }
        const data = await response.json();
        if (data.status === 'success') {
          setIsAuthenticated(true);
          setUser(data.profile);
        } else {
          setUser({});
          if (location.pathname === '/profile') {
            navigate('/login');
          }
        }
      };
      try {
        checkStatus();
      } catch (e) {
        if (location.pathname === '/profile') {
          navigate('/login');
        }
      }
    }
  }, [location, navigate]);

  const handleLogout = () => {
    logOutHandler();
    navigate('/cv');
  };

  return (
    <>
      <NavigationHeader
        isAuthenticated={isAuthenticated}
        logOutHandler={handleLogout}
      />
      <main className={styles.mainContainer}>
        <Outlet key={location} />
      </main>
    </>
  );
};

export default RootContainer;
