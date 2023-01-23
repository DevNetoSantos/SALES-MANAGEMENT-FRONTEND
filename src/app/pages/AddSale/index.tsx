import { NewSale } from '../../components/NewSale';
import styles from '../AddSale/AddSale.module.css';

export const AddSale = () => {
  return(
    <div className={styles.container}>
      <NewSale />
    </div>
  );
}