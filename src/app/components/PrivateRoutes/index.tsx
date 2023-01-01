import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import styles from '../PrivateRoutes/PrivateRoutes.module.css';

  export const PrivateRoute = () => {
  const auth = useAuth();

  if(!auth.access_token) {
    return(
      <div className={styles.container}>
        <div className={styles.item}>
          <h1>Voce não esta logado</h1>
          <Link to="/login">
            <button className="btn btn-primary">Fazer Login</button>
          </Link>
        </div>
      </div>
    )
  }

  return <Outlet />
}