import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row, Spinner } from 'react-bootstrap';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useCallback } from 'react';
import { requireInput, requireValidationPass } from '../util/swal/requirement';
import { getUserId, getUserNickname, getUserStatus, updateUserInfo } from '../util/axios/my/user';
import { checkEmailValid, checkPhoneNumberValid } from '../util/regex/regex';
import { confirmDeactivate, confirmUpdate } from '../util/swal/confirmation';
import { informServerError, informSuccess } from '../util/swal/information';

const MyInfo = () => {
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const { userId } = useParams();



  const handleFormChange = (e) => {
    setLoginUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }


  //check duplication of nickname
  const handleUserNicknameCheck = async (e) => {
    e.preventDefault();
    if (!loginUser.userNickname) {
      requireInput();
    }

    const result = await getUserNickname(loginUser.userNickname);
    result.data === 1 ?
      setMessage('사용 가능한 닉네임입니다.')
      :
      setMessage('해당 닉네임은 사용할 수 없습니다')
  }




  const handleFileChange = (e) => {
    setLoginUser(prev => ({
      ...prev,
      file: e.target.files[0],
    }))
    setImage(URL.createObjectURL(e.target.files[0]));
  }


  const fetchUserInfo =useCallback( async () => {
    setLoading(true);
    const result = await getUserId(userId);
    setLoginUser(result.data);
    setImage(result.data.userProfile);
    setLoading(false);
  },[setLoginUser, userId]);

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

  //update myInfo
  const handleUserInfoUpdate = () => {

    if (!checkPhoneNumberValid(loginUser.userTel) || !checkEmailValid(loginUser.userEmail)) {
      requireValidationPass();
      return;
    }


    confirmUpdate().then(async (result) => {
      if (result.isConfirmed) {

    //      setLoginUser(prev => ({
    //   ...prev,
    //   file: e.target.files[0],
    // })) 여기서 file을 추가했음. 그래서 file이라는 property를 쓸 수 있는 것.
        const data = {
          userId: userId,
          userNickname: loginUser.userNickname,
          userProfile: loginUser.userProfile,
          userAddress: address || loginUser.userAddress,
          userEmail: loginUser.userEmail,
          userTel: loginUser.userTel,
          file: loginUser.file
        }
        await updateUserInfo(data).then(() => {
          informSuccess();
        }).catch(() => {
          informServerError();
        })

      }
    })
  }

  //deactivate membership
  const handleUserDeactivate = () => {

    confirmDeactivate().then(async (result) => {
      if (result.isConfirmed) {

        await getUserStatus(userId).then(() => {
          informSuccess();
          sessionStorage.removeItem('userId');
          navigate('/');
        });

      }
    })
  }

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo, userId]);

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
                name='userNickname'
                value={loginUser.userNickname}
                onChange={handleFormChange} />
              {message && <Alert>{message}</Alert>}
              <Button className='mt-3' onClick={handleUserNicknameCheck}>닉네임 중복확인</Button>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Tel</Form.Label>
              <Form.Control
                name='userTel'
                placeholder="Tel"
                value={loginUser.userTel}
                onChange={handleFormChange} />
            </Form.Group>
            <Form.Group className="mb-3">
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='userEmail'
                placeholder="Email"
                value={loginUser.userEmail}
                onChange={handleFormChange} />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '300px' }}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name='userAddress'
                value={address || loginUser.userAddress}
                onChange={handleFormChange} />
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
              onChange={handleFileChange}
            />
            <img src={image} style={{ width: "300px", height: "350px", marginLeft: '-150px' }} alt="빈 이미지" />

            <div style={{ marginTop: 20, marginLeft: '-100px' }}>
              <Button className='ff'
                style={{ marginLeft: '-10px' }}
                onClick={handleUserInfoUpdate}>
                정보 변경하기
              </Button>
              <Button className='ff1' onClick={handleUserDeactivate}>회원탈퇴</Button>
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