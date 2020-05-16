import React, { useState, useEffect, useContext } from 'react'
import './styles.css'

import { useHistory } from 'react-router-dom'
import { UserContext } from '../../providers/user'
import EventListComp from '../../components/event-list'

import Axios from 'axios'

const EventListView = () => {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('Current')

  const history = useHistory()
  const { isLoggedIn } = useContext(UserContext)

  useEffect(() => {
    document.title = 'View Events'
    const fetchEvents = async () => {
      const { data: { events } } = await Axios.get('events')
      setEvents(events)
    }
    fetchEvents()
  }, [isLoggedIn])

  return (
    <div className='container event-list-view'>
      <h1>All {filter} Events</h1>
      {
        isLoggedIn
          ? (
            <div className='event-list-actions'>
              <button onClick={() => setFilter('Current')}>Current Events</button>
              <button onClick={() => setFilter('Past')}>Past Events</button>
              <button onClick={() => history.push('/events/new')}>Add Event</button>
            </div>
          )
          : <div className='event-list-view'></div>
      }
      <EventListComp events={events} filter={filter} />
    </div>
  )
}

export default EventListView