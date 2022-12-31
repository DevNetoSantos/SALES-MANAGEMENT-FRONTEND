import { NewClient } from '../../components/NewClient';
import styles from '../AddClient/Add.module.css'

export const AddClient = () => {
  return(
    <div className={styles.container}>
      <NewClient/>
    </div>
  )
}