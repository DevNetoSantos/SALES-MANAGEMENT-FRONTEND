import { useAuth } from '../../context/AuthProvider/useAuth';
import styles from '../Logo/Logo.module.css';

export const Logo = () => {
  const auth = useAuth()

  const logou = () => {
    auth.logout();
  }

  return(
    <div className={styles.container}>
      <div>DevNetoSantos</div>
      <div>{auth.email}</div>
      <button className='btn btn-danger' onClick={logou}>Sair</button>
    </div>
  )
}