import { Grid, TextField } from "@material-ui/core";
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";

const Address = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
    
        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setAddress(fullAddress);
      };
    
      const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
      };


  return (
    <div>
         <div className="modal-address">
        {isPopupOpen && (
          <div>
            <DaumPostcode
              style={postCodeStyle}
              onClose={() => setIsPopupOpen(false)}
              onComplete={handlePostCode}
            />
          </div>
        )}
      </div>
      <Grid item xs={12}>
              <TextField
                value={address}
                variant="outlined"
                required
                fullWidth
                helperText="주소는 직접 입력이 불가능합니다"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="userAddress"
                autoComplete="userAddress"
                onChange={handleFormChange}
              />
            </Grid>
            <Button
              type="button"
              style={{ marginRight: 60, marginTop: 25 }}
              onClick={() => setIsPopupOpen(true)}
            >
              우편번호 검색
            </Button>
            <Button
              className="postCode_btn"
              style={{ marginLeft: 140, marginTop: 25, width: "5rem" }}
              type="button"
              onClick={() => setIsPopupOpen(false)}
            >
              닫기
            </Button>
    </div>
  )
}

export default Address