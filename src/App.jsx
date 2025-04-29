import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/home/CV/dashboard';
import HomePage from './pages/home/homepage';
import AdminHomePage from './pages/admin/adminHomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Companies from './pages/admin/Companies';
import CompanyCreate from './pages/admin/CompanyCreate';
import { Toaster } from 'react-hot-toast';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Toaster
            position="top-center"
            reverseOrder={false}
      />
        <Routes path='/*'>
          <Route path='/*' element={<HomePage/>}/>
          <Route path='/admin/*' element={<AdminHomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/company' element={<Companies/>}/>
          <Route path='create' element={<CompanyCreate/>}/>
          <Route path='/signup' element={<SignupPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
