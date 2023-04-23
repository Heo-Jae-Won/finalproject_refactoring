import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyBuyList from './MyBuyList'
import MyBuyListChart from './MyBuyListChart'
import MyChatList from './MyChatList'
import MyInfo from './MyInfo'
import MyInsertReview from './MyInsertReview'
import MyMenu from './MyMenu'
import MyPay from './MyPay'
import MyReceiveReview from './MyReceiveReview'
import MySellList from './MySellList'
import MySellListChart from './MySellListChart'
import MyUpdatePass from './MyUpdatePass'

const MyPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/info/:userId" element={<MyInfo/>} />
        <Route path="/chat" element={<MyChatList/>} />
        <Route path="/pay/:productCode" element={<MyPay/>} />
        <Route path="/menu" element={<MyMenu/>} />
        <Route path="/review" element={<MyReceiveReview/>}/>
        <Route path="/review/insert/:payCode" element={<MyInsertReview/>} />
        <Route path="/pass/update" element={<MyUpdatePass/>} />
        <Route path="/sell" element={<MySellList/>} />
        <Route path="/buy" element={<MyBuyList/>} />
        <Route path="/buyChart" element={<MyBuyListChart/>} />
        <Route path="/sellChart" element={<MySellListChart/>} />
      </Routes>
    </div>
  )
}

export default MyPage