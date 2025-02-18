import styles from './Modal.module.css';

const Modal = ({ handleCloseSelectedProject }) => {
  return (
    <div className={styles.modal} onClick={handleCloseSelectedProject}></div>
  );
};

export default Modal;
