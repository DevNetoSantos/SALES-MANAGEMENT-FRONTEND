import { createContext, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./@types";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUer] = useState<IUser | null>();

  const authenticate = async (email: string, password: string) => {
    
  }

  const logout = () => {

  }

  return (
    <AuthContext.Provider value={...user, authenticate, logout  }>
      {children}
    </AuthContext.Provider>
  )
}