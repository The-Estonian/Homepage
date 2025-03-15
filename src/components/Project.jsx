import Picture from './Picture/Picture';

import styles from './Project.module.css';

const Project = ({ project, handleSelectedProject, projectImg }) => {
  return (
    <div
      className={styles.project}
    >
      <Picture img={projectImg} />
    </div>
  );
};

export default Project;
