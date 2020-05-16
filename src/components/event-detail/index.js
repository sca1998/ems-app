import React, { useState, useEffect } from 'react'
import './styles.css'

const toDateTimeLocal = (dateTimeString) => {
  const localized = new Date(dateTimeString).toLocaleString('en-GB')
  const [date, time] = localized.split(', ')
  const [d, m, y] = date.split('/')
  return `${[y, m, d].join('-')}T${time}`
}

const EventTable = ({ event, user, onEdit }) => {
  const { title, type, startsAt, endsAt, location, description, creator } = event
  const [edited, setEdited] = useState({
    ...event,
    startsAt: toDateTimeLocal(startsAt),
    endsAt: toDateTimeLocal(endsAt)
  })
  const [editing, setEditing] = useState({})

  useEffect(() => {
    setEditing({})
  }, [event])

  const editIcon = (
    <svg style={{ width: '1.15rem', height: '1.15rem' }} viewBox='0 0 24 24'>
      <path fill='currentColor' d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' />
    </svg>
  )

  const editBtn = <button className='edit-btn'>{editIcon}</button>
  const isCreator = user && user._id === creator._id

  const handleEdit = (key, val) => {
    setEdited({ ...edited, [key]: val })
    onEdit({ ...edited, [key]: val })
  }

  return (
    <table className='event-detail-table'>
      <tbody>
        <tr className={isCreator && !editing.title ? 'editable' : ''}>
          <th>Title</th>
          <td onClick={() => setEditing({ ...editing, title: true })}>
            {
              isCreator && editing.title
                ? <input
                    value={edited.title}
                    onChange={e => handleEdit('title', e.target.value)}
                    name='title'
                    type='text'
                  />
                : title
            }
          </td>
          <td onClick={() => setEditing({ ...editing, title: true })}>
            {isCreator && !editing.title && editBtn}
          </td>
        </tr>
        <tr className={isCreator && !editing.type ? 'editable' : ''}>
          <th>Type</th>
          <td onClick={() => setEditing({ ...editing, type: true })}>
            {
              isCreator && editing.type
                ? <input
                    value={edited.type}
                    onChange={e => handleEdit('type', e.target.value)}
                    name='type'
                    type='text'
                  />
                : type
            }
          </td>
          <td onClick={() => setEditing({ ...editing, type: true })}>
            {isCreator && !editing.type && editBtn}
          </td>
        </tr>
        <tr className={isCreator && !editing.startsAt ? 'editable' : ''}>
          <th>Start Time</th>
          <td onClick={() => setEditing({ ...editing, startsAt: true })}>
            {
              isCreator && editing.startsAt
                ? <input
                    value={edited.startsAt}
                    onChange={e => handleEdit('startsAt', e.target.value)}
                    name='time'
                    type='datetime-local'
                  />
                : new Date(startsAt).toLocaleString('en-GB').replace(',', '').slice(0, 16)
            }
          </td>
          <td onClick={() => setEditing({ ...editing, startsAt: true })}>
            {isCreator && !editing.startsAt && editBtn}
          </td>
        </tr>
        <tr className={isCreator && !editing.endsAt ? 'editable' : ''}>
          <th>End Time</th>
          <td onClick={() => setEditing({ ...editing, endsAt: true })}>
            {
              isCreator && editing.endsAt
                ? <input
                    value={edited.endsAt}
                    onChange={e => handleEdit('endsAt', e.target.value)}
                    name='time'
                    type='datetime-local'
                  />
                : new Date(endsAt).toLocaleString('en-GB').replace(',', '').slice(0, 16)
            }
          </td>
          <td onClick={() => setEditing({ ...editing, endsAt: true })}>
            {isCreator && !editing.endsAt && editBtn}
          </td>
        </tr>
        <tr className={isCreator && !editing.location ? 'editable' : ''}>
          <th>Location</th>
          <td onClick={() => setEditing({ ...editing, location: true })}>
            {
              isCreator && editing.location
                ? <input
                    value={edited.location}
                    onChange={e => handleEdit('location', e.target.value)}
                    name='location'
                    type='text'
                  />
                : location
            }
          </td>
          <td onClick={() => setEditing({ ...editing, location: true })}>
            {isCreator && !editing.location && editBtn}
          </td>
        </tr>
        <tr className={isCreator && !editing.description ? 'editable' : ''}>
          <th>Description</th>
          <td onClick={() => setEditing({ ...editing, description: true })}>
            {
              isCreator && editing.description
                ? <input
                    value={edited.description}
                    onChange={e => handleEdit('description', e.target.value)}
                    name='description'
                    type='text'
                  />
                : description
            }
          </td>
          <td onClick={() => setEditing({ ...editing, description: true })}>
            {isCreator && !editing.description && editBtn}
          </td>
        </tr>
        <tr>
          <th>Creator</th>
          <td>{creator && creator.alias}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default EventTable