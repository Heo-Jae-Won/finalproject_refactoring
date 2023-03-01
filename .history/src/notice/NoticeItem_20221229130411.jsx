import React from 'react';
import { useNavigate, withRouter } from 'react-router-dom';

const NoticeItem = ({ noticelist }) => {
  const navigate=useNavigate();
  const { ncode, ntitle,  nwriter, regDate } = noticelist;

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => navigate(`/notice/read/${ncode}`)}>
      <td>{nwriter}</td>
      <td>{ntitle}</td>
      <td>{regDate}</td>
    </tr>
  )
}

export default withRouter(NoticeItem);