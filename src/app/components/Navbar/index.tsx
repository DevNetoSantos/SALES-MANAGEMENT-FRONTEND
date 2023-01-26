import { NavLink } from 'react-router-dom';
import styles from '../Navbar/Navbar.module.css';
import {FcSalesPerformance, FcAssistant, FcLibrary, FcMultipleSmartphones, FcBarChart} from 'react-icons/fc'

export const Navbar = () => {
  return(
    <div className={styles.container}>
      <nav className="nav flex-column">
        <NavLink className="nav-link" to="/client"><FcSalesPerformance /><span>Clientes</span></NavLink>
        <NavLink className="nav-link" to="/employee"><FcAssistant/><span>Funcionários</span></NavLink>
        <NavLink className="nav-link" to="/company"><FcLibrary/><span>Empresas</span></NavLink>
        <NavLink className="nav-link" to="/product"><FcMultipleSmartphones/><span>Produtos</span></NavLink>
        <NavLink className="nav-link" to="/sale"><FcBarChart/><span>Vendas</span></NavLink>
      </nav>
    </div>
  )
}