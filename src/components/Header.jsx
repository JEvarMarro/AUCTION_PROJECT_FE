import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isAuthenticated, userIdFromToken } from '../auth/auth'
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

  const handleShareCollection = () => {
    const userId = userIdFromToken(authToken)
    const collectionUrl = `${window.location.origin}/collection/${userId}`
    navigator.clipboard.writeText(collectionUrl)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header>
      <div className='back-button-container'>
        {((!fromLogin && location.pathname !== '/') || location.pathname.match(/^\/collection\/[a-zA-Z0-9-]+$/)) && (
          <button onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </button>
        )}
      </div>
      <div className='header-main_title' onClick={() => navigate('/')}>
        <h1>Pokemon TCG</h1>
      </div>
      <div className='header-right_buttons_container'>
        <div>
          {isAuthenticated(authToken) && (
            <button onClick={handleShareCollection}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Share Collection
            </button>
          )}
        </div>
        <div className='logout-button-container'>
          {isAuthenticated(authToken) && (
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
