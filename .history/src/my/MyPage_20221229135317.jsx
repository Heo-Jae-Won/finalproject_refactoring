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
        <Route path="/my/info/:uid" element={<MyInfo/>} />
        <Route path="/my/chat" element={<MyChatList/>} />
        <Route path="/my/pay/:pcode" element={<MyPay/>} />
        <Route path="/my/menu" element={<MyMenu/>} />
        <Route path="/my/review" element={<MyReceiveReview/>}/>
        <Route path="/my/review/insert/:paycode" element={<MyInsertReview/>} />
        <Route path="/my/pass/update" element={<MyUpdatePass/>} />
        <Route path="/my/sell" element={<MySellList/>} />
        <Route path="/my/buy" element={<MyBuyList/>} />
        <Route path="/my/buychart" element={<MyBuyListChart/>} />
        <Route path="/my/sellchart" element={<MySellListChart/>} />
      </Routes>
    </div>
  )
}

export default MyPage