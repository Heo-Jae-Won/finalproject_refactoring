import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PboardInsert from './PboardInsert'
import PboardList from './PboardList'
import PboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<PboardList/>} />
        <Route path="/read/:pcode" element={<PboardRead/>} />
        <Route path="/insert/:unickname" element={<PboardInsert/>} />
      </Routes>
    </div>
  )
}













export default PboardPage