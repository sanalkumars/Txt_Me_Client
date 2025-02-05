import React from 'react'
import Navbar from './components/Navbar'
import { Routes , Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'


const App = () => {
  return (
    <div>
      <Navbar />
      {/* next i am defining the routes */}
      <Routes>
          <Route  path='/' element={<HomePage />}/>
          <Route  path='/profile' element={<ProfilePage />}/>
          <Route  path='/settings' element={<SettingsPage />}/>
          <Route  path='/signUp' element={<SignupPage />}/>
          <Route  path='/login' element={<LoginPage />}/>
      </Routes>
    </div>
  )
}

export default App