import React from 'react'

const years = range(1930, getYear(new Date()) + 1, 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = () => {
    const [ubirth, setUbirth] = useState(new Date());
  return (
    <div>month</div>
  )
}

export default month