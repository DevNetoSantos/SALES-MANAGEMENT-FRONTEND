import { NavLink } from 'react-router-dom';
import styles from '../Navbar/Navbar.module.css';

export const Navbar = () => {
  return(
    <div className={styles.container}>
      <nav className="nav flex-column">
        <NavLink className="nav-link" to="/client">Cliente</NavLink>
        <NavLink className="nav-link" to="/employee">Funcionário</NavLink>
        <NavLink className="nav-link" to="/company">Empresa</NavLink>
        <NavLink className="nav-link" to="/product">Produto</NavLink>
        <NavLink className="nav-link" to="/sale">Vendas</NavLink>
      </nav>
    </div>
  )
}