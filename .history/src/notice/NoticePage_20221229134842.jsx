import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoticeList from './NoticeList'
import NoticeRead from './NoticeRead'


const NoticePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/notice/list" component={NoticeList} />
        <Route path="/notice/read/:ncode" component={NoticeRead} />
      </Routes>
    </div>
  )
}

export default NoticePage