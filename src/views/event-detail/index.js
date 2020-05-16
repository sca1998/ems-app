import React, { useEffect, useState, useContext } from 'react'
import './styles.css'

import EventTable from '../../components/event-detail'

import { useParams, useHistory } from 'react-router-dom'
import { UserContext } from '../../providers/user'

import Axios from 'axios'

const EventDetail = () => {
  const [event, setEvent] = useState(null)
  const [edited, setEdited] = useState(null)

  const { id } = useParams()
  const history = useHistory()
  const { user, isLoggedIn } = useContext(UserContext)

  const fetchEvent = async () => {
    const { data } = await Axios.get(`events/${id}`)
    data && data.event
      ? setEvent(data.event)
      : setEvent(null)
  }

  const updateEvent = () => {
    Axios.put(`events/${id}`, edited)
      .then(() => {
        setEvent(edited)
        setEdited(null)
      })
      .catch(console.log)
  }

  const deleteEvent = () => {
    Axios.delete(`events/${id}`)
      .then(() => history.push('/'))
      .catch(console.log)
  }

  const toggleJoin = () => {
    Axios.put(`events/${id}/register`)
      .then(() => setEvent({ ...event, joined: !event.joined }))
      .catch(console.log)
  }

  useEffect(() => {
    fetchEvent()
    // eslint-disable-next-line
  }, [id])

  return (
    <div className='container event-detail-view'>
      <h1>{event ? event.title : 'Loading event...'}</h1>
      <div className='event-detail-actions'>
        <button onClick={history.goBack}>
          Back
        </button>
        {
          isLoggedIn && event && (
            <button onClick={toggleJoin}>
              { event.joined ? 'Leave' : 'Join' }
            </button>
          )
        }
        {
          isLoggedIn && event && user._id === event.creator._id && (
            <button onClick={deleteEvent} className='error-text'>Delete</button>
          )
        }
      </div>
      {
        event && (
          <div className='event-table-container'>
            <EventTable event={event} user={user} onEdit={setEdited} />
          </div>
        )
      }
      {
        event && edited && (
          <div className='event-detail-actions update-event-container'>
            <button onClick={updateEvent}>Update</button>
          </div>
        )
      }
    </div>
  )
}

export default EventDetail