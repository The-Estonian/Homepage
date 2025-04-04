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

import RootContainer from './components/RootContainer/RootContainer';
import Skills from './pages/Skills/Skills';
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
const CV = lazy(() => import('./pages/CV/CV'));
const Profile = lazy(() => import('./components/Profile/Profile'));
import Login from './authentication/Login/Login';
import Spinner from './components/Spinner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logOutHandler = async () => {
    try {
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
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout tracking failed:', error);
    }
  };

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  useEffect(() => {
    const newVisit = async () => {
      try {
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
      } catch (error) {
        console.error('Visitor tracking failed:', error);
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
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <CV />
            </Suspense>
          }
        />
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
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
