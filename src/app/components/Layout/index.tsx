import { Footer } from "../Footer";
import { Header } from "../Header";
import { Logo } from "../Logo";
import { Navbar } from "../Navbar";
import styles from '../Layout/Layout.module.css';
import { Outlet } from "react-router-dom";

type Props = {
  children: JSX.Element
}

export const Layout = () => {
  return(
    <div className={styles.container}>
      <Logo />
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}