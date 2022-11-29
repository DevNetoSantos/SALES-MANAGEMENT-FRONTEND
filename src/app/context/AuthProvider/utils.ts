import { api } from "../../services/api"
import { IUser } from "./@types"

export const setUserLocalStore = (user: IUser | null) => {
  localStorage.setItem('access_token', JSON.stringify(user))
}

export const getUserLocalStore = () => {
  const json = localStorage.getItem('access_token')

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export const LoginRequest = async (email: string, password: string) => {
  try {
    const request = await api.post('auth/login', {email, password})

    return request.data;
  } catch (error) {
    console.log(error)
  }
}