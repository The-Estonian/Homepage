import styles from './Profile.module.css';

const Profile = ({ user }) => {
  if (!user) {
    return <p data-testid='empty-profile'>No user data to display!</p>;
  }
  return (
    <div data-testid='profile-container' className={styles.profileContainer}>
      <span>User ID: {user?.profile?.id}</span>
      <span>First name: {user?.profile?.firstName}</span>
      <span>Last name: {user?.profile?.lastName}</span>
      <span>Email: {user?.profile?.email}</span>
      {user?.visitorData && (
        <>
          <span>Visit Count: {user.visitorData.totalVisits}</span>
          <span>Last Visit: {user.visitorData.lastVisit}</span>
        </>
      )}
    </div>
  );
};

export default Profile;
