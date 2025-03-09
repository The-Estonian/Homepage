import { useState, useEffect } from 'react';

import Project from '../components/Project';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal/Modal';

import styles from './Portfolio.module.css';

import { projectList } from '../projectList/projectList';

const Portfolio = () => {
  const [projectOpen, setProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  useEffect(() => {
    document.title = 'Portfolio';
  }, []);

  const handleSelectedProject = (data) => {
    setSelectedProject(data);
    handleProjectVisibleSwitch();
  };

  const handleProjectVisibleSwitch = () => {
    setProjectOpen(!projectOpen);
  };

  const handleCloseSelectedProject = () => {
    setSelectedProject({});
    setProjectOpen(!projectOpen);
  };
  return (
    <>
      {projectOpen && (
        <ProjectCard
          selectedProject={selectedProject}
          handleCloseSelectedProject={handleCloseSelectedProject}
        />
      )}
      {projectOpen && (
        <Modal handleCloseSelectedProject={handleCloseSelectedProject} />
      )}
      <div className={styles.portfolio}>
        {projectList.map((project) => {
          let projectImg = project.img;
          if (project.id == selectedProject.id) {
            return;
          }
          return (
            <Project
              key={project.id}
              project={project}
              projectImg={projectImg}
              handleSelectedProject={handleSelectedProject}
            />
          );
        })}
      </div>
    </>
  );
};

export default Portfolio;
