import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div data-testid='spinner' className={styles.spinner}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
