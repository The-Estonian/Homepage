const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';

import { useEffect, useRef, useState } from 'react';

import Skills from '../../pages/Skills/Skills';

import styles from './AdjustSkills.module.css';

const AdjustSkills = () => {
  const [skillList, setSkillList] = useState([]);
  const skill = useRef();

  const submitHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/postSkills`, {
        method: 'POST',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          skills: skill.current.value,
        }),
      });

      const data = await response.json();
      const skillValue = skill.current.value;
      setSkillList((prev) => [...prev, { id: data.id, skill: skillValue }]);
      skill.current.value = '';
    } catch (error) {
      console.error('Error getting skill list from backend:', error);
    }
  };

  const removeSkillHandler = async (id) => {
    try {
      const response = await fetch(`${API_URL}/deleteSkills`, {
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
        throw new Error(`Failed to delete skill: ${response.statusText}`);
      }

      setSkillList((prev) => prev.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error('Error deleting skill from backend:', error);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_URL}/getSkills`, {
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
        setSkillList(data);
      } catch (error) {
        console.error('Error getting skill list from backend:', error);
      }
    };
    fetchSkills();
  }, []);
  return (
    <div className={styles.adjustSkills}>
      <div className={styles.skillContainer}>
        {skillList.slice(0).map((item) => (
          <>
            <Skills
              key={item.id}
              item={item}
              removeSkillHandler={() => removeSkillHandler(item.id)}
            />
          </>
        ))}
      </div>
      <div className={styles.adjustSkills_add}>
        <label>
          <input type='text' ref={skill} placeholder='skill name'></input>
          <button
            className={styles.adjustSkills_add_button}
            type='submit'
            onClick={submitHandler}
          >
            Add
          </button>
        </label>
      </div>
    </div>
  );
};

export default AdjustSkills;
