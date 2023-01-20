import { api } from '../../services/api';
import styles from '../NewCompany/NewCompany.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  name: string;
  cnpj: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  cnpj: yup.string().required('campo cnpj e obrigatório'),
}).required();

export const NewCompany = () => {
 const auth = useAuth()
 let navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) => api.post('company', data, {
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
              <h1>Nova Empresa</h1>
            </div>
            <hr />
            <div className={styles.formItem}>
              <label htmlFor="name">Nome</label><br />
              <input type="text" {...register("name")}/>
              <p>{errors.name?.message}</p> 
            </div>


            <div className={styles.formItem}>
              <label htmlFor="cnpk">CNPJ</label><br />
              <input type="cnpj" id="" {...register('cnpj')} />
              <p>{errors.cnpj?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Criar</button>

          </form>
        </div>
    </div>
  )
}