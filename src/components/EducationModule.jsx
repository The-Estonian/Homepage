import styles from './EducationModule.module.css';

const EducationModule = ({ listData, openTab, setOpenTab }) => {
  return (
    <div
      className={styles['content__langEdu__education__divider']}
      onClick={() => {
        if (openTab === listData.id) {
          setOpenTab(null);
        } else {
          setOpenTab(listData.id);
        }
      }}
    >
      <img src={listData.img} alt='education provider image' />
      <div
        className={styles['content__langEdu__education__divider__container']}
      >
        <p>{listData.name}</p>
        {!openTab === listData.id && <p>{listData.duration}</p>}
        {openTab === listData.id && <p>{listData.date}</p>}
        <p>{listData.desc}</p>
        {openTab === listData.id && (
          <div
            className={styles['content__langEdu__education__divider__focus']}
          >
            <a href={listData.website} target='_blank'>
              Link to course site!
            </a>
            {listData.cert && (
              <a href={listData.cert} target='_blank'>
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
