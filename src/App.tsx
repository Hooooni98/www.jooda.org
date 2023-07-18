import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

import { HomePage } from './main-pages'
import { AdminLoginPage } from './admin-pages/admin-login'
import { AdminPage } from './admin-pages/admin-nav'
import ErrorPage from './error-pages'
import { Location } from './policy/location'
import { Privacy } from './policy/privacy'
import { Terms } from './policy/terms'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Toast } from './component/toast'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
const App: React.FC = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Toast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Error" element={<ErrorPage />} />
        <Route path="/policy/location" element={<Location />} />
        <Route path="/policy/privacy" element={<Privacy />} />
        <Route path="/policy/terms" element={<Terms />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
