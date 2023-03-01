import React from 'react'
import { Route } from 'react-router-dom'
import pboardInsert from './PboardInsert'
import pboardList from './PboardList'
import pboardRead from './PboardRead'

const PboardPage = () => {
  return (
    <div>
      <Route path="/pboard/list" element={pboardList} />
      <Route path="/pboard/read/:pcode" element={pboardRead} />
      <Route path="/pboard/insert/:unickname" element={pboardInsert} />
    </div>
  )
}













export default PboardPage