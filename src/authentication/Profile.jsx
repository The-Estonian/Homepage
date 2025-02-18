import styles from './Profile.module.css';

const Profile = ({ user }) => {
  return (
    <div className={styles.profileContainer}>
      <span>User ID: {user?.id}</span>
      <span>First name: {user?.firstName}</span>
      <span>Last name: {user?.lastName}</span>
      <span>Email: {user?.email}</span>
    </div>
  );
};

export default Profile;
