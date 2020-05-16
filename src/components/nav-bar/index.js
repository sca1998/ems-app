import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'

import { UserContext } from '../../providers/user'

const NavBar = () => {
  const { user, isLoggedIn, logoutUser } = useContext(UserContext)
  const history = useHistory()

  const toggleSignIn = () => {
    if (isLoggedIn) {
      logoutUser()
      history.push('/')
    } else {
      history.push('/login')
    }
  }

  return (
    <div className='nav-bar'>
      <Link to='/'>
        <h2>3322 Event Management System</h2>
      </Link>
      <div className='nav-bar-actions'>
        {isLoggedIn ? null : <Link to='/register'>Register</Link>}
        <button className='btn' onClick={toggleSignIn}>
          Sign {isLoggedIn ? `out ${user.alias}` : 'in'}
        </button>
      </div>
    </div>
  )
}

export default NavBar