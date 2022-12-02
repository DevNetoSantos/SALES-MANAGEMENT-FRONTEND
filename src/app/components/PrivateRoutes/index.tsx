import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"

 export const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const auth = useAuth()

  if(!auth.email) {
    return(
      <h1>Voce não esta logado</h1>
    )
  }

  return children;
} 

/* export const PrivateRoutes = () => {
  const auth = useAuth()

  return auth.access_token ? <Outlet /> : <Navigate to="/login"/>
} */