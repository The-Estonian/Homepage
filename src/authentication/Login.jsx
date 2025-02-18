const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || "localhost";
import React, { useState, useRef, useEffect } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setUser, logOutHandler }) => {
  const [loginRegister, setLoginRegister] = useState(true);
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const loginOrRegisterHandler = () => {
    setLoginRegister(!loginRegister);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      submitHandler();
    }
  };

  const submitHandler = async (e) => {
    if (loginRegister) {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'X-Client-Secret': `${API_SECRET}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.login === 'success') {
          navigate('/profile');
          setIsAuthenticated(true);
          setUser(data.profile);
        }
      } catch (error) {
        console.error('Error:', error);
        logOutHandler(false);
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'X-Client-Secret': `${API_SECRET}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className={styles.login}>
      {!loginRegister && (
        <label>
          <span>First name</span>
          <input type='text' ref={firstName}></input>
        </label>
      )}
      {!loginRegister && (
        <label>
          <span>Last name</span>
          <input type='text' ref={lastName}></input>
        </label>
      )}
      <label>
        <span>Email</span>
        <input type='text' ref={email}></input>
      </label>
      <label>
        <span>Password</span>
        <input type='password' ref={password} onKeyDown={handleEnter}></input>
      </label>
      <button type='submit' onClick={submitHandler}>
        {loginRegister ? 'Submit' : 'Register'}
      </button>
      <p className={styles.loginSwitchButton} onClick={loginOrRegisterHandler}>
        {loginRegister
          ? 'Click here to Register account!'
          : 'Login to your account!'}
      </p>
    </div>
  );
};

export default Login;
