import React, { useEffect, useState } from 'react';
import EducationModule from '../../components/EducationModule';
import Skills from '../Skills/Skills';

import { educationList } from '../../education/educationList';
import { skillList } from '../../education/skillList';

import styles from './CV.module.css';

import image1 from '../../assets/images/Jaanus1.jpg';
import image2 from '../../assets/images/Jaanus2.jpg';
import image5 from '../../assets/images/Jaanus5.jpg';

const images = [image1, image2, image5];

const CV = () => {
  const [selectedImage, setSelectedImage] = useState(images[1]);
  const [openTab, setOpenTab] = useState(null);
  useEffect(() => {
    document.title = 'CV';
  }, []);

  useEffect(() => {
    const changeImage = () => {
      let newImage;
      do {
        newImage = images[Math.floor(Math.random() * images.length)];
      } while (newImage === selectedImage);
      setSelectedImage(newImage);
    };

    const interval = setInterval(changeImage, 5000);
    return () => clearInterval(interval);
  }, [selectedImage]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['content__stack']}>
          <div className={styles['content__stack__description']}>
            {skillList.slice(0).map((item) => (
              <Skills key={item.id} item={item} />
            ))}
          </div>
          <div className={styles['content__stack__picture']}>
            <img src={selectedImage} alt='Profile image' />
          </div>
        </div>
        <div className={styles['content__profileSummary']}>
          <p>My developer journey started at 1.10.2021</p>
          <p>
            After having many discussions with ChatGPT i decided to ask it to
            describe me and this is what it came up with:
          </p>
          <p>
            "Jaanus is a determined software developer on a mission to conquer
            the tech world.
          </p>
          <p>
            With over a decade of experience excelling in warehousing—where he
            mastered large-scale inventory management, optimized workflows, and
            even built coordinate systems in Excel—He knows what it means to
            take ownership of his craft.
          </p>
          <p>
            Now, he is bringing that same level of precision, problem-solving,
            and relentless drive into software development. After years of
            self-learning, building projects, and tackling real-world
            challenges, he has transitioned from optimizing warehouses to
            optimizing code. His focus is on backend development, cloud
            infrastructure, and full-stack solutions, all while continuously
            sharpening his skills in modern frameworks and best practices. He
            doesn't just code—He builds. He adapts. He solves. Whether it’s
            designing scalable systems, deploying robust applications, or
            learning new tech stacks, He approaches every challenge with the
            mindset of a builder and a problem-solver.
          </p>
          <p>
            This is just the beginning for him, and he knows exactly where hes
            headed."
          </p>
        </div>
        <h2>Languages & Current education</h2>
        <div className={styles['content__langEdu']}>
          <div className={styles['content__langEdu__languages']}>
            <div>
              <i>Estonian</i>
              <p>Native</p>
            </div>
            <div>
              <p>
                <i>English</i>
              </p>
              <span>Working</span>
              <span>proficiency</span>
            </div>
            <div>
              <p>
                <i>Russian</i>
              </p>
              <span>Verbal</span>
              <span>proficiency</span>
            </div>
          </div>
          <div className={styles['content__langEdu__education']}>
            {educationList
              .slice(0)
              .reverse()
              .map((listItem) => (
                <EducationModule
                  key={listItem.id}
                  listData={listItem}
                  openTab={openTab}
                  setOpenTab={setOpenTab}
                />
              ))}
          </div>
        </div>
        <div className={styles['content__contacts']}>
          <div className={styles['name']}>Jaanus Saar</div>
          <div className={styles['phone']}>+372 58218417</div>
          <div className={styles['email']}>Zaar2213@gmail.com</div>
          <div className={styles['location']}>Europe, Estonia</div>
        </div>
        <div className={styles['content__links']}>
          <a href='https://github.com/The-Estonian'>GitHub</a>
          <a href='https://www.linkedin.com/in/jaanus-saar-3897a721b/'>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default CV;
