import { Content } from '../../components/Content';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Logo } from '../../components/Logo';
import { Navbar } from '../../components/Navbar';
import styles from '../Home/Home.module.css';

export const Home = () => {
  return(
    <div className={styles.container}>
      <Logo />
      <Header />
      <Navbar />
      <Content />
      <Footer />
    </div>
  )
}