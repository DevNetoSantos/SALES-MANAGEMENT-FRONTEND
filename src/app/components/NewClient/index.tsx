import { api } from '../../services/api';
import styles from '../NewClient/NewClient.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";

interface IFormInputs {
  name: string;
  cpf: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  cpf: yup.string().required('campo cpf e obrigatório'),
}).required();

export const NewClient = () => {
 const auth = useAuth()

 const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const onSubmit = async (data: IFormInputs) => api.post('client', data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
})
.catch((error)=>{
  console.log(error)
})

  return(
    <div className=''>
      <button type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModall">
      Novo Cliente
      </button>

      <div className="modal fade" id="exampleModall" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Novo Cliente</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className={styles.subContainer}>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>

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
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}