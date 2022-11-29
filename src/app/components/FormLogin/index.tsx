import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthProvider/useAuth";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('campo e-mail deve ser um e-mail válido').required('campo email e obrigatório'),
  password: yup.string().required('campo senha e obrigatório'),
}).required();

export const FormLogin = () => {
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
    
    <form onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="email">email</label>
      <input type="text" {...register("email")}/>
      <p>{errors.email?.message}</p> 

      <label htmlFor="password">senha</label>
      <input type="password" id="" {...register('password')} />
      <p>{errors.password?.message}</p>
      
      <input type="submit" />

    </form>
  );
}
