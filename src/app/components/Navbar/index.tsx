import { NavLink } from 'react-router-dom';
import styles from '../Navbar/Navbar.module.css';

export const Navbar = () => {
  return(
    <div className={styles.container}>
      <nav className="nav flex-column">
        <NavLink className="nav-link" to="/client">Clientes</NavLink>
        <NavLink className="nav-link" to="/employee">Funcionários</NavLink>
        <NavLink className="nav-link" to="/company">Empresas</NavLink>
        <NavLink className="nav-link" to="/product">Produtos</NavLink>
        <NavLink className="nav-link" to="/sale">Vendas</NavLink>
      </nav>
    </div>
  )
}