import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './app/context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
