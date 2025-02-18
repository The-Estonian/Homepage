import styles from './NavigationHeader.module.css';

import { NavLink } from 'react-router-dom';

const NavigationHeader = ({ isAuthenticated, logOutHandler }) => {
  const linkChecker = ({ isActive }) =>
    isActive ? styles.activeLink : styles.notActiveLink;
  return (
    <ul className={styles.navigation}>
      <li>
        <NavLink to='/cv' className={linkChecker}>
          CV
        </NavLink>
      </li>
      <li>
        <NavLink to='/portfolio' className={linkChecker}>
          Portfolio
        </NavLink>
      </li>
      <li>
        <NavLink to='/contacts' className={linkChecker}>
          Contacts
        </NavLink>
      </li>
      {isAuthenticated && (
        <li>
          <NavLink to='/profile' className={linkChecker}>
            Profile
          </NavLink>
        </li>
      )}
      {!isAuthenticated && (
        <li>
          <NavLink to='/login' className={linkChecker}>
            Login
          </NavLink>
        </li>
      )}
      {isAuthenticated && (
        <li onClick={() => logOutHandler()}>
          <p className={styles.notActiveLink}>Logout</p>
        </li>
      )}
    </ul>
  );
};

export default NavigationHeader;
