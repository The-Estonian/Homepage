import { useState } from 'react';

import styles from './Picture.module.css';

import Spinner from '../Spinner';

const Picture = (props) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={styles.picture}>
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      <img
        src={props.img}
        alt='Project Image'
        className={`${styles.projectImg} ${loading ? styles.hidden : ''}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default Picture;
