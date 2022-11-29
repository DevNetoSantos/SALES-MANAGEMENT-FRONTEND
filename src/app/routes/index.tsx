import { Routes, Route } from "react-router-dom"
import { FormLogin } from "../components/FormLogin"
import { ProtecLayout } from "../components/ProtecLayout"
import { Home } from "../pages/Home"

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path='/home' element={<ProtecLayout><Home /></ProtecLayout>} />
     
      <Route path="/"  element={<FormLogin />}/>

      <Route path="*" element={<p>Página não encontrada</p>} />
    </Routes>
  )
}