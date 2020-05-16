import React from 'react'
import './styles.css'

import { useHistory } from 'react-router-dom'

const EventListComp = ({ events, filter }) => {
  const history = useHistory()

  const filteredEvents = events
    .filter(event => {
      const now = Date.now()
      const eventTime = new Date(event.endsAt).getTime()
      return filter === 'Current'
        ? eventTime >= now
        : eventTime >= now - 1000 * 60 * 60 * 24 * 14 && eventTime < now
    })
    .sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt))
    .map(({ _id, title, startsAt, location, type, creator, attenders }) => (
      <tr key={_id} onClick={() => history.push(`/events/${_id}`)}>
        <td>{title}</td>
        <td>
          {
            new Date(startsAt)
              .toLocaleString('en-GB')
              .replace(',', '')
              .slice(0, 16)
          }
        </td>
        <td>{location}</td>
        <td>{type}</td>
        <td>{creator && creator.alias}</td>
        <td>{attenders}</td>
      </tr>
    ))

  return (
    <div className='events-table-container'>
      <table className='events-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Attenders</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents}
        </tbody>
      </table>
    </div>
  )
}

export default EventListComp