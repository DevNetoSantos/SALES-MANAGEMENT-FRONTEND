import { api } from '../../services/api';
import styles from '../NewProduct/NewProduct.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { traderComme } from '../../hooks/useTraderComme';

interface IFormInputs {
  name: string;
  trader_comme: string;
  qts_item: string;
  value_sale: string;
  data_fabrication: string;
  due_date?: string;
  companyId: number
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  trader_comme: yup.string(),
  qts_item: yup.string(),
  value_sale: yup.string(),
  data_fabrication: yup.string(),
  due_date: yup.string(),
  companyId: yup.number()
}).required();

export const NewProduct = () => {
  const { trader } = traderComme();
 const auth = useAuth()
 let navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) =>  api.post('product', data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
})
.then(()=>{
  return navigate("/product");
})
.catch((error)=>{
  console.log(error)
});

  return(
    <div className={styles.container}>
        <div className={styles.areaForm}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <h1>Novo Produto</h1>
            </div>
            <hr />
            <div className={styles.formItem}>
              <label htmlFor="name">Nome</label><br />
              <input type="text" {...register("name")}/>
              <p>{errors.name?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="trader_comme">Comerciante</label><br />
              <input type="text" {...register("trader_comme")}/>
              <p>{errors.trader_comme?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="companyId">Empresa</label><br />
                <select {...register("companyId")}>
                  {trader.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
                <p>{errors.companyId?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="qts_item">Quantidade</label><br />
              <input type="number" {...register("qts_item")}/>
              <p>{errors.qts_item?.message}</p> 
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