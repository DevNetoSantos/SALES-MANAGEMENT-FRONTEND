import { EditProduct } from "../../components/EditProduct";
import styles from '../AlterProduct/AlterProduct.module.css'

export const AlterProduct = () => {
  return(
    <div className={styles.container}>
      <EditProduct />
    </div>
  );
}