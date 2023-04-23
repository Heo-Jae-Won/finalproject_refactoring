import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sendTempPassword } from '../util/axios/login';
import { informDuplicationPassedUserId, informSendingTempPassword, informServerError } from '../util/swal/information';
import { requireInput, requireValidationPass } from '../util/swal/requirement';
import { failFindUserEmail } from '../util/swal/service.exception';
import { checkEmailValid } from '../util/regex/regex';

const LoginFindPass = () => {
  const message = '비밀번호를 재발급하는 데 약 7-8초의 시간이 소요됩니다.';
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: '',
    userEmail: ''
  })

  const { userId, userEmail } = form;

  const handleFormChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleTempPasswordSend = async (e) => {
    e.preventDefault();

    if (!userId || !userEmail) {
      requireInput();
      return;
    }

    if (!checkEmailValid(userEmail)) {
      requireValidationPass();
      return;
    }

    //find pass
    try {
      const result = await sendTempPassword(form);

      if (result.data === 1) {
        informDuplicationPassedUserId();
      }

      else if (result.data === 2) {
        failFindUserEmail();
      } else if (result.data === 3) {

        informSendingTempPassword();
        navigate('/login/form')
      }
    } catch (e) {
      informServerError();

    }

  }

  return (
    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form onSubmit={handleTempPasswordSend}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="id"
                value={userId}
                name="userId"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="email"
                value={userEmail}
                name="userEmail"
                onChange={handleFormChange}
              />
            </Grid>
            <hr />
            <Button type='submit' style={{ width: '50%' }}>임시비밀번호 발급</Button>
            <Alert>{message}</Alert>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default LoginFindPass