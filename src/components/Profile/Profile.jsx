import { useState } from 'react';
import AdjustSkills from '../AdjustSkills/AdjustSkills';
import AdjustEducation from '../AdjustEducation/AdjustEducation';
import AdjustSummary from '../AdjustSummary/AdjustSummary';
import styles from './Profile.module.css';

const Profile = ({ user }) => {
  const [showSkills, setShowSkills] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const skillHandler = () => {
    if (showEducation) {
      educationHandler();
    }
    if (showSummary) {
      summaryHandler();
    }
    setShowSkills(!showSkills);
  };
  const educationHandler = () => {
    if (showSkills) {
      skillHandler();
    }
    if (showSummary) {
      summaryHandler();
    }
    setShowEducation(!showEducation);
  };

  const summaryHandler = () => {
    if (showSkills) {
      skillHandler();
    }
    if (showEducation) {
      educationHandler();
    }
    setShowSummary(!showSummary);
  };
  if (!user) {
    return <p data-testid='empty-profile'>No user data to display!</p>;
  }
  return (
    <div data-testid='profile-container' className={styles.profileContainer}>
      <div className={styles.dataContainer}>
        <span className={styles.profile_menu_buttons} onClick={skillHandler}>
          Skills
        </span>
        <span
          className={styles.profile_menu_buttons}
          onClick={educationHandler}
        >
          Education
        </span>
        <span className={styles.profile_menu_buttons} onClick={summaryHandler}>
          Summary
        </span>
      </div>
      {showSkills && <AdjustSkills />}
      {showEducation && <AdjustEducation />}
      {showSummary && <AdjustSummary />}
      {!showSkills && !showEducation && !showSummary && (
        <>
          <span className={styles.profileData}>
            User ID: {user?.profile?.id}
          </span>
          <span className={styles.profileData}>
            First name: {user?.profile?.firstName}
          </span>
          <span className={styles.profileData}>
            Last name: {user?.profile?.lastName}
          </span>
          <span className={styles.profileData}>
            Email: {user?.profile?.email}
          </span>
          {user?.visitorData && (
            <>
              <span>Visit Count: {user.visitorData.totalVisits}</span>
              <span>Last Visit: {user.visitorData.lastVisit}</span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
