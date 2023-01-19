import { EditEmployee } from '../../components/EditEmployee';
import styles from '../AlterEmployee/AlterEmployee.module.css'

export const AlterEmployee = () => {
  return(
    <div className={styles.container}>
      <EditEmployee />
    </div>
  );
}