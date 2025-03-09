import styles from './Skills.module.css';

const Skills = ({ item }) => {
  return (
    <span className={styles['content__stack__description__skill']}>
      {item.skill}
    </span>
  );
};

export default Skills;
