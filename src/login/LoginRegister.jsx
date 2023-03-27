import { Grid, MenuItem, TextField } from '@material-ui/core';
import axios from 'axios';
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import React, { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from 'react-router-dom';
import { authenticateUser, checkDuplicateId, checkDuplicateNicknames, registerUser } from '../util/axios/login';
import { onCheckEmail, onCheckPassword, onCheckPhoneNumber } from '../util/regex/regex';
import { swalSuccessInsert } from '../util/swal/swal.basic.util';
import { swalfailDuplicationCheckId, swalfailDuplicationCheckUnickname, swalQueryRegisterId, swalWarnIdentifyPassword, swalSuccessDuplicationCheckId, swalSuccessDuplicationCheckNickname, swalWarnAuthenticate, swalWarnIdInput, swalWarnInputConfirmPassword, swalWarnInputGender, swalWarnInputIdPassword, swalWarnInputName } from '../util/swal/swal.login.util';
import { swalWarnNicknameInput, swalWarnPasswordForm, swalWarnPhoneNumberForm } from '../util/swal/swal.my.util';
import { swalAlertFileUploadTypeError, swalErrorImageType } from '../util/swal/swal.pboard.util';

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
  const [ubirth, setUbirth] = useState(new Date());
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('https://dummyimage.com/300x300');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [pass1, setPass1] = useState('');







  const onCheckUnickanme = async (e) => {
    e.preventDefault();

    if (form.unickname === '') {
      swalWarnNicknameInput();
      return;
    }

    const result = await checkDuplicateNicknames(form.unickname);
    result.data === 1 ?
      swalSuccessDuplicationCheckNickname()
      :
      swalfailDuplicationCheckUnickname()
  }

  const onConfirmPassword = () => {
    upass !== pass1 ?
      setMessage('비밀번호가 일치하지 않습니다.')
      :
      setMessage('비밀번호가 일치합니다.');
  }

  const onCheckUid = async (e) => {
    e.preventDefault();

    if (form.uid === '') {
      swalWarnIdInput();
      return;
    }

    const result = await checkDuplicateId(form.uid);
    result.data === '' ?
      swalSuccessDuplicationCheckId()
      :
      swalfailDuplicationCheckId()
  }

  const [form, setForm] = useState({
    uid: '',
    upass: '',
    uname: '',
    unickname: '',
    uemail: '',
    utel: '',
    uaddress: '',
    ucondition: '1',
    ugender: '',
    file: null
  })

  const { uid, upass, uname, unickname, uemail, ucondition, utel, ugender, file } = form;

  const onChangeForm = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onRegister = async (e) => {
    e.preventDefault();

    if (uid === '' || upass === '') {
      swalWarnInputIdPassword();
      return;
    }

    else if (ugender === "" || ugender === "성별") {
      swalWarnInputGender();
      return;
    }

    else if (uname === '') {
      swalWarnInputName();
      return;
    }

    else if (pass1 === '') {
      swalWarnInputConfirmPassword();
      return;
    }

    else if (upass !== pass1) {
      swalWarnIdentifyPassword();
      return;
    }

    else if (!onCheckPassword(form.upass)) {
      swalWarnPasswordForm();
      return;
    }

    else if (!onCheckPhoneNumber(form.utel)) {
      swalWarnPhoneNumberForm();
      return;
    }

    else if (!onCheckEmail(form.uemail)) {
      onCheckPhoneNumber();
      return;
    }



    swalQueryRegisterId().then(async (result) => {

      //identification process
      if (result.isConfirmed) {
        const result = await authenticateUser(form.utel)

        const authnum = prompt('인증번호를 입력하세요.');

        if (authnum !== String(result.data)) {
          swalWarnAuthenticate();
          return;
        }

        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('upass', upass);
        formData.append('uname', uname);
        formData.append('unickname', unickname);
        formData.append('uemail', uemail);
        formData.append('utel', utel);
        formData.append('uaddress', address);
        formData.append('file', file);
        formData.append('ucondition', ucondition);
        formData.append('ugender', ugender);
        formData.append('ubirth', ubirth);


        await registerUser(formData).then(() => {
          swalSuccessInsert();
          navigate('/login/form')
        }).catch(error => {
          if (error.response.data.includes("imagefile only accepted for jpeg,png")) {
            swalAlertFileUploadTypeError();
          }
        }
        )


      }
    })





  }



  const onChangeFile = (e) => {
    setForm(prev => ({
      ...prev,
      file: e.target.files[0]
    }))
    setImage(URL.createObjectURL(e.target.files[0]))
  }


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

    <div>

      <div className='modal-address'>
        {isPopupOpen && (
          <div>
            <DaumPostcode
              style={postCodeStyle} onClose={() => setIsPopupOpen(false)} onComplete={handlePostCode} />
          </div>
        )}
      </div>

      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="아이디"
                value={uid}
                name="uid"
                helperText="15자 이하로 기입"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                onChange={onChangeForm}
              />
            </Grid>

            <Button onClick={onCheckUid} className='mt-3'>아이디 중복 확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="비밀번호"
                helperText="8-10자 영문대소문자와 숫자를 조합"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={upass}
                name="upass"
                autoComplete="upass"
                type="password"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="upass"
                label="비밀번호 확인"
                value={pass1}
                name="upass"
                autoComplete="upass"
                type="password"
                onChange={(e) => setPass1(e.target.value)}
              />
            </Grid>
            {message && <Alert>{message}</Alert>}
            <Button onClick={onConfirmPassword} className='mt-3'>비밀번호 확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="가입자 이름"
                value={uname}
                name="uname"
                autoComplete="uname"
                onChange={onChangeForm}
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
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
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

                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      {">"}
                    </button>
                  </div>
                )}
                selected={ubirth}
                maxDate={new Date()}
                onChange={date => setUbirth(date)}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="닉네임"
                value={unickname}
                name="unickname"
                onChange={onChangeForm}
              />
            </Grid>

            <Button className='mt-3' onClick={onCheckUnickanme}>닉네임 중복확인</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                value={address}
                variant="outlined"
                required
                fullWidth
                id="adresss"
                helperText="주소는 직접 입력이 불가능합니다"
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="uaddress"
                autoComplete="uaddress"
                onChange={onChangeForm}
              />
            </Grid>

            <Button type='button'
              style={{ marginRight: 60, marginTop: 25 }}
              onClick={() => setIsPopupOpen(true)}>우편번호 검색</Button>
            <Button className='postCode_btn'
              style={{ marginLeft: 140, marginTop: 25, width: '5rem' }}
              type='button'
              onClick={() => setIsPopupOpen(false)} >닫기</Button>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="utel"
                label="전화번호"
                value={utel}
                helperText='010-0000-0000 or 010-000-0000'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="utel"
                autoComplete="utel"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField

                variant="outlined"
                required
                fullWidth
                id="uemail"
                label="이메일 주소"
                helperText="실제 이메일과 다를 시 비밀번호를 재발급 받는 데 지장이 있습니다"
                value={uemail}
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="uemail"
                autoComplete="uemail"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <TextField
              select
              label='성별을 선택하세요'
              fullWidth
              value={ugender}
              name='ugender'
              onChange={onChangeForm}>
              <MenuItem value='성별'>성별</MenuItem>
              <MenuItem value='남자'>남자</MenuItem>
              <MenuItem value='여자'>여자</MenuItem>
            </TextField>
            프로필 사진등록
            <br />

            <img src={image} width={250} height={250} alt="빈 이미지" />
            <Form.Control className='my-3'
              onChange={onChangeFile}
              type="file" />
            <hr />
            <Button onClick={onRegister} type="submit" style={{ width: '100%' }}>회원가입</Button>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default LoginRegister