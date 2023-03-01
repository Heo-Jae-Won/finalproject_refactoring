import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row, Spinner } from 'react-bootstrap';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getUserCondition, getUserId, getUserNickname, onUserInfoUpdate } from '../util/axios/my';
import { onCheckEmail, onCheckPhoneNumber } from '../util/regex/regex';
import { swalError, swalQueryUpdate, swalSuccessUpdate } from '../util/swal/swal.basic.util';
import { swalQueryDeactivate, swalSuccessDeactivate, swalWarnEmailForm, swalWarnNicknameInput, swalWarnPhoneNumberForm } from '../util/swal/swal.my.util';

const MyInfo = () => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const { uid } = useParams();



  const onChangeLoginUser = (e) => {
    setLoginUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }


  //check duplication of nickname
  const onCheckUnickanme = async (e) => {
    e.preventDefault();
    if (loginUser.unickname === '') {
      swalWarnNicknameInput();
    }

    const result = await getUserNickname(loginUser.unickname);
    result.data === 1 ?
      setMessage('사용 가능한 닉네임입니다.')
      :
      setMessage('해당 닉네임은 사용할 수 없습니다')
  }




  const onChangeLoginUserFile = (e) => {
    setLoginUser(prev => ({
      ...prev,
      file: e.target.files[0],
    }))
    setImage(URL.createObjectURL(e.target.files[0]));
  }


  const fetchUserInfo = async () => {
    setLoading(true);
    const result = await getUserId(uid);
    setLoginUser(result.data);
    setImage(result.data.uprofile);
    setLoading(false);
  }

  //fetching address API
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

  //update myinfo
  const onUpdate = () => {

    if (!onCheckPhoneNumber(loginUser.utel)) {
      swalWarnPhoneNumberForm();
      return;
    }

    if (!onCheckEmail(loginUser.uemail)) {
      swalWarnEmailForm();
      return;
    }

    swalQueryUpdate().then(async (result) => {
      if (result.isConfirmed) {

        const data = {
          uid: uid,
          unickname: loginUser.unickname,
          uprofile: loginUser.uprofile,
          uaddress: address || loginUser.uaddress,
          uemail: loginUser.uemail,
          utel: loginUser.utel,
          file: loginUser.file
        }
        await onUserInfoUpdate(data).then(() => {
          swalSuccessUpdate();
        }).catch(() => {
          swalError();
        })

      }
    })
  }

  //deactivate membership
  const onDelete = () => {

    swalQueryDeactivate().then(async (result) => {
      if (result.isConfirmed) {

        await getUserCondition(uid).then(() => {
          swalSuccessDeactivate();
          sessionStorage.removeItem('uid');
          navigate('/');
        });

      }
    })
  }

  useEffect(() => {
    fetchUserInfo();
  }, [uid]);

  if (loading) return (
    <Spinner animation="border" variant="primary"
      style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
  )

  return (
    <>
      <div className='modal-address'>
        {isPopupOpen && (
          <div>
            <DaumPostcodeEmbed
              style={postCodeStyle} onClose={() => setIsPopupOpen(false)} onComplete={handlePostCode} />
          </div>
        )}
      </div>
      <div className='d-flex justify-content-center mt-5' >
        <Row className='mt-3'>
          <Form style={{ marginLeft: '70px' }}>
            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>NickName</Form.Label>
              <Form.Control
                placeholder="닉네임"
                name='unickname'
                value={loginUser.unickname}
                onChange={onChangeLoginUser} />
              {message && <Alert>{message}</Alert>}
              <Button className='mt-3' onClick={onCheckUnickanme}>닉네임 중복확인</Button>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Tel</Form.Label>
              <Form.Control
                name='utel'
                placeholder="Tel"
                value={loginUser.utel}
                onChange={onChangeLoginUser} />
            </Form.Group>
            <Form.Group className="mb-3">
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='uemail'
                placeholder="Email"
                value={loginUser.uemail}
                onChange={onChangeLoginUser} />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name='uaddress'
                value={address || loginUser.uaddress}
                onChange={onChangeLoginUser} />
            </Form.Group>

            <Button type='button'
              style={{ marginLeft: '-150px', marginTop: 2 }}
              onClick={() => setIsPopupOpen(true)}>우편번호 검색</Button>
            <Button className='postCode_btn'
              style={{ marginLeft: 60, marginTop: 2 }}
              type='button'
              onClick={() => setIsPopupOpen(false)} >닫기</Button>

            <Form.Control
              className="my-3" style={{ width: '300px' }}
              type="file"
              onChange={onChangeLoginUserFile}
            />
            <img src={image} style={{ width: "300px", height: "350px", marginLeft: '-150px' }} alt="빈 이미지" />

            <div style={{ marginTop: 20, marginLeft: '-100px' }}>
              <Button className='ff'
                style={{ marginLeft: '-10px' }}
                onClick={onUpdate}>
                정보 변경하기
              </Button>
              <Button className='ff1' onClick={onDelete}>회원탈퇴</Button>
              <Button className='mx-5' onClick={() => navigate(`/my/pass/update`)}>
                비밀번호 변경
              </Button>
            </div>
          </Form>
        </Row>
      </div>
    </>
  );
}


export default MyInfo