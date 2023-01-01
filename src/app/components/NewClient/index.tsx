import { api } from '../../services/api';
import styles from '../NewClient/NewClient.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  name: string;
  cpf: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  cpf: yup.string().required('campo cpf e obrigatório').min(11, 'cpf deve ter pelo menos 11 caracteres').max(11, 'cpf deve ter no máximo 11 caracteres'),
}).required();

export const NewClient = () => {
 const auth = useAuth()
 let navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) => api.post('client', data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
})
.then(()=>{
  return navigate("/client");
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
              <label htmlFor="cpf">CPF</label><br />
              <input type="cpf" id="" {...register('cpf')} />
              <p>{errors.cpf?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Criar</button>

          </form>
        </div>
    </div>
  )
}