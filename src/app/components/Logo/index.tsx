import { useAuth } from '../../context/AuthProvider/useAuth';
import styles from '../Logo/Logo.module.css';
import { FiLogOut } from 'react-icons/fi'

export const Logo = () => {
  const auth = useAuth()

  const logou = () => {
    auth.logout();
  }

  return(
    <div className={styles.container}>
      <div>Olá, {auth.email}</div>
      <div className={styles.logoutButton}>
        <FiLogOut onClick={logou} className={styles.iconLogo}/> 
        <p>Sair</p>
      </div>
    </div>
  )
}