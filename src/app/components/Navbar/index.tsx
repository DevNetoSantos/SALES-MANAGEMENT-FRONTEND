import styles from '../Navbar/Navbar.module.css';

export const Navbar = () => {
  return(
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.icon}>#</div>
        <div>Cliente</div>
      </div>

      <div className={styles.item}>
        <div className={styles.icon}>#</div>
        <div>Empresa</div>
      </div>

      <div className={styles.item}>
        <div className={styles.icon}>#</div>
        <div>Funcionário</div>
      </div>

      <div className={styles.item}>
        <div className={styles.icon}>#</div>
        <div>Produto</div>
      </div>

      <div className={styles.item}>
        <div className={styles.icon}>#</div>
        <div>Vendas</div>
      </div>
    </div>
  )
}