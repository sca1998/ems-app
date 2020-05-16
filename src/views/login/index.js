import React, { useState, useContext, useEffect } from 'react'
import './styles.css'

import { useHistory } from 'react-router-dom'
import { UserContext } from '../../providers/user'

const Login = () => {

  useEffect(() => {
    document.title = 'Sign In'
  }, [])

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const { loginUser } = useContext(UserContext)
  const history = useHistory()

  const handleInputChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const { email, password } = form
    if (!(email && password)) {
      setError('Please fill in all credentials')
      return
    }

    loginUser(email, password)
      .then(() => history.push('/'))
      .catch(({ message }) => {
        setError('Error: ' + message)
        setForm({ email: '', password: '' })
      })
  }

  return (
    <div className='container login'>
      <div className='card login-form-container'>
        <h1>Login to the system.</h1>
        <form className='login-form'>
          {error ? <span className='error-text'>{error}</span> : null}
          <label>
            <span className='form-label'>Email: </span>
            <input
              value={form.email}
              onChange={handleInputChange}
              className='text-field'
              type='email'
              name='email'
            />
          </label>
          <label>
            <span className='form-label'>Password: </span>
            <input
              value={form.password}
              onChange={handleInputChange}
              className='text-field'
              type='password'
              name='password'
            />
          </label>
          <div className='form-actions'>
            <button onClick={handleFormSubmit} className='btn'>Sign in</button>
          </div>
        </form>
      </div>
      <div className='register-cta'>
        Don't have an account yet?
        <button onClick={() => history.push('/register')} className='btn'>Register</button>
      </div>
    </div>
  )
}

export default Login