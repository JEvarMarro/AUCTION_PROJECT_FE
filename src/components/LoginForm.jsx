import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../services/login'
import { isAuthenticated } from '../auth/auth'
import { useAuth } from '../hooks/useAuth'

export function LoginForm () {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const token = await loginService({ email, password })
      login(token)
      setEmail('')
      setPassword('')
      navigate('/series', { state: { fromLogin: true } })
    } catch (e) {
      setErrorMessage('Credenciales inválidas')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleClick = () => {
    navigate('/signup')
  }

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [navigate])

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='email'
          value={email}
          name='Email'
          placeholder='Email'
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      {
        errorMessage &&
          <p>{errorMessage}</p>
      }
      <button type='submit' className='loginButton'>
        Login
      </button>
      <button type='button' onClick={handleClick} className='SignUpButton'>
        Sign Up
      </button>
    </form>
  )
}
