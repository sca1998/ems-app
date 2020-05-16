import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

import App from './App'
import UserProvider from './providers/user'

const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

Axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL
Axios.defaults.timeout = 10000

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
