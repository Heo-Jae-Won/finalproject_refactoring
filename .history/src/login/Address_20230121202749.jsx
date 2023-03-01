import React from 'react'

const Address = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [address, setAddress] = useState('');



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