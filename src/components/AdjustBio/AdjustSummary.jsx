const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';

import { useState, useEffect, useRef } from 'react';

import styles from './AdjustSummary.module.css';

const AdjustBio = () => {
  const [activeSummary, setActiveSummary] = useState([]);
  const newSummary = useRef();

  const submitHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/postSummary`, {
        method: 'POST',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          summary: newSummary.current.value,
        }),
      });

      if (!response.ok) {
        console.log('Backend not online');
        return;
      } else {
        const summaryValue = newSummary.current.value;
        setActiveSummary(summaryValue);
        newSummary.current.value = '';
      }
    } catch (error) {
      console.error('Error setting summary to backend:', error);
    }
  };

  // summary
  const fetchSummary = async () => {
    try {
      const response = await fetch(`${API_URL}/getSummary`, {
        method: 'GET',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log('Backend not online');
        return;
      }
      const data = await response.json();
      setActiveSummary(data[0].summary);
    } catch (error) {
      console.error('Error getting summary from backend:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);
  return (
    <span className={styles.summaryContainer}>
      <div className={styles.summary}>{activeSummary}</div>
      <div className={styles.summary_input_container}>
        <textarea
          className={styles.summary_input}
          type='text'
          ref={newSummary}
          placeholder='Summary'
        ></textarea>
        <button
          className={styles.adjustSummary_add_button}
          type='submit'
          onClick={submitHandler}
        >
          Add
        </button>
      </div>
    </span>
  );
};

export default AdjustBio;
