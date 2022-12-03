import styles from '../Login/Login.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAuth } from "../../context/AuthProvider/useAuth";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('campo e-mail deve ser um e-mail válido').required('campo email e obrigatório'),
  password: yup.string().required('campo senha e obrigatório'),
}).required();

export const Login = () => {
  const auth = useAuth()
  
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IFormInputs) => {
    try {
      auth.authenticate(data.email, data.password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div>
          <h1>Entrar</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.formItem}>
              <label htmlFor="email">email</label><br />
              <input type="text" {...register("email")}/>
              <p>{errors.email?.message}</p> 
            </div>


            <div className={styles.formItem}>
              <label htmlFor="password">senha</label><br />
              <input type="password" id="" {...register('password')} />
              <p>{errors.password?.message}</p>
            </div>

            <button className='btn btn-primary' type='submit' >Login</button>

          </form>
        </div>
      </div>
    </div>
  );
}
