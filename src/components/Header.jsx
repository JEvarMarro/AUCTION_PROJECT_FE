import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../auth/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/useAuth'

import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, authToken } = useAuth()
  const fromLogin = location.state?.fromLogin || false

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header>
      <div className='back-button-container'>
        {isAuthenticated(authToken) && !fromLogin && location.pathname !== '/' && (
          <button onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </button>
        )}
      </div>
      <div className='header-main_title' onClick={() => navigate('/')}>
        <h1>Pokemon TCG</h1>
      </div>
      <div className='logout-button-container'>
        {isAuthenticated(authToken) && (
          <button onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
