import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeItem = ({ noticeList }) => {
  const navigate=useNavigate();
  const { noticeCode, noticeTitle,  noticeWriter, noticeRegDate } = noticeList;

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => navigate(`/notice/read/${noticeCode}`)}>
      <td>{noticeWriter}</td>
      <td>{noticeTitle}</td>
      <td>{noticeRegDate}</td>
    </tr>
  )
}

export default NoticeItem;