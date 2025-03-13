import { useState } from 'react';
import AdjustSkills from '../AdjustSkills/AdjustSkills';
import AdjustEducation from '../AdjustEducation/AdjustEducation';
import styles from './Profile.module.css';

const Profile = ({ user }) => {
  const [showSkills, setShowSkills] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const skillHandler = () => {
    if (showEducation) {
      educationHandler();
    }
    setShowSkills(!showSkills);
  };
  const educationHandler = () => {
    if (showSkills) {
      skillHandler();
    }
    setShowEducation(!showEducation);
  };
  if (!user) {
    return <p data-testid='empty-profile'>No user data to display!</p>;
  }
  return (
    <div data-testid='profile-container' className={styles.profileContainer}>
      <div className={styles.dataContainer}>
        <span className={styles.skillSwitch} onClick={skillHandler}>
          Skills
        </span>
        <span className={styles.skillSwitch} onClick={educationHandler}>
          Education
        </span>
      </div>
      {showSkills && <AdjustSkills />}
      {showEducation && <AdjustEducation />}
      {(!showSkills && !showEducation) && (
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
