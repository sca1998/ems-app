import React, { useState, createContext } from 'react'

import Axios from 'axios'

export const UserContext = createContext({
  user: null,
  token: '',
  isLoggedIn: false,
  fetchUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {}
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const _isTokenExpired = token => {
    if (!token) return true

    const decodedToken = token.split('.')[1] // Bearer <token>
    const decodedValue = JSON.parse(atob(decodedToken))

    return decodedValue.exp < Date.now() / 1000
  }

  const isLoggedIn = !!(user && token && !_isTokenExpired(token))

  const _login = (user, token) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    if (token) {
      setToken(token)
      localStorage.setItem('token', token)
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  }

  const logoutUser = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete Axios.defaults.headers.common['Authorization']
  }

  const fetchUser = () =>
    new Promise((resolve, reject) => {
      Axios
        .get('user')
        .then(({ data: { user } }) => {
          _login(user)
          resolve()
        })
        .catch(err => {
          logoutUser()
          reject(err)
        })
    })

  const loginUser = (email, password) =>
    new Promise((resolve, reject) => {
      Axios
        .post('users/signin', { email, password })
        .then(({ data: { user, token } }) => {
          _login(user, token)
          resolve()
        })
        .catch(error => {
          logoutUser()
          error.response && error.response.data
            ? reject(new Error(error.response.data.error))
            : reject(new Error(error))
        })
    })
  
  const registerUser = (name, alias, email, password) =>
    new Promise((resolve, reject) => {
      Axios
        .post('users/register', { name, alias, email, password })
        .then(({ data: { user, token } }) => {
          _login(user, token)
          resolve()
        })
        .catch(error => {
          logoutUser()
          error.response && error.response.data
            ? reject(new Error(error.response.data.error))
            : reject(new Error(error))
        })
    })

  return (
    <UserContext.Provider value={{ user, token, isLoggedIn, fetchUser, loginUser, registerUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider