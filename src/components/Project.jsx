import Picture from './Picture/Picture';

import styles from './Project.module.css';

const Project = ({ project, handleSelectedProject, projectImg }) => {
  if (project)
    return (
      <div
        className={styles.project}
        onClick={handleSelectedProject.bind(this, project)}
      >
        <Picture img={projectImg} />
      </div>
    );
  return <Picture img={projectImg} />;
};

export default Project;
