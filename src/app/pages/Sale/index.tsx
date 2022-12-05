import { useEffect, useState } from 'react';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { api } from '../../services/api';
import { TypeSale } from '../../Types/TypesSale';
import styles from '../Sale/Sale.module.css';

export const Sale = () => {
  const [sale, setSale] = useState<TypeSale[]>([]);
  const [takePage, setTakePage] = useState(1); //mudar depois para 5
  const [skipPage, setSkipPage] = useState(1);
  const [item,setItem] = useState({
    id: '',
    createdAt: '',
    updatedAt: '',
    qts_product: '',
    pay_value: ''
 })
  const auth = useAuth()

  const startIndex = skipPage * takePage;
  const endIndex = startIndex - takePage;
  const currentSale = sale.slice(endIndex, startIndex);

  const paginate = (pageNumber: any) => {
    setSkipPage(pageNumber);
  }

  useEffect(() =>{
    const fetchSale = async () => {
      try {
        const response = await api.get('sale', {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setSale(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchSale();
  }, []);

  const showDetail = async (id: number) =>
  {
    const response = await api.get(`sale/${id}`, {
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
            <th scope="col">Quantidade de Produto</th>
            <th scope="col">Valor a Pagar</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentSale.map((item, index) =>(
            <tr key={index}>
              <td>{item.qts_product}</td>
              <td>{item.pay_value}</td>
              <td>
                <button type="button" className="btn btn-primary"  onClick={(e)=>showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  View
                </button>
              </td>
            </tr>  
          ))}
        </tbody>
      </table>

      <Pagination takePage={takePage} totalNames={sale.length} paginate={paginate}/>

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
            <h6>Quantidade de Produto : {item.qts_product}</h6>
            <h6>Valor a Pagar : {item.pay_value}</h6>
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