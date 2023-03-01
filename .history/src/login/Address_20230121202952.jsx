import React from 'react'
import { useState } from 'react';

const Address = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [address, setAddress] = useState('');

  //주소 받는 API
  const handlePostCode = (data) => {

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setAddress(fullAddress)
  }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
      };

  return (
    <div>{isPopupOpen && (
        <div>
          <DaumPostcode
            style={postCodeStyle} onClose={() => setIsPopupOpen(false)} onComplete={handlePostCode} />
        </div>
      )}</div>
  )
}

export default Address