import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../EditProduct/EditProduct.module.css'
import { useEffect } from 'react';

interface IFormInputs {
  name: string;
  trader_comme: string;
  qts_item: string;
  value_sale: string;
  data_fabrication: string;
  due_date?: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  trader_comme: yup.string(),
  qts_item: yup.string(),
  value_sale: yup.string(),
  data_fabrication: yup.string(),
  due_date: yup.string()
}).required();

export const EditProduct = () => {
 const auth = useAuth()
 const { id } = useParams();
 let navigate = useNavigate();

 const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

useEffect(()=>{
  api.get(`product/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  .then((res)=>{
    setValue('name', res.data.name)
    setValue('trader_comme', res.data.trader_comme)
    setValue('qts_item', res.data.qts_item)
    setValue('value_sale', res.data.value_sale)
    setValue('data_fabrication', res.data.data_fabrication)
    setValue('due_date', res.data.due_date)
  })
}, [])

const onSubmit = async (data: IFormInputs) => api.patch(`product/${id}`, data, {
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
              <h1>Editar Produto</h1>
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
              <input type="text" {...register("data_fabrication")}/>
              <p>{errors.data_fabrication?.message}</p>
            </div>

            <div className={styles.formItem}>
              <label htmlFor="due_date">Data de Vencimento</label><br />
              <input type="text" {...register("due_date")}/>
              <p>{errors.due_date?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Salvar</button>

          </form>
        </div>
    </div>
  )
}