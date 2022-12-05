import { useEffect, useState } from 'react';
import { Pagination } from '../../components/Pagination';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { api } from '../../services/api';
import { TypeProduct } from '../../Types/TypesProduct';
import styles from '../Product/Product.module.css';

export const Product = () => {
  const [product, setProduct] = useState<TypeProduct[]>([]);
  const [takePage, setTakePage] = useState(1); //mudar depois para 5
  const [skipPage, setSkipPage] = useState(1);
  const [item,setItem] = useState({
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    trader_comme: '',
    cod_reference: '',
    qts_item: '',
    value_sale: '',
    data_fabrication: '',
    due_date: '',
 })
  const auth = useAuth()

  const startIndex = skipPage * takePage;
  const endIndex = startIndex - takePage;
  const currentProduct = product.slice(endIndex, startIndex);

  const paginate = (pageNumber: any) => {
    setSkipPage(pageNumber);
  }

  useEffect(() =>{
    const fetchProduct = async () => {
      try {
        const response = await api.get('product', {
          headers: {
            Authorization: `Bearer ${auth.access_token}`
          }
        });
        setProduct(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct();
  }, []);

  const showDetail = async (id: number) =>
  {
    const response = await api.get(`product/${id}`, {
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
          <th scope="col">Comerciante</th>
          <th scope="col">Código Produto</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Valor Revenda</th>
          <th scope="col">Data Fabricação</th>
          <th scope="col">Data Vencimento</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentProduct.map((item, index) =>(
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.trader_comme}</td>
            <td>{item.cod_reference}</td>
            <td>{item.qts_item}</td>
            <td>{item.value_sale}</td>
            <td>{item.data_fabrication}</td>
            <td>{item.due_date}</td>
            <td>
              <button type="button" className="btn btn-primary"  onClick={(e)=>showDetail(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                View
              </button>
            </td>
          </tr>  
        ))}
      </tbody>
    </table>

    <Pagination takePage={takePage} totalNames={product.length} paginate={paginate}/>

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
          <h6>Nome : {item.name}</h6>
          <h6>Comerciante : {item.trader_comme}</h6>
          <h6>Código Produto : {item.cod_reference}</h6>
          <h6>Quantidades : {item.qts_item}</h6>
          <h6>Valor Revenda : {item.value_sale}</h6>
          <h6>Data Fabricação : {item.data_fabrication}</h6>
          <h6>Data de Vencimento : {item.due_date}</h6>
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