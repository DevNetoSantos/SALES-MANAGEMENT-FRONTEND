import { useEffect, useState } from 'react';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { api } from '../../services/api';
import { TypeCompany } from '../../Types/TypesCompany';
import styles from '../Company/Company.module.css';

export const Company = () => {
  const [company, setCompany] = useState<TypeCompany[]>([]);
  const [takePage, setTakePage] = useState(1); //mudar depois para 5
  const [skipPage, setSkipPage] = useState(1);
  const [item,setItem] = useState({
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    cnpj: ''
 })
  const auth = useAuth()

  const startIndex = skipPage * takePage;
  const endIndex = startIndex - takePage;
  const currentClient = company.slice(endIndex, startIndex);

  const paginate = (pageNumber: any) => {
    setSkipPage(pageNumber);
  }

  useEffect(() =>{
    const fetchCompany = async () => {
      try {
        const response = await api.get('company', {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setCompany(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompany();
  }, []);

  const showDetail = async (id: number) =>
  {
    const response = await api.get(`company/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    setItem(response.data)
  }

  return(
    <div className={styles.container}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">CNPJ</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentClient.map((item, index) =>(
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.cnpj}</td>
              <td>
                <button type="button" className="btn btn-primary"  onClick={(e)=>showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  View
                </button>
              </td>
            </tr>  
          ))}
        </tbody>
      </table>

      <Pagination takePage={takePage} totalNames={company.length} paginate={paginate}/>

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
            <h6>Cnpj : {item.cnpj}</h6>
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