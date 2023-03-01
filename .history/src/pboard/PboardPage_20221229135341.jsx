import React from 'react'
import { Route,Routes } from 'react-router-dom'
import pboardInsert from './PboardInsert'
import pboardList from './PboardList'
import pboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/pboard/list" element={<pboardList/>} />
        <Route path="/pboard/read/:pcode" element={<pboardRead/>} />
        <Route path="/pboard/insert/:unickname" element={<pboardInsert/>} />
      </Routes>
    </div>
  )
}













export default PboardPage