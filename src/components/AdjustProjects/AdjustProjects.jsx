const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';
import { useEffect, useState } from 'react';
import Project from '../Project';

const AdjustProjects = () => {
  const [activeProjectList, setActiveProjectList] = useState(['ASDAAAAAAA']);
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
          return;
        }
        const data = await response.json();
        setActiveProjectList(data.projects);
        setrojectListLoading(false);
      } catch (error) {
        console.error('Error getting projects from backend:', error);
      }
    };
    fetchProjects();
  });
  return (
    <div>
      {activeProjectList.map((project) => {
        let projectImg = project.img;
        return (
          <Project
            key={project.id}
            project={project}
            projectImg={projectImg}
          />
        );
      })}
    </div>
  );
};

export default AdjustProjects;
