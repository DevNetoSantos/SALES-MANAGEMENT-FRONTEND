import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { api } from '../../services/api';
import styles from '../Content/Content.module.css';

export const Content = () => {
  const [home, setHome] = useState([]);
  const auth = useAuth()
  
  const gestSale = async () => {
  try {
    const response = await api.get('sale', {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    });
    setHome(response.data)
  }
  catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    gestSale()
  }, []);

  return(
    <div className={styles.container}>
      <>
        {home.map((item, index) =>(
          <div key={index}>
          <h1>{item.product.name}</h1>
          </div>
        ))}
      </>
    </div>
  )
}