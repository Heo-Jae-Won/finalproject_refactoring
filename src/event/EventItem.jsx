import React from "react";
import { useNavigate } from "react-router-dom";

const EventItem = ({ eventList }) => {
  const navigate = useNavigate();
  const { eventCode, eventTitle, eventContent, eventWriter, eventRegDate } = eventList;

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/event/read/${eventCode}`)}
    >
      <td>{eventTitle}</td>
      <td>{eventContent}</td>
      <td>{eventWriter}</td>
      <td>{eventRegDate}</td>
    </tr>
  );
};

export default EventItem;
