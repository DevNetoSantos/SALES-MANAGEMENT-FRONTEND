import { NewEmployee } from "../../components/newEmployee";
import styles from '../AddEmployee/addEmployee.module.css'

export const AddEmployee = () => {
  return(
    <div className={styles.container}>
      <NewEmployee />
    </div>
  );
}