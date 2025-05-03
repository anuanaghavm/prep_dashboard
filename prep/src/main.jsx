import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <StrictMode>  
    <App />
  </StrictMode>,
  </BrowserRouter>
)
