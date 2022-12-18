import { api } from '../../services/api';
import styles from '../EditClient/EditClient.module.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthProvider/useAuth';
import * as yup from "yup";
import { useEffect, useState } from 'react';

interface IFormInputs {
  name: string;
  cpf: string;
}

const schema = yup.object({
  name: yup.string().required('campo nome e obrigatório'),
  cpf: yup.string().required('campo cpf e obrigatório').min(11, 'cpf deve ter pelo menos 11 caracteres').max(11, 'cpf deve ter no máximo 11 caracteres'),
}).required();

export const EditClient = () => {
 const auth = useAuth()
 const [item,setItem] = useState({
  id: '',
  createdAt: '',
  updatedAt: '',
  name: '',
  cpf: ''
})

 const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>({
  resolver: yupResolver(schema)
});

const showDetail = async (id: number) =>
{
  const response = await api.get(`client/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  setItem(response.data)
}

 useEffect(()=>{
  api.get(`client/${item.id}`, {
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  .then((res)=>{
    setValue('name', res.data.user.name)
    setValue('cpf', res.data.user.cpf)
  })
}, []) 

const onSubmit = async (data: IFormInputs) => await api.put(`client`, data, {
  headers: {
    Authorization: `Bearer ${auth.access_token}`
  }
})
.then(()=>{
  window.location.reload()
})
.catch((error)=>{
  console.log(error)
})

  return(
    <div className={styles.container}>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalll">
      Editar
      </button>

      <div className="modal fade" id="exampleModalll" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="">
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

                    <button className='btn btn-primary' type='submit' >Salvar</button>

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