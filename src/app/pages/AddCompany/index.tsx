import { NewCompany } from '../../components/NewCompany';
import styles from '../AddCompany/AddCompany.module.css'

export const AddCompany = () => {
  return (
    <div className={styles.container}>
      <NewCompany />
    </div>
  );
}