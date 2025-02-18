import React, { useState } from 'react';

import styles from './EducationModule.module.css';

const EducationModule = (props) => {
  const [menu, setMenu] = useState(false);
  return (
    <div
      className={styles['content__langEdu__education__divider']}
      onClick={() => {
        setMenu(!menu);
      }}
    >
      <img src={props.listData.img} alt='education provider image' />
      <div className={styles['content__langEdu__education__divider__container']}>
        <p>{props.listData.name}</p>
        <p>{props.listData.date}</p>
        <p>{props.listData.desc}</p>
        {menu && (
          <div
            className={styles['content__langEdu__education__divider__focus']}
          >
            <a href={props.listData.website} target='_blank'>
              Link to course site!
            </a>
            {props.listData.cert && (
              <a href={props.listData.cert} target='_blank'>
                Certificate
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationModule;
