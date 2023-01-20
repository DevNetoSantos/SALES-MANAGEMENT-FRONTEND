import { api } from '../../services/api';
import styles from '../NewProduct/NewProduct.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  name: string;
  trader_comme: string;
  qnts_item: string;
  value_sale: string;
  data_fabrication: string;
  due_date?: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  trader_comme: yup.string(),
  qnts_item: yup.string(),
  value_sale: yup.string(),
  data_fabrication: yup.string(),
  due_date: yup.string()
}).required();

export const NewProduct = () => {
 const auth = useAuth()
 let navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) => api.post('product', data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
})
.then(()=>{
  return navigate("/product");
})
.catch((error)=>{
  console.log(error)
})

  return(
    <div className={styles.container}>
        <div className={styles.areaForm}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <h1>Novo Cliente</h1>
            </div>
            <hr />
            <div className={styles.formItem}>
              <label htmlFor="name">Nome</label><br />
              <input type="text" {...register("name")}/>
              <p>{errors.name?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="trader_comme">Comercinate</label><br />
              <input type="text" {...register("trader_comme")}/>
              <p>{errors.trader_comme?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="qnts_item">Quantidade</label><br />
              <input type="number" {...register("qnts_item")}/>
              <p>{errors.qnts_item?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="value_sale">Valor da Revenda</label><br />
              <input type="text" {...register("value_sale")}/>
              <p>{errors.value_sale?.message}</p>
            </div>

            <div className={styles.formItem}>
              <label htmlFor="data_fabrication">Data de Fabricação</label><br />
              <input type="date" {...register("data_fabrication")}/>
              <p>{errors.data_fabrication?.message}</p>
            </div>

            <div className={styles.formItem}>
              <label htmlFor="due_date">Data de Vencimento</label><br />
              <input type="date" {...register("due_date")}/>
              <p>{errors.due_date?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Adicionar</button>

          </form>
        </div>
    </div>
  )
}