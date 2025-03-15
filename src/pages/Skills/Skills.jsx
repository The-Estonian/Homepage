import styles from './Skills.module.css';

const Skills = ({ item, removeSkillHandler }) => {
  return (
    <span
      className={
        removeSkillHandler
          ? styles['content__stack__description__skill_admin']
          : styles['content__stack__description__skill']
      }
    >
      {item.skill}
      {removeSkillHandler && (
        <span
          className={styles['content__stack__description__skill_remove']}
          onClick={removeSkillHandler}
        >
          x
        </span>
      )}
    </span>
  );
};

export default Skills;
