import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./@types";
import { getUserLocalStore, LoginRequest, setUserLocalStore } from "./utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStore()
    
    if(user) {
      setUser(user);
    }
  }, [])

  const authenticate = async (email: string, password: string) => {
    const response = await LoginRequest(email, password)

    const payload = {access_token:response.access_token, email}

    setUser(payload);
    setUserLocalStore(payload);
  }

  const logout = () => {
    setUser(null);
    setUserLocalStore(null);
  }

  return (
    <AuthContext.Provider value={{...user, authenticate, logout  }}>
      {children}
    </AuthContext.Provider>
  )
}