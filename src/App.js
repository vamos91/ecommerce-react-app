import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile'
import Navigationbar from './components/NavigationBar';
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';

const App = () => {
  return(
      <BrowserRouter>
        <Navigationbar />
        <Routes>
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;