import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Card, Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { FindId } from '../util/axios/login';
import { swalError } from '../util/swal/swal.basic.util';
import { swalWarnEmailInput } from '../util/swal/swal.my.util';

const LoginFindId = () => {
  const [message, SetMessge] = useState('');
  const [form, setForm] = useState({
    uemail: '',
    uname: ''
  })

  const onChangeForm = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onFindId = async (e) => {
    e.preventDefault();

    if (form.uemail === '') {
      swalWarnEmailInput();
      return;
    }

    try {
      const result = await FindId(form.uemail,form.uname);

      if (result.data === '') {
        setForm({
          ...form,
          uemail: ''
        });
        SetMessge('검색된 아이디가 없습니다');
      } else {
        SetMessge('아이디는 ' + result.data + '입니다');
      }

    } catch (e) {
      swalError();
    }

  }
  return (


    <div>
      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '30rem' }} className="p-3">
          <Form onSubmit={onFindId}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="name"
                value={form.uname}
                name="uname"
                onChange={onChangeForm}
              />
            </Grid>
            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="email"
                value={form.uemail}
                name="uemail"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />

            <Button type="submit" style={{ width: '40%' }}>아이디 찾기</Button>
            {message && <Alert>{message}</Alert>}
          </Form>


        </Card>
      </Row>
    </div>
  )
}

export default LoginFindId