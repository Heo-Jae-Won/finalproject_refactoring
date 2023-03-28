import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { onLogin } from '../util/axios/login';
import { swalError } from '../util/swal/swal.basic.util';
import { swalQueryRegisterId, swalWarnExistId, swalWarnExistPassword } from '../util/swal/swal.login.util';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uid: '',
    upass: '',
    ucondition: ''
  })


  const onChangeForm = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await onLogin(form);

      //id x
      if (result.data === 0) {
        swalWarnExistId();
        setForm({
          ...form,
          uid: ''
        });

        //password incorrect
      } else if (result.data === 3) {
        swalWarnExistPassword();
        setForm({
          ...form,
          upass: ''
        });

        //deactivated member
      } else if (result.data === 1) {

        //move to restore
        swalQueryRegisterId().then(async (result) => {
          if (result.isConfirmed)
            navigate(`/login/restore/${form.uid}`);

        })

        //login success
      } else {
        sessionStorage.setItem("uid", form.uid);
        navigate('/')
      }

    } catch (e) {
      swalError();

    }

  }



  return (
    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form onSubmit={onLoginSubmit}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unickname"
                label="id"
                value={form.uid}
                name="uid"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="password"
                value={form.upass}
                name="upass"
                type="password"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Button type="submit" style={{ width: '30%' }}>로그인</Button>
          </Form>

          <div className='my-3'>
            <Link style={{ marginRight: 110 }} to="/login/register">회원가입</Link>
            <Link style={{ marginRight: 80 }} to="/login/findId">아이디 찾기</Link>
            <Link to="/login/findpass">비밀번호 찾기</Link>
          </div>
        </Card>
      </Row>
    </div>
  )
}

export default LoginForm

