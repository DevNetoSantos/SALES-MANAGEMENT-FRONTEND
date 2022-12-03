import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { api } from "../../services/api";
import { TypeEmployee } from "../../Types/TypesEmployee";

export const Employee = () => {
  const [employee, setEmployee] = useState<TypeEmployee[]>([]);
  const auth = useAuth()

  const getEmployee = async () => {
    try {
      const response = await api.get('employee', {
        headers: {
          Authorization: `Bearer ${auth.access_token}`
        }
    });
    setEmployee(response.data)
  }
  catch (error) {
    console.log(error)
    }
  }

  useEffect(()=>{
    getEmployee()
  }, []);

  return(
    <div className="">
        <table className="table">
          <thead className=''>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Sobrenome</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((item, index)=> (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}