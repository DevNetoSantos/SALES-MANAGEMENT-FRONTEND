import { api } from '../../services/api';
import styles from '../EditEmployee/EditEmployee.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface IFormInputs {
  name: string;
  lastname: string;
  email: string,
  password: string
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  lastname: yup.string().required('campo sobrenome e obrigatório'),
  email: yup.string().required('campo email e obrigatório'),
  password: yup.string().required('campo password e obrigatório'),
}).required();

export const EditEmployee = () => {
 const auth = useAuth()
 const { id } = useParams();
 let navigate = useNavigate()

 const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});



 useEffect(()=>{
  api.get(`employee/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  .then((res)=>{
    setValue('name', res.data.name)
    setValue('lastname', res.data.lastname)
    setValue('email', res.data.email)
    setValue('password', res.data.password)
  })
}, []) 

const onSubmit = async (data: IFormInputs) => await api.patch(`employee/${id}`, data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
  })
  .then(()=>{
    return navigate("/employee");
  })
  .catch((error)=>{
    console.log(error)
  })

  return(
    <div className={styles.container}>
      <div className={styles.areaForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>Editar Cliente</h1>
          </div>
          <hr />
          <div className={styles.formItem}>
            <label htmlFor="name">Nome</label><br />
            <input type="text" {...register("name")}/>
            <p>{errors.name?.message}</p> 
          </div>

          <div className={styles.formItem}>
            <label htmlFor="lastname">Sobrenome</label><br />
            <input type="text" id="" {...register('lastname')} />
            <p>{errors.lastname?.message}</p>
          </div>

          <div className={styles.formItem}>
            <label htmlFor="email">Email</label><br />
            <input type="email" id="" {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>

          <div className={styles.formItem}>
            <label htmlFor="password">Senha</label><br />
            <input type="password" id="" {...register('password')} />
            <p>{errors.password?.message}</p>
          </div>

          <button className='btn btn-primary' type='submit' >Salvar</button>

        </form>
      </div>
    </div>
  )
}