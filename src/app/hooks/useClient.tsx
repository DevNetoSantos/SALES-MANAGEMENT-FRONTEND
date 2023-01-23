import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider/useAuth";
import { api } from "../services/api";
import { TypeClient } from "../Types/TypesClient";

export const useClient = () => {
  const [client, setClient] = useState<TypeClient[]>([]);
  const auth = useAuth()

  useEffect(() =>{
    const fetchTrader = async () => {
      try {
        const response = await api.get(`client`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setClient(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTrader();
  }, []);

  return {
    client
  }
}