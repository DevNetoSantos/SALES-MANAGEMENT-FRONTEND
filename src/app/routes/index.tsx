import { Routes, Route } from "react-router-dom"
import { ProtecLayout } from "../components/ProtecLayout"
import { Client } from "../pages/Client"
import { Company } from "../pages/Company"
import { Employee } from "../pages/Employee"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Product } from "../pages/Product"
import { Sale } from "../pages/Sale"

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path='/home' element={<ProtecLayout>
        <Home />
      </ProtecLayout>} />
      <Route path="/home"  element={<Home />}/>

      <Route path="/client"  element={<Client />}/>
      <Route path="/employee"  element={<Employee />}/>
      <Route path="/company"  element={<Company />}/>
      <Route path="/product"  element={<Product />}/>
      <Route path="/sale"  element={<Sale />}/>

      <Route path="/login"  element={<Login />}/>

      <Route path="*" element={<p>Página não encontrada</p>} />
    </Routes>
  )
}