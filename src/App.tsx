import { useEffect, useState } from "react"
import { FormLogin } from "./app/components/FormLogin";
import { api } from "./app/services/api";

export const App = () => {
  const [login, setlogin] = useState([]);

  useEffect(()=>{
    api.get('sale').then((data) => {
      //setlogin(data)
    })
    console.log(login)
  }, []);

  return(
    <>
      <FormLogin />
    </>
  )
}