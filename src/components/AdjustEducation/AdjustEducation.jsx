const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';

import { useEffect, useState, useRef } from 'react';

import EducationModule from '../EducationModule/EducationModule';

const AdjustEducation = () => {
  const [educationList, setEducationList] = useState([]);
  const [openTab, setOpenTab] = useState(null);
  const title = useRef();
  const name = useRef();
  const date = useRef();
  const duration = useRef();
  const desc = useRef();
  const website = useRef();
  const cert = useRef();

  const submitHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/postEducation`, {
        method: 'POST',
        headers: {
          'X-Client-Secret': `${API_SECRET}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title.current.value,
          name: name.current.value,
          date: date.current.value,
          duration: duration.current.value,
          desc: desc.current.value,
          website: website.current.value,
          cert: cert.current.value,
        }),
      });

      if (!response.ok) {
        console.log('Backend not online');
        return;
      } else {
        fetchEducation();
        title.current.value = '';
        name.current.value = '';
        date.current.value = '';
        duration.current.value = '';
        desc.current.value = '';
        website.current.value = '';
        cert.current.value = '';
      }
    } catch (error) {
      console.error('Error getting education list from backend:', error);
    }
  };

  const fetchEducation = async () => {
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
      setEducationList(data);
    } catch (error) {
      console.error('Error getting education list from backend:', error);
    }
  };

  const removeEducationHandler = async (id) => {
    try {
      const response = await fetch(`${API_URL}/deleteEducation`, {
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
        throw new Error(`Failed to delete education: ${response.statusText}`);
      }

      setEducationList((prev) =>
        prev.filter((education) => education.id !== id)
      );
    } catch (error) {
      console.error('Error deleting education from backend:', error);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return (
    <div>
      {educationList
        .slice(0)
        .reverse()
        .map((listItem) => (
          <EducationModule
            key={listItem.id}
            listData={listItem}
            openTab={openTab}
            setOpenTab={setOpenTab}
            removeEducationHandler={removeEducationHandler}
          />
        ))}
    </div>
  );
};

export default AdjustEducation;
