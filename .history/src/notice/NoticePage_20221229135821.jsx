import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoticeList from './NoticeList'
import NoticeRead from './NoticeRead'


const NoticePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<NoticeList/>} />
        <Route path="/read/:ncode" element={<NoticeRead/>} />
      </Routes>
    </div>
  )
}

export default NoticePage