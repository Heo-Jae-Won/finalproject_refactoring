import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { onUserRestore } from '../util/axios/login';
import { swalError } from '../util/swal/swal.basic.util';
import { swalQueryRestoreUserId, swalSuccessRestore } from '../util/swal/swal.login.util';

const LoginRestore = () => {
  const { uid } = useParams();
  const navigate = useNavigate();

  const OnRestore = () => {
    swalQueryRestoreUserId().then(async (result) => {

      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("uid", uid);

        await onUserRestore(formData).then(() => {
          swalSuccessRestore()
          navigate('/login/form');
        }).catch(() => {
          swalError()
        })

      }
    })
  }







  return (
    <div>
      <img src='/image/fn.jpg' width={930} height={410} style={{ marginTop: 20 }} alt="빈 이미지" />
      <div style={{ marginTop: 50 }}>
        <Button onClick={OnRestore}>계정복구</Button>
      </div>
    </div>
  )
}

export default LoginRestore