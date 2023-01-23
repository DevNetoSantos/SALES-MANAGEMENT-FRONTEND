import { api } from '../../services/api';
import styles from '../NewSale/NewSale.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../hooks/useClient';
import { useEmployee } from '../../hooks/useEmployee';
import { useProduct } from '../../hooks/useProduct';

interface IFormInputs {
  qts_product: string;
  pay_value: string;
  clientId: number;
  employeeId: number;
  productId: number;
}

const schema = yup.object({
  qts_product: yup.string(),
  pay_value: yup.string(),
  clientId: yup.number(),
  employeeId: yup.number(),
  productId: yup.number()
}).required();

export const NewSale = () => {
 const auth = useAuth()
 const { client } = useClient();
 const { employee } = useEmployee();
 const { product } = useProduct();
 let navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) => api.post('sale', data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
})
.then(()=>{
  return navigate("/sale");
})
.catch((error)=>{
  console.log(error)
})

  return(
    <div className={styles.container}>
        <div className={styles.areaForm}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <h1>Nova Venda</h1>
            </div>
            <hr />
            <div className={styles.formItem}>
              <label htmlFor="qts_product">Quantidades do produto</label><br />
              <input type="text" {...register("qts_product")}/>
              <p>{errors.qts_product?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="pay_value">Valor</label><br />
              <input type="text" {...register("pay_value")}/>
              <p>{errors.pay_value?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="clientId">Cliente</label><br />
                <select {...register("clientId")}>
                  {client.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                <option value="" selected>--- Escolha ---</option>
                </select>
                <p>{errors.clientId?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="employeeId">Funcionário</label><br />
                <select {...register("employeeId")}>
                  {employee.map((item) => (
                    <option value={item.id}>{item.name}</option>  
                  ))}
                <option value="" selected>--- Escolha ---</option>
                </select>
                <p>{errors.employeeId?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="productId">Produto</label><br />
                <select {...register("productId")}>
                {product.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                <option value="" selected>--- Escolha ---</option>
                </select>
                <p>{errors.productId?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Criar</button>

          </form>
        </div>
    </div>
  )
}