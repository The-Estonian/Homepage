const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';
import { useEffect, useState, useRef } from 'react';
import Project from '../Project';
import { projectList } from '../../projectList/projectList';

import styles from './AdjustProjects.module.css';

const AdjustProjects = () => {
  const [activeProjectList, setActiveProjectList] = useState([]);

  const url = useRef();
  const desc = useRef();
  const frameworks = useRef();
  const languages = useRef();
  const database = useRef();
  const live = useRef();
  const img = useRef();

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append('url', url.current?.value);
    formData.append('description', desc.current?.value);
    if (frameworks.current) {
      formData.append('frameworks', frameworks.current?.value);
    }
    if (languages.current) {
      formData.append('languages', languages.current?.value);
    }
    if (database.current) {
      formData.append('database', database.current?.value);
    }
    if (live.current) {
      formData.append('live', live.current?.value);
    }
    formData.append('img', img.current?.files[0]);
    try {
      const response = await fetch(`${API_URL}/postProject`, {
        method: 'POST',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
        },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        console.log('Backend not online');
        return;
      } else {
        fetchProjects();
        url.current.value = '';
        desc.current.value = '';
        frameworks.current.value = '';
        languages.current.value = '';
        database.current.value = '';
        live.current.value = '';
        img.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting a new project:', error);
    }
  };

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
        return;
      }
      const data = await response.json();
      setActiveProjectList(data.projects);
    } catch (error) {
      console.error('Error getting projects from backend:', error);
      setActiveProjectList(projectList);
    }
  };

  const removeProjectHandler = async (id) => {
    try {
      const response = await fetch(`${API_URL}/deleteProject`, {
        method: 'DELETE',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`);
      }

      setActiveProjectList((prev) =>
        prev.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error('Error deleting project from backend:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div>
      {activeProjectList
        .slice()
        .reverse()
        .map((project) => {
          return (
            <div key={project.id} className={styles.profile_project_data}>
              <Project projectImg={project.img} />
              <div className={styles.profile_project_data_container}>
                <span>{project.id}</span>
                <span>{project.url}</span>
                <span>{project.description}</span>
                {project.frameworks && <span>{project.frameworks}</span>}
                <span>{project.languages}</span>
                {project.database && <span>{project.database}</span>}
                <span
                  onClick={() => removeProjectHandler(project.id)}
                  className={styles.profile_project_data_container_delete}
                >
                  Delete Project
                </span>
              </div>
            </div>
          );
        })}
      <div className={styles.adjustProject_add}>
        <div className={styles.adjustProject_add_titles}>
          <span>Url</span>
          <span>Description</span>
          <span>Frameworks</span>
          <span>Languages</span>
          <span>Database</span>
          <span>Live</span>
          <span>Image</span>
        </div>
        <div className={styles.adjustProject_add_inputs}>
          <input type='text' ref={url} placeholder='Url'></input>
          <input type='text' ref={desc} placeholder='Description'></input>
          <input type='text' ref={frameworks} placeholder='Frameworks'></input>
          <input type='text' ref={languages} placeholder='Languages'></input>
          <input type='text' ref={database} placeholder='Database'></input>
          <input type='text' ref={live} placeholder='Live'></input>
          <input type='file' ref={img} placeholder='Image'></input>
        </div>

        <button
          className={styles.adjustProject_add_button}
          type='submit'
          onClick={submitHandler}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AdjustProjects;
