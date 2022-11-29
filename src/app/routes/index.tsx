import { Routes, Route } from "react-router-dom"
import { ProtecLayout } from "../components/ProtecLayout"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"

export const AppRoutes = () => {
  return(
    <Routes>
    {/*   <Route path='/home' element={<ProtecLayout>
        <Home />
      </ProtecLayout>} /> */}
      <Route path="/home"  element={<Home />}/>
      <Route path="/login"  element={<Login />}/>

      <Route path="*" element={<p>Página não encontrada</p>} />
    </Routes>
  )
}