import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sendTempPassword } from '../util/axios/login';
import { onCheckEmail } from '../util/regex/regex';
import { swalError } from '../util/swal/swal.basic.util';
import { swalSuccessTempPassword, swalWarnExistEmail, swalWarnExistId, swalWarnInputIdEmail } from '../util/swal/swal.login.util';
import { swalWarnEmailForm } from '../util/swal/swal.my.util';

const LoginFindPass = () => {
  const message = '비밀번호를 재발급하는 데 약 7-8초의 시간이 소요됩니다.';
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uid: '',
    uemail: ''
  })

  const { uid, uemail } = form;

  const onChangeForm = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onFindPass = async (e) => {
    e.preventDefault();

    if (uid === '' || uemail === '') {
      swalWarnInputIdEmail();
      return;
    }

    if (!onCheckEmail(form.uemail)) {
      swalWarnEmailForm();
      return;
    }

    //find pass
    try {
      const result = await sendTempPassword(form);

      if (result.data === 1) {
        swalWarnExistId();
      }

      else if (result.data === 2) {
        swalWarnExistEmail();
      } else if (result.data === 3) {

        swalSuccessTempPassword();
        navigate('/login/form')
      }
    } catch (e) {
      swalError();

    }

  }

  return (
    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form onSubmit={onFindPass}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="id"
                value={form.uid}
                name="uid"
                autoComplete="unick"
                onChange={onChangeForm}
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
                value={form.uemail}
                name="uemail"
                onChange={onChangeForm}
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