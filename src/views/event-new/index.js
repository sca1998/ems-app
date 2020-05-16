import React, { useState } from 'react'
import './styles.css'

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

const getLocalNow = () => {
  const localized = new Date().toLocaleString('en-GB')
  const [date, time] = localized.split(', ')
  const [d, m, y] = date.split('/')
  return `${[y, m, d].join('-')}T${time}`.slice(0, 16)
}

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    startsAt: getLocalNow(),
    endsAt: getLocalNow(),
    location: '',
    description: ''
  })
  const [error, setError] = useState('')

  const history = useHistory()

  const publishEvent = data => {
    Axios.post(`events`, data)
      .then(() => history.push('/'))
      .catch(console.log)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  
  const handleFormSubmit = e => {
    e.preventDefault()

    if (!Object.values(form).every(f => !!f)) {
      setError('Please fill in all the information!')
      return
    }

    publishEvent(form)
  }

  return (
    <div className='container create-event'>
      <div className='card create-form-container'>
        <h1>Create an Event</h1>
        <form className='login-form'>
          {error ? <span className='error-text'>{error}</span> : null}
          <label>
            <span className='form-label'>Title: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='text'
              name='title'
            />
          </label>
          <label>
            <span className='form-label'>Type: </span>
            <div className='radios'>
              <input
                id='public'
                value='public'
                onChange={handleInputChange}
                className='text-field'
                type='radio'
                name='type'
              />
              <label htmlFor="public">Public</label>
              <input
                id='private'
                value='private'
                onChange={handleInputChange}
                className='text-field'
                type='radio'
                name='type'
              />
              <label htmlFor="private">Private</label>
            </div>
          </label>
          <label>
            <span className='form-label'>Start Time: </span>
            <input
              value={form.startsAt}
              onChange={handleInputChange}
              className='text-field'
              type='datetime-local'
              name='startsAt'
            />
          </label>
          <label>
            <span className='form-label'>End Time: </span>
            <input
              value={form.endsAt}
              onChange={handleInputChange}
              className='text-field'
              type='datetime-local'
              name='endsAt'
            />
          </label>
          <label>
            <span className='form-label'>Location: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='text'
              name='location'
            />
          </label>
          <label>
            <span className='form-label'>Description: </span>
            <input
              onChange={handleInputChange}
              className='text-field'
              type='text'
              name='description'
            />
          </label>
          <div className='form-actions'>
            <button onClick={handleFormSubmit} className='btn'>Publish</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent