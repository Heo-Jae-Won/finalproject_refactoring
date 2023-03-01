import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PboardList from './PboardList'
import PboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/pboard/list" element={<PboardList/>} />
        <Route path="/pboard/read/:pcode" element={<PboardRead/>} />
        <Route path="/pboard/insert/:unickname" element={<PboardInsert/>} />
      </Routes>
    </div>
  )
}













export default PboardPage