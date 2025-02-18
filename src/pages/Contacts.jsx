import React, { useRef, useEffect } from 'react';

import LinkedIn from '../assets/images/LinkedIn1.jpg';
import GitHub from '../assets/images/GitHub1.jpg';
import styles from './Contacts.module.css';

const Contacts = () => {
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const email = useRef();

  useEffect(() => {
    document.title = 'Contacts';
  }, []);

  return (
    <div className={styles.picture}>
      <div className={styles.contactInfoContainer}>
        <div className={styles.contactInfoSlide}>
          <p
            className={styles.contactInfo}
            ref={fullNameRef}
            onClick={() => {
              navigator.clipboard.writeText(fullNameRef.current.textContent);
            }}
          >
            Jaanus Saar
          </p>
          <div
            className={styles.contactInfo}
            onClick={() => {
              navigator.clipboard.writeText(phoneRef.current.textContent);
            }}
          >
            <p>Phone:</p>
            <p ref={phoneRef}>+37258218417</p>
          </div>
        </div>
        <div className={styles.contactInfoSlide}>
          <p
            className={styles.contactInfo}
            ref={addressRef}
            onClick={() => {
              navigator.clipboard.writeText(addressRef.current.textContent);
            }}
          >
            Europe, Estonia, Tallinn
          </p>
          <p
            className={styles.contactInfo}
            ref={email}
            onClick={() => {
              navigator.clipboard.writeText(email.current.textContent);
            }}
          >
            Zaar2213@gmail.com
          </p>
        </div>
      </div>
      <div>
        <a
          href='https://www.linkedin.com/in/jaanus-saar-3897a721b/'
          target='_blank'
        >
          <img className={styles.contactImage} src={LinkedIn} />
        </a>
        <a href='https://github.com/The-Estonian' target='_blank'>
          <img className={styles.contactImage} src={GitHub} />
        </a>
      </div>
    </div>
  );
};

export default Contacts;
