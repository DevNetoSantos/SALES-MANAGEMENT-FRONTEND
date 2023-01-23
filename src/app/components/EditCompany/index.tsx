import { api } from '../../services/api';
import styles from '../EditCompany/EditCompany.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface IFormInputs {
  name: string;
  cnpj: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  cnpj: yup.string().required('campo cnpj e obrigatório'),
}).required();

export const EditCompany = () => {
 const auth = useAuth()
 const { id } = useParams();
 let navigate = useNavigate()

 const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});



 useEffect(()=>{
  api.get(`company/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  .then((res)=>{
    setValue('name', res.data.name)
    setValue('cnpj', res.data.cnpj)
  })
}, []) 

const onSubmit = async (data: IFormInputs) => await api.patch(`company/${id}`, data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
  })
  .then(()=>{
    return navigate("/company");
  })
  .catch((error)=>{
    console.log(error)
  })

  return(
    <div className={styles.container}>
      <div className={styles.areaForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>Editar Empresa</h1>
          </div>
          <hr />
          <div className={styles.formItem}>
            <label htmlFor="name">Nome</label><br />
            <input type="text" {...register("name")}/>
            <p>{errors.name?.message}</p> 
          </div>


          <div className={styles.formItem}>
            <label htmlFor="cnpj">CNPJ</label><br />
            <input type="cnpj" id="" {...register('cnpj')} />
            <p>{errors.cnpj?.message}</p>
          </div>

          <button className='btn btn-primary' type='submit' >Salvar</button>

        </form>
      </div>
    </div>
  )
}