import React from 'react';
import { withRouter } from 'react-router-dom';

const NoticeItem = ({ history, noticelist }) => {
  const { ncode, ntitle,  nwriter, regDate } = noticelist;

  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => history.push(`/notice/read/${ncode}`)}>
      <td>{nwriter}</td>
      <td>{ntitle}</td>
      <td>{regDate}</td>
    </tr>
  )
}

export default withRouter(NoticeItem);