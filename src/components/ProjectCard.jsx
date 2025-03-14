import styles from './ProjectCard.module.css';

import Picture from './Picture/Picture';

const ProjectCard = ({ selectedProject, handleCloseSelectedProject }) => {
  return (
    <div className={styles.projectCard}>
      <Picture img={selectedProject.img} />
      <div className={styles.projectCardData}>
        <span className={styles.projectCardDataInfo}>
          Description: {selectedProject.description}
        </span>
        {selectedProject.frameworks && (
          <span className={styles.projectCardDataInfo}>
            Frameworks:
            {selectedProject.frameworks.map((each) => {
              return <span className={styles.skillCard}>{each}</span>;
            })}
          </span>
        )}
        <span className={styles.projectCardDataInfo}>
          Languages:
          {selectedProject.languages.map((each) => {
            return <span className={styles.skillCard}>{each}</span>;
          })}
        </span>
        {selectedProject.database && (
          <span className={styles.projectCardDataInfo}>
            Database:
            {selectedProject.database.map((each) => {
              return <span className={styles.skillCard}>{each}</span>;
            })}
          </span>
        )}
        <div className={styles.buttonContainer}>
          <a
            className={styles.githubLink}
            href={selectedProject.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Github</span>
          </a>
          {selectedProject.live && (
            <a
              className={styles.githubLink}
              href={selectedProject.live}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>Live</span>
            </a>
          )}
          <span
            className={styles.githubLink}
            onClick={() => handleCloseSelectedProject()}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
