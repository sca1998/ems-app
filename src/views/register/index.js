import React, { useState, useContext, useEffect } from 'react'
import './styles.css'

import { useHistory } from 'react-router-dom'
import { UserContext } from '../../providers/user'

const Register = () => {

  useEffect(() => {
    document.title = 'Register'
  }, [])

  const [form, setForm] = useState({
    name: '',
    alias: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [error, setError] = useState('')
  const { registerUser } = useContext(UserContext)
  const history = useHistory()

  const handleInputChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const { email, password, name, alias, confirm } = form
    
    if (!Object.values(form).every(f => !!f)) {
      setError('Please fill in all the information!')
      return
    }

    if (password !== confirm) {
      setError('Password and confirmation mismatch')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address')
      return
    }

    registerUser(name, alias, email, password)
      .then(() => history.push('/'))
      .catch(error => {
        setError(error.message)
      })
  }

  return (
    <div className='container register'>
      <div className='card register-form-container'>
        <h1>Create an account.</h1>
        <form className='login-form'>
          {error ? <span className='error-text'>{error}</span> : null}
          <label>
            <span className='form-label'>Name: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='text'
              name='name'
            />
          </label>
          <label>
            <span className='form-label'>Alias: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='text'
              name='alias'
            />
          </label>
          <label>
            <span className='form-label'>Email: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='email'
              name='email'
            />
          </label>
          <label>
            <span className='form-label'>Password: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='password'
              name='password'
            />
          </label>
          <label>
            <span className='form-label'>Re-type: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='password'
              name='confirm'
            />
          </label>
          <div className='form-actions'>
            <button onClick={handleFormSubmit} className='btn'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register