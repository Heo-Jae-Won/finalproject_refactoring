import { Grid, MenuItem, TextField } from "@material-ui/core";
import { getMonth, getYear } from "date-fns";
import React, { useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { requireInput, requireValidationPass } from "../util/swal/requirement";
import {
  authenticateUser,
  checkDuplicationUserId,
  checkDuplicationUserNickname,
  saveUser,
} from "../util/axios/login";
import {
  failDuplicationCheckUserId,
  failDuplicationCheckUserNickname,
  failFileUploadByType,
} from "../util/swal/service.exception";
import {
  informDuplicationUserNicknamePass,
  informFailedAuthentication,
  informNotEqualPassword,
  informSuccess,
  informUseableUserId,
} from "../util/swal/information";
import { confirmInsert } from "../util/swal/confirmation";
import { checkEmailValid, checkPasswordValid, checkPhoneNumberValid } from "../util/regex/regex";
import { range } from "range";

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

const LoginRegister = () => {
  const navigate = useNavigate();
  const [userBirth, setUserBirth] = useState(new Date());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("https://dummyimage.com/300x300");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [form, setForm] = useState({
    userId: "",
    userPass: "",
    userName: "",
    userNickname: "",
    userEmail: "",
    userTel: "",
    userAddress: "",
    userStatus: "1",
    userGender: "",
    file: null,
  });

  const {
    userId,
    userPass,
    userName,
    userNickname,
    userEmail,
    userStatus,
    userTel,
    userGender,
    file,
  } = form;

  const handleDuplicationUserNicknameCheck = async (e) => {
    e.preventDefault();

    if (!userNickname) {
      requireInput();
      return;
    }

    const result = await checkDuplicationUserNickname(userNickname);
    result.data === 1 ? informDuplicationUserNicknamePass() : failDuplicationCheckUserNickname();
  };

  const confirmEqualPassword = () => {
    userPass !== confirmPassword
      ? setMessage("비밀번호가 일치하지 않습니다.")
      : setMessage("비밀번호가 일치합니다.");
  };

  const handleDuplicationUserIdCheck = async (e) => {
    e.preventDefault();

    if (!userId) {
      requireInput();
      return;
    }

    const result = await checkDuplicationUserId(userId);
    !result.data ? informUseableUserId() : failDuplicationCheckUserId();
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSave = async (e) => {
    e.preventDefault();

    if (
      !userId ||
      !userPass ||
      !userGender ||
      userGender === "성별" ||
      !userName ||
      !confirmPassword
    ) {
      requireInput();
      return;
    } else if (userPass !== confirmPassword) {
      informNotEqualPassword();
      return;
    } else if (
      !checkPasswordValid(userPass) ||
      !checkPhoneNumberValid(userTel) ||
      !checkEmailValid(userEmail)
    ) {
      requireValidationPass();
      return;
    }

    confirmInsert().then(async (result) => {
      //identification process
      if (result.isConfirmed) {
        const result = await authenticateUser(userTel);

        const authNumber = prompt("인증번호를 입력하세요.");

        if (authNumber !== String(result.data)) {
          informFailedAuthentication();
          return;
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("userPass", userPass);
        formData.append("userName", userName);
        formData.append("userNickname", userNickname);
        formData.append("userEmail", userEmail);
        formData.append("userTel", userTel);
        formData.append("userAddress", address);
        formData.append("file", file);
        formData.append("userStatus", userStatus);
        formData.append("userGender", userGender);
        formData.append("userBirth", userBirth);

        await saveUser(formData)
          .then(() => {
            informSuccess();
            navigate("/login/form");
          })
          .catch((error) => {
            if (
              error.response.data.includes(
                "imagefile only accepted for jpeg,png"
              )
            ) {
              failFileUploadByType();
            }
          });
      }
    });
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  //주소 받는 API
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

      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "30rem" }} className="p-3">
          <Form>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="아이디"
                value={userId}
                name="userId"
                helperText="15자 이하로 기입"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                onChange={handleFormChange}
              />
            </Grid>
            <Button onClick={handleDuplicationUserIdCheck} className="mt-3">
              아이디 중복 확인
            </Button>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="비밀번호"
                helperText="8-10자 영문대소문자와 숫자를 조합"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={userPass}
                name="userPass"
                autoComplete="userPass"
                type="password"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userPass"
                label="비밀번호 확인"
                value={confirmPassword}
                name="userPass"
                autoComplete="userPass"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            {message && <Alert>{message}</Alert>}
            <Button onClick={confirmEqualPassword} className="mt-3">
              비밀번호 확인
            </Button>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="가입자 이름"
                value={userName}
                name="userName"
                autoComplete="userName"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <ReactDatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={userBirth}
                maxDate={new Date()}
                onChange={(date) => setUserBirth(date)}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={userNickname}
                name="userNickname"
                onChange={handleFormChange}
              />
            </Grid>
            <Button className="mt-3" onClick={handleDuplicationUserNicknameCheck}>
              닉네임 중복확인
            </Button>
            <hr />
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
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="전화번호"
                value={userTel}
                helperText="010-0000-0000 or 010-000-0000"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="userTel"
                autoComplete="userTel"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이메일 주소"
                helperText="실제 이메일과 다를 시 비밀번호를 재발급 받는 데 지장이 있습니다"
                value={userEmail}
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="userEmail"
                autoComplete="userEmail"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <TextField
              select
              label="성별을 선택하세요"
              fullWidth
              value={userGender}
              name="userGender"
              onChange={handleFormChange}
            >
              <MenuItem value="성별">성별</MenuItem>
              <MenuItem value="남자">남자</MenuItem>
              <MenuItem value="여자">여자</MenuItem>
            </TextField>
            프로필 사진등록
            <br />
            <img src={image} width={250} height={250} alt="빈 이미지" />
            <Form.Control
              className="my-3"
              onChange={handleFileChange}
              type="file"
            />
            <hr />
            <Button
              onClick={handleUserSave}
              type="submit"
              style={{ width: "100%" }}
            >
              회원가입
            </Button>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default LoginRegister;
