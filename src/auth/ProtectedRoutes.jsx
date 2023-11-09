import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticated } from './auth'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoutes () {
  const { authToken } = useAuth()
  const location = useLocation()
  const auth = isAuthenticated(authToken)
  if (!auth) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }
  return <Outlet />
}
