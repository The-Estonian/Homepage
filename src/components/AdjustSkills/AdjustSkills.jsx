const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';

import { useEffect, useState } from 'react';

import Skills from '../../pages/Skills/Skills';

const AdjustSkills = () => {
  const [skillList, setSkillList] = useState([]);
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
    <div>
      {skillList.slice(0).map((item) => (
        <Skills key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AdjustSkills;
