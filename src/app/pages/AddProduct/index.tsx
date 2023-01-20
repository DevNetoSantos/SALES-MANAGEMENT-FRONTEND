import { NewProduct } from "../../components/NewProduct";
import styles from '../AddProduct/AddProduct.module.css'

export const AddProduct = () => {
  return(
    <div className={styles.container}>
      <NewProduct/>
    </div>
  );
}