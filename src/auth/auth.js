import { jwtDecode } from 'jwt-decode'

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  } catch (_error) {
    return true
  }
}
export function isAuthenticated (token) {
  return !!token && !isTokenExpired(token)
}

export function userIdFromToken (token) {
  if (token) {
    const decodedToken = jwtDecode(token)
    return decodedToken.sub
  }
  return null
}
