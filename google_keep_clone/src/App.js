import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './pages/SignIn.js';
import SignUp from './pages/Signup.js'
import Home from './pages/Home.js';
import React from 'react'
import Main from "./pages/Main.js";
import Forget from "./pages/Forget.js";
import NotFound404 from "./pages/NotFound404.js";
import Profile from "./component/ProfileModal.jsx";
import Dashboard from "./pages/Dashboard.js";
import AdminLogin from "./pages/AdminLogin.js";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Main />} />
          <Route path='/Signin' element={<SignIn />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Forget' element={<Forget />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
