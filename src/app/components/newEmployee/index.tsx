import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import styles from '../newEmployee/newEmployee.module.css'

interface IFormInputs {
  name: string;
  lastname: string;
  email: string;
  password: string
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  lastname: yup.string().required('campo sobrenome e obrigatório'),
  email: yup.string().required('campo email e obrigatório'),
  password: yup.string().required('campo senha e obrigatório'),
}).required();

export const NewEmployee = () => {
 const auth = useAuth()
 let navigate = useNavigate();

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) => api.post('employee', data, {
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
              <h1>Novo Funcionário</h1>
            </div>
            <hr />
            <div className={styles.formItem}>
              <label htmlFor="name">Nome</label><br />
              <input type="text" {...register("name")}/>
              <p>{errors.name?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="lastname">Sobrenome</label><br />
              <input type="text" {...register("lastname")}/>
              <p>{errors.lastname?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="name">Email</label><br />
              <input type="text" {...register("email")}/>
              <p>{errors.email?.message}</p> 
            </div>

            <div className={styles.formItem}>
              <label htmlFor="password">Senha</label><br />
              <input type="password" id="" {...register('password')} />
              <p>{errors.password?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Criar</button>

          </form>
        </div>
    </div>
  )
}