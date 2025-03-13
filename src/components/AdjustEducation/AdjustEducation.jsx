import { useEffect, useState } from 'react';

const AdjustEducation = () => {
  const [educationList, setEducationList] = useState([]);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_URL}/getEducation`, {
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
        console.error('Error getting education list from backend:', error);
      }
    };
    fetchSkills();
  }, []);
  return (
    <div>
        EDUCATION LIST
      {/* {educationList.slice(0).map((item) => (
        <Education key={item.id} item={item} />
      ))} */}
    </div>
  );
};

export default AdjustEducation;
