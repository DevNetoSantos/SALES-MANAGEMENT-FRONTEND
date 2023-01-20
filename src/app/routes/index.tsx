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
import { AlterClient } from "../pages/AlterClient"
import { AlterEmployee } from "../pages/AlterEmployee"
import { AddEmployee } from "../pages/AddEmployee"
import { AddCompany } from "../pages/AddCompany"
import { AlterCompany } from "../pages/AlterCompany"
import { AddProduct } from "../pages/AddProduct"
import { AlterProduct } from "../pages/AlterProduct"

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/login"  element={<Login />}/>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/client"  element={<Client />}/>
          <Route path="/newclient" element={<AddClient />}/>
          <Route path="/editclient/:id" element={<AlterClient />}/>
          <Route path="/employee"  element={<Employee />}/>
          <Route path="/newemployee" element={< AddEmployee/>}/>
          <Route path="/editemployee/:id" element={<AlterEmployee/>}/>
          <Route path="/company"  element={<Company />}/>
          <Route path="/newcompany"  element={<AddCompany />}/>
          <Route path="/editcompany/:id" element={<AlterCompany/>}/>
          <Route path="/product"  element={<Product />}/>
          <Route path="/newproduct" element={<AddProduct />}/>
          <Route path="/editproduct/:id" element={<AlterProduct/>}/>
          <Route path="/sale"  element={<Sale />}/>
        </Route>
      </Route>

      <Route path="*" element={<p>Página não encontrada</p>} />
    </Routes>
  )
}