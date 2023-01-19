import { NewEmployee } from "../../components/NewEmployee";
import styles from '../AddEmployee/addEmployee.module.css'

export const AddEmployee = () => {
  return(
    <div className={styles.container}>
      <NewEmployee />
    </div>
  );
}