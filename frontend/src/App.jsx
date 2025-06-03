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
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CreateGroup from "./pages/CreateGroup";
import JoinGroupPage from "./pages/JoinGroupPage";
import PrivateRoute from './utils/PrivateRoute';
import ContactPage from './pages/Contact';
import About from './pages/About';
import Feedback from './pages/Feedback';
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
          <Route path='/about' element={<About />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route path='/contact' element={<ContactPage />} />
         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
            <Route path='/create-group' element={
            <PrivateRoute>
              <CreateGroup />
            </PrivateRoute>
          } />
             <Route path='/group/join/:groupId' element={
            <PrivateRoute>
            <JoinGroupPage />
            </PrivateRoute>
          } />
          <Route path='/join-group' element={
            <PrivateRoute>
              <JoinGroupPage />
            </PrivateRoute>
          } />
        </Routes>
      </Layout>
  
    </>
      
    
  )
}

export default App
