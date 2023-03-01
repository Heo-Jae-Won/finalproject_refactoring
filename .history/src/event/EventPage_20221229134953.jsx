import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventList from './EventList'
import EventRead from './EventRead'


const EventPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/event/list" element={<EventList/>} />
        <Route path="/event/read/:ecode" element={<EventRead/>} />
      </Routes>
    </div>
  )
}

export default EventPage