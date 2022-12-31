import { useEffect, useState } from 'react';
import styles from '../Client/Client.module.css';
import { TypeClient } from '../../Types/TypesClient';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Pagination } from '../../components/Pagination';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from 'react-router-dom';

interface IFormInputs {
  name: string;
  cpf: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  cpf: yup.string().required('campo cpf e obrigatório').min(11, 'cpf deve ter pelo menos 11 caracteres').max(11, 'cpf deve ter no máximo 11 caracteres'),
}).required();

export const Client = () => {
  const [client, setClient] = useState<TypeClient[]>([]);
  const [takePage, setTakePage] = useState(8);
  const [skipPage, setSkipPage] = useState(1);
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

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => await api.put(`client/${item.id}`, data, {
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

  return(
    <div className={styles.container}>
      <div className={styles.containerTitle}>
      <Link to="/newclient">
        <button className='btn btn-primary'>Novo Cliente</button>
      </Link>
        <div className={styles.buttonTitle}>
          <input type="search" placeholder='Buscar' />
        </div>
        <div>
          <h1>Clientes</h1>
        </div>
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
          {currentClient.map((item) =>(
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.cpf}</td>
              <td className={styles.tdAction}>
                  <button type="button" className="btn btn-info"  onClick={(e)=>showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Detalhe
                  </button>
                  <button type="button" className="btn btn-primary" onClick={(e) => showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModalll">
                    Editar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={(e)=>deleteClient(item.id)} >Deletar</button>
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

      <div className="modal fade" id="exampleModalll" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="">
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.formItem}>
                      <label htmlFor="name">Nome</label><br />
                      <input type="text" {...register("name")}/>
                      <p>{errors.name?.message}</p> 
                    </div>


                    <div className={styles.formItem}>
                      <label htmlFor="cpf">CPF</label><br />
                      <input type="cpf" id="" {...register('cpf')} />
                      <p>{errors.cpf?.message}</p>
                    </div>

                    <button className='btn btn-primary' type='submit' >Salvar</button>

                  </form>
                </div>
              </div>
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