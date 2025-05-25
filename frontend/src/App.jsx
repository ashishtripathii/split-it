import React from 'react'
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
  
  
    <>
    <ToastContainer/>
      <Layout>
      
        <Routes>
         
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Layout>
  
    </>
      
    
  )
}

export default App
