import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider/useAuth";
import { api } from "../services/api";
import { TypeProduct } from "../Types/TypesProduct";

export const useProduct = () => {
  const [product, setProduct] = useState<TypeProduct[]>([]);
  const auth = useAuth()

  useEffect(() =>{
    const fetchTrader = async () => {
      try {
        const response = await api.get(`product`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setProduct(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTrader();
  }, []);

  return {
    product
  }
}