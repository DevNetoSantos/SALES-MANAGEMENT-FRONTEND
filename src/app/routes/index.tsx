import { Routes, Route } from "react-router-dom"
import { Layout } from "../components/Layout"
import { PrivateRoute } from "../components/PrivateRoutes"
import { Client } from "../pages/Client"
import { Company } from "../pages/Company"
import { Employee } from "../pages/Employee"
import { Login } from "../pages/Login"
import { AddClient } from "../pages/AddClient"
import { Product } from "../pages/Product"
import { Sale } from "../pages/Sale"

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/login"  element={<Login />}/>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/client"  element={<Client />}/>
          <Route path="/newclient"  element={<AddClient />}/>
          <Route path="/employee"  element={<Employee />}/>
          <Route path="/company"  element={<Company />}/>
          <Route path="/product"  element={<Product />}/>
          <Route path="/sale"  element={<Sale />}/>
        </Route>
      </Route>

      <Route path="*" element={<p>Página não encontrada</p>} />
    </Routes>
  )
}