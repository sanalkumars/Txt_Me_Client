import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes , Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";


const App = () => {

  const { authUser , checkAuth ,isCheckingAuth } = useAuthStore();

  console.log("auth user is",authUser);

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log("authuser2",authUser);

  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
         <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {/* next i am defining the routes */}
      <Routes>
          <Route  path='/' element={ authUser ? <HomePage /> : <Navigate to="/login"/> }/>
          <Route  path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to="/login"/> }/>
          <Route  path='/settings' element={  <SettingsPage />}/>
          <Route  path='/signUp' element={ !authUser ? <SignupPage /> : <Navigate to="/"/> }/>
          <Route  path='/login' element={ !authUser ? <LoginPage /> : <Navigate to="/"/> }/>
      </Routes>
    </div>
  )
}

export default App