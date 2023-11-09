import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpService } from '../services/signUp'
import { isAuthenticated } from '../auth/auth'

export function SignUpForm () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const validateForm = () => {
    if (!name.trim()) return 'Name is required'
    if (!email.trim()) return 'Email is required'
    if (!password.trim()) return 'Password is required'
    if (password !== repeatPassword) return 'Passwords do not match'
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    const error = validateForm()
    if (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    try {
      await signUpService({ name, email, password })
      setEmail('')
      setPassword('')
      navigate('/login')
    } catch (e) {
      setErrorMessage(e.response.data.status.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [navigate])

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <input
          type='text'
          value={name}
          name='Name'
          placeholder='Name'
          onChange={({ target }) => setName(target.value)}
        />
      </div>
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
      <div>
        <input
          type='password'
          value={repeatPassword}
          name='RepeatPassword'
          placeholder='RepeatPassword'
          onChange={({ target }) => setRepeatPassword(target.value)}
        />
      </div>
      {
        errorMessage &&
          <p>{errorMessage}</p>
      }
      <button type='submit'>
        Sign Up
      </button>
    </form>
  )
}
