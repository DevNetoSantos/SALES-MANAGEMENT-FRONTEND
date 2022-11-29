import { useEffect, useState } from "react";
import { api } from "../../services/api";

export const Home = () => {
  const [home, setHome] = useState([]);

  const gestSale = async () => {
    try {
      const response = await api.get('sale');
      setHome(response.data)
    }

    catch (error) {
      alert(error)
    }
  }

  useEffect(()=>{
    gestSale()
  }, []);

  return(
    <>
      {home.map((item, index) =>(
        <div key={index}>
          <h1>{item.product.name}</h1>
        </div>
      ))}
    </>
  )
}