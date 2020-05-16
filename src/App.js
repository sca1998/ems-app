import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import NavBar from './components/nav-bar'
import EventList from './views/event-list'
import Login from './views/login'
import Register from './views/register'
import CreateEvent from './views/event-new'
import EventDetail from './views/event-detail'

import { UserContext } from './providers/user'

function App() {
  const { isLoggedIn, fetchUser } = useContext(UserContext)

  useEffect(() => {
    if (isLoggedIn) fetchUser()
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <EventList />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/events/new'>
          <CreateEvent />
        </Route>
        <Route path='/events/:id'>
          <EventDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
