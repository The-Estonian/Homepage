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
            {selectedProject.frameworks.split(',').map((each) => {
              return <span className={styles.skillCard}>{each}</span>;
            })}
          </span>
        )}
        <span className={styles.projectCardDataInfo}>
          Languages:
          {selectedProject.languages.split(',').map((each) => {
            return <span className={styles.skillCard}>{each}</span>;
          })}
        </span>
        {selectedProject.database && (
          <span className={styles.projectCardDataInfo}>
            Database:
            {selectedProject.database.split(',').map((each) => {
              return <span className={styles.skillCard}>{each}</span>;
            })}
          </span>
        )}
        <div className={styles.buttonContainer}>
          <div className={styles.button_container_git}>
            {selectedProject.url.split(',').map((url) => {
              return (
                <a
                  className={styles.githubLink}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span>Github</span>
                </a>
              );
            })}
          </div>
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
