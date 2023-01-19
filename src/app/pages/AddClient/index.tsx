import { NewClient } from '../../components/NewClient';
import styles from '../AddClient/addClient.module.css'

export const AddClient = () => {
  return(
    <div className={styles.container}>
      <NewClient/>
    </div>
  );
}