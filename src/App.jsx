const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';
import React, { Suspense, useEffect, useState, lazy } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

import RootContainer from './components/RootContainer';
import Skills from './pages/Skills/Skills';
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
const CV = lazy(() => import('./pages/CV/CV'));
const Profile = lazy(() => import('./authentication/Profile'));
import Login from './authentication/Login';
import Spinner from './components/Spinner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logOutHandler = async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'X-Client-Secret': `${API_SECRET}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setUser({});
    setIsAuthenticated(false);
  };

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VYNENTSWJE';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-VYNENTSWJE');
    };
  }, []);

  useEffect(() => {
    const newVisit = async () => {
      const response = await fetch(`${API_URL}/visitor`, {
        method: 'POST',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referer: document.referrer || 'Direct visit',
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Visitor: ${response.status}`);
      }
    };
    newVisit();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <RootContainer
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            logOutHandler={logOutHandler}
            user={user}
            setUser={setUser}
          />
        }
      >
        <Route index element={<Navigate to='/cv' />} />
        <Route path='/skills' element={<Skills />} />
        <Route
          path='/portfolio'
          element={
            <Suspense fallback={<Spinner />}>
              <Portfolio />
            </Suspense>
          }
        />
        <Route
          path='/contacts'
          element={
            <Suspense fallback={<Spinner />}>
              <Contacts />
            </Suspense>
          }
        />
        <Route
          path='/cv'
          element={
            <Suspense fallback={<Spinner />}>
              <CV />
            </Suspense>
          }
        />
        <Route
          path='/profile'
          element={
            <Suspense fallback={<Spinner />}>
              <Profile user={user} />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
              logOutHandler={logOutHandler}
            />
          }
        />
        <Route path='*' element={<Navigate to='/cv' />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
