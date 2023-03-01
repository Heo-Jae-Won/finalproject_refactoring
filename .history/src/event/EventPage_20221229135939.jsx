import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventList from './EventList'
import EventRead from './EventRead'


const EventPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<EventList/>} />
        <Route path="/read/:ecode" element={<EventRead/>} />
      </Routes>
    </div>
  )
}

export default EventPage