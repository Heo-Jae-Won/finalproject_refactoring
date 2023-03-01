import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventItem = ({ eventlist }) => {
  const navigate=useNavigate();
  const { ecode, etitle, econtent, ewriter, regDate} = eventlist;



  return (
                <tr style={{cursor:'pointer'}} onClick={()=>navigate(`/event/read/${ecode}`)}>
                <td>{ewriter}</td>
                    <td>{etitle}</td>
                    <td>{regDate}</td>
                </tr>
  )
}

export default EventItem;