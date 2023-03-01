import React from 'react'
import { Route } from 'react-router-dom'
import NoticeList from './NoticeList'
import NoticeRead from './NoticeRead'


const NoticePage = () => {
  return (
    <div>
        <Route path="/notice/list" element={NoticeList}/>
        <Route path="/notice/read/:ncode" element={NoticeRead}/>
    </div>
  )
}

export default NoticePage