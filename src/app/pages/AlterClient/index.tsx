import { EditClient } from "../../components/EditClient"
import styles from '../AlterClient/Alter.module.css'

export const AlterClient = () => {
  return(
    <div className={styles.container}>
      <EditClient />
    </div>
  )
}