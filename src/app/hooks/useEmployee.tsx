import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider/useAuth";
import { api } from "../services/api";
import { TypeEmployee } from "../Types/TypesEmployee";

export const useEmployee = () => {
  const [employee, setEmployee] = useState<TypeEmployee[]>([]);
  const auth = useAuth()

  useEffect(() =>{
    const fetchTrader = async () => {
      try {
        const response = await api.get(`employee`, {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setEmployee(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTrader();
  }, []);

  return {
    employee
  }
}