import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeItem = ({ noticeList }) => {
  const navigate=useNavigate();
  const { ncode, ntitle,  nwriter, regDate } = noticeList;

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => navigate(`/notice/read/${ncode}`)}>
      <td>{nwriter}</td>
      <td>{ntitle}</td>
      <td>{regDate}</td>
    </tr>
  )
}

export default NoticeItem;