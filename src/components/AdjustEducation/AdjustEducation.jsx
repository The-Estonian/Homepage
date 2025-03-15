const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'localhost';

import { useEffect, useState, useRef } from 'react';
import EducationModule from '../EducationModule/EducationModule';

import styles from './AdjustEducation.module.css';

const AdjustEducation = () => {
  const [educationList, setEducationList] = useState([]);
  const [openTab, setOpenTab] = useState(null);
  const title = useRef();
  const img = useRef();
  const name = useRef();
  const date = useRef();
  const duration = useRef();
  const desc = useRef();
  const website = useRef();
  const cert = useRef();

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append('title', title.current?.value);
    formData.append('name', name.current?.value);
    formData.append('date', date.current?.value);
    formData.append('duration', duration.current?.value);
    formData.append('desc', desc.current?.value);
    formData.append('website', website.current?.value);
    formData.append('cert', cert.current?.value);
    formData.append('img', img.current?.files[0]);
    try {
      const response = await fetch(`${API_URL}/postEducation`, {
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
      <div className={styles.educationContainer}>
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
      <div className={styles.adjustEducation_add}>
        <div className={styles.adjustEducation_add_titles}>
          <span>Title</span>
          <span>Image</span>
          <span>Name</span>
          <span>Date</span>
          <span>Duration</span>
          <span>Description</span>
          <span>Website</span>
          <span>Certificate</span>
        </div>
        <div className={styles.adjustEducation_add_inputs}>
          <input type='text' ref={title} placeholder='Title'></input>
          <input type='file' ref={img} placeholder='Image'></input>
          <input type='text' ref={name} placeholder='Name'></input>
          <input type='text' ref={date} placeholder='Date'></input>
          <input type='text' ref={duration} placeholder='Duration'></input>
          <input type='text' ref={desc} placeholder='Description'></input>
          <input type='text' ref={website} placeholder='Website'></input>
          <input type='text' ref={cert} placeholder='Certificate'></input>
        </div>

        <button
          className={styles.adjustEducation_add_button}
          type='submit'
          onClick={submitHandler}
        >
          Add
        </button>
      </div>
    </div>
  );
};
export default AdjustEducation;
