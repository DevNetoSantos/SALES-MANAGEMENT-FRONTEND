import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"

  export const PrivateRoute = () => {
  const auth = useAuth()

  if(!auth.email) {
    return(
      <h1>Voce não esta logado</h1>
    )
  }

  return <Outlet />;
}