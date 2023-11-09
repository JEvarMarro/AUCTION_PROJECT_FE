import React, { useState, useEffect, createContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import { logoutService } from '../services/login'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [authToken, setAuthToken] = useState(window.localStorage.getItem('authToken'))

  useEffect(() => {
    if (authToken) {
      window.localStorage.setItem('authToken', authToken)
    } else {
      window.localStorage.removeItem('authToken')
    }
  }, [authToken])

  const login = (token) => {
    setAuthToken(token)
  }

  const logout = () => {
    setAuthToken(null)
    logoutService()
  }

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decodedToken.exp < currentTime
    } catch (_error) {
      return true
    }
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  )
}
