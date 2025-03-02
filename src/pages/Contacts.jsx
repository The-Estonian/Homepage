import React, { useRef, useState, useEffect } from 'react';

import LinkedIn from '../assets/logos/InBug-White.png';
import GitHub from '../assets/logos/github-link.png';
import Discord from '../assets/logos/Discord-Symbol-White.png';
import styles from './Contacts.module.css';

const Contacts = () => {
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const email = useRef();

  const [showName, setShowName] = useState('Jaanus Saar');
  const [showPhone, setShowPhone] = useState('+37258218417');
  const [showAddress, setShowAddress] = useState('Europe, Estonia, Tallinn');
  const [showEmail, setShowEmail] = useState('Zaar2213@gmail.com');

  useEffect(() => {
    document.title = 'Contacts';
  }, []);

  const copyName = () => {
    navigator.clipboard.writeText(fullNameRef.current.textContent);
    setShowName('Copied to Clipboard');
    setTimeout(() => {
      setShowName('Jaanus Saar');
    }, 1000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phoneRef.current.textContent);
    setShowPhone('Copied to Clipboard');
    setTimeout(() => {
      setShowPhone('+37258218417');
    }, 1000);
  };
  const copyAddress = () => {
    navigator.clipboard.writeText(addressRef.current.textContent);
    setShowAddress('Copied to Clipboard');
    setTimeout(() => {
      setShowAddress('Europe, Estonia, Tallinn');
    }, 1000);
  };
  const copyEmail = () => {
    navigator.clipboard.writeText(email.current.textContent);
    setShowEmail('Copied to Clipboard');
    setTimeout(() => {
      setShowEmail('Zaar2213@gmail.com');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contactInfoContainer}>
        <div className={styles.contactInfoSlide}>
          <p
            className={styles.contactInfo}
            ref={fullNameRef}
            onClick={copyName}
          >
            {showName}
          </p>
          <div className={styles.contactInfo} onClick={copyPhone}>
            <p ref={phoneRef}>{showPhone}</p>
          </div>
        </div>
        <div className={styles.contactInfoSlide}>
          <p
            className={styles.contactInfo}
            ref={addressRef}
            onClick={copyAddress}
          >
            {showAddress}
          </p>
          <p className={styles.contactInfo} ref={email} onClick={copyEmail}>
            {showEmail}
          </p>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.picture}>
          <a href='https://discord.gg/7UAs7pAw5D' target='_blank'>
            <img className={styles.contactImage} src={Discord} />
          </a>
        </div>
        <div className={styles.picture}>
          <a
            href='https://www.linkedin.com/in/jaanus-saar-3897a721b/'
            target='_blank'
          >
            <img className={styles.contactImage} src={LinkedIn} />
          </a>
        </div>
        <div className={styles.picture}>
          <a href='https://github.com/The-Estonian' target='_blank'>
            <img className={styles.contactImage} src={GitHub} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
