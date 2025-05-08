import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './components/routes';

// Import your components
import Login from './components/login/Login';
import Signup from './components/login/signup';
import Dashboard from './components/Dashboard';
import Staticlayout from './components/Staticlayout';
import PaymentList from './components/payments/PaymentList';
// Import other components as needed

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;