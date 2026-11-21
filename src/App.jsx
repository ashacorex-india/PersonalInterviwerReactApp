import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Registration from './pages/Registration'
import Login from './pages/Login'
import PastInterviews from './pages/PastInterviews'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Paths */}
        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Login />} />

        {/* Main Layout */}
        <Route path='/' element={<MainLayout />} >
          <Route path='home' element={<Home />} />
          <Route path='past-interviews' element={<PastInterviews />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App