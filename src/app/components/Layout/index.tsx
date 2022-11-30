import { ReactElement } from "react"
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Logo } from "../Logo";
import { Navbar } from "../Navbar";
import styles from '../Layout/Layout.module.css';

type Props = {
  children: ReactElement
}

export const Layout = ({children}: Props) => {
  return(
    <div className={styles.container}>
      <Logo />
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}