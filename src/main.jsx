import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FormProvider } from './components/FormContext.jsx'; // Asegúrate de que esta ruta sea correcta
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
)
