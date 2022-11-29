import { useEffect, useState } from "react"
import { FormLogin } from "./app/components/FormLogin";
import { AppRoutes } from "./app/routes";
import { api } from "./app/services/api";

export const App = () => {

  return(
    <>
      <AppRoutes />
    </>
  )
}