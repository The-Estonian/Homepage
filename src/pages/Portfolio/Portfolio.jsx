const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';
import { useState, useEffect } from 'react';

import Project from '../../components/Project';
import ProjectCard from '../../components/ProjectCard';
import Modal from '../../components/Modal/Modal';

import styles from './Portfolio.module.css';

import { projectList } from '../../projectList/projectList';
import Spinner from '../../components/Spinner';

const Portfolio = () => {
  const [projectOpen, setProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [activeProjectList, setActiveProjectList] = useState([]);
  const [projectListLoading, setrojectListLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/getProjects`, {
          method: 'GET',
          headers: {
            'X-Client-Secret': `${API_SECRET}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Backend not online');
          setActiveProjectList(projectList);
          setrojectListLoading(false);
          return;
        }
        const data = await response.json();
        setActiveProjectList(data.projects);
        setrojectListLoading(false);
      } catch (error) {
        console.error('Error getting projects from backend:', error);
        setActiveProjectList(projectList);
        setrojectListLoading(false);
      }
    };
    fetchProjects();
  });

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
        {projectListLoading ? (
          <Spinner />
        ) : (
          activeProjectList.map((project) => {
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
          })
        )}
      </div>
    </>
  );
};

export default Portfolio;
