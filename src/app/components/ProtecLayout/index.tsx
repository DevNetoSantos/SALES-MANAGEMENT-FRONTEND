import { useAuth } from "../../context/AuthProvider/useAuth"

export const ProtecLayout = ({ children }: {children: JSX.Element}) => {
  const auth = useAuth()

  if(!auth.email) {
    return(
      <h1>Voce não esta logado</h1>
    )
  }

  return children;
}