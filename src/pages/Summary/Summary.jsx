import React from 'react';

import styles from './Summary.module.css';
const Summary = ({ summary }) => {
  return <span className={styles.summaryContainer}>{summary}</span>;
};

export default Summary;
