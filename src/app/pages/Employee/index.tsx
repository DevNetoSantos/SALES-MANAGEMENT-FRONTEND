import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { api } from "../../services/api";
import { TypeEmployee } from "../../Types/TypesEmployee";

export const Employee = () => {
  const [employee, setEmployee] = useState<TypeEmployee[]>([]);
  const [item,setItem] = useState({
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
 })
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

  const showDetail = async (id: number) =>
  {
    const response = await api.get(`employee/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    setItem(response.data)
  }
  function reverseString(str: string) {

    // empty string
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

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
                  <button type="button" className="btn btn-primary"  onClick={(e)=>showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Detalhes</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <h6>Data Criação : {item.createdAt.slice(0,10)}</h6>
              <h6>Data Atualização : {item.updatedAt.slice(0,10)}</h6>
              <h6>Name : {item.name}</h6>
              <h6>Sobrenome : {item.lastname}</h6>
              <h6>Email : {item.email}</h6>
              <h6>conta : {item.role}</h6>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Editar</button>
                <button type="button" className="btn btn-danger">Deletar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}