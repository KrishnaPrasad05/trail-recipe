import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, GlobalStateProvider } from './GlobalStateContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
    <App />
    </GlobalStateProvider>
      
    
     
   
  </React.StrictMode>
);

reportWebVitals();
