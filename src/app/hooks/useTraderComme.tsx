import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider/useAuth";
import { api } from "../services/api";
import { TypeCompany } from "../Types/TypesCompany";
import { TypeProduct } from "../Types/TypesProduct";

export const traderComme = () => {
  const [trader, setTrader] = useState<TypeCompany[]>([]);
  const auth = useAuth()

  useEffect(() =>{
    const fetchTrader = async () => {
      try {
        const response = await api.get(`company`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setTrader(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTrader();
  }, []);

  return {
    trader
  }
}