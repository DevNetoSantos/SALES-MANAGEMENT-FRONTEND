import { useEffect, useState } from 'react';
import styles from '../Client/Client.module.css';
import { TypeClient } from '../../Types/TypesClient';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Pagination } from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

export const Client = () => {
  const [client, setClient] = useState<TypeClient[]>([]);
  const [takePage, setTakePage] = useState(8);
  const [skipPage, setSkipPage] = useState(1);
  const [search, setSearch] = useState('');
  const [item,setItem] = useState({
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    cpf: ''
 })
  const auth = useAuth()

  const startIndex = skipPage * takePage;
  const endIndex = startIndex - takePage;
  const currentClient = client.slice(endIndex, startIndex);

  const paginate = (pageNumber: any) => {
    setSkipPage(pageNumber);
  }

  useEffect(() =>{
    const fetchCliet = async () => {
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
    fetchCliet();
  }, []);


  const showDetail = async (id: number) =>
  {
    const response = await api.get(`client/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    setItem(response.data)
  }

  const deleteClient = async (id: number) => {
    await api.delete(`client/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    .then(()=>{
      window.location.reload()
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const searchLowercase = search.toLocaleLowerCase();
  const teams =  currentClient.filter((team) =>
    team.name.toLocaleLowerCase().includes(searchLowercase)) //button search

  return(
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <Link className='link' to="/newclient">
          <button className='btn btn-primary'>Novo Cliente</button>
        </Link>
        <div className={styles.buttonTitle}>
          <input type='search' placeholder='Buscar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h1>Clientes</h1>
      </div>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">CPF</th>
            <th className={styles.thAction} scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((item) =>(
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.cpf}</td>
              <td className={styles.tdAction}>
                <TbListDetails className={styles.iconsAction} onClick={(e)=>showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                <Link to={{pathname: `/editclient/${item.id}`}}>
                  <AiFillEdit className={styles.iconsAction} />
                </Link>
                <AiFillDelete className={styles.iconsAction} onClick={(e)=>deleteClient(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination takePage={takePage} totalNames={client.length} paginate={paginate}/>

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
            <h6>Cpf : {item.cpf}</h6>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}