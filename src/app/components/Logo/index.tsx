import { useAuth } from '../../context/AuthProvider/useAuth';
import styles from '../Logo/Logo.module.css';
import { FcNext } from 'react-icons/fc'

export const Logo = () => {
  const auth = useAuth()

  const logou = () => {
    auth.logout();
  }

  return(
    <div className={styles.container}>
      <h4>Olá, {auth.email}</h4>
      <div className={styles.logoutButton}>
        <FcNext onClick={logou} className={styles.iconLogo}/> 
        <p>Sair</p>
      </div>
    </div>
  )
}