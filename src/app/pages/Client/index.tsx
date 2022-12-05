import { useEffect, useState } from 'react';
import styles from '../Client/Client.module.css';
import { TypeClient } from '../../Types/TypesClient';
import axios from 'axios';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthProvider/useAuth';

export const Client = () => {
  const [client, setClient] = useState<TypeClient[]>([]);
  const auth = useAuth()

  useEffect(() =>{
    const fetchCliet = async () => {
      try {
        const response = await api.get('client', {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setClient(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchCliet();
  }, []);

  return(
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">CPF</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {client.map((item, index) =>(
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.cpf}</td>
              <td>@mdo</td>
            </tr>  
          ))}
        </tbody>
      </table>
    </div>  
  )
}