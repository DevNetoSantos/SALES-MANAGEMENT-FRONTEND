import { useAuth } from '../../context/AuthProvider/useAuth';
import styles from '../Logo/Logo.module.css';

export const Logo = () => {
  const auth = useAuth()
  return(
    <div className={styles.container}>
      <div>logo</div>
      <div>DevNetoSantos</div>
      <div>{auth.email}</div>
    </div>
  )
}