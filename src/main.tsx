import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './app/context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Layout } from './app/components/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Layout>
          <App />
        </Layout>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
)
