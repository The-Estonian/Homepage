import Picture from './Picture/Picture';

import styles from './Project.module.css';

const Project = ({ project, handleSelectedProject, projectImg }) => {
  return (
    <div
      className={styles.project}
      onClick={handleSelectedProject.bind(this, project)}
    >
      <Picture img={projectImg} />
    </div>
  );
};

export default Project;
