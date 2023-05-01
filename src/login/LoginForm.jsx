import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../model/user.store";
import { login } from "../util/axios/login";
import { confirmRestore } from "../util/swal/confirmation";
import {
  informDuplicationPassedUserId,
  informServerError,
} from "../util/swal/information";

const LoginForm = () => {
  const navigate = useNavigate();
  const fetchLoginUser = useUserStore((state) => state.fetchLoginUser);
  const [form, setForm] = useState({
    userId: "",
    userPass: "",
  });

  const { userId, userPass } = form;

  const onChangeForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login(form).catch(()=>{
      informServerError();
    });

    //id x
    if (result.data === 0 || result.data === 3) {
      informDuplicationPassedUserId();
      setForm({
        userId: "",
        userPass: "",
      });

      //move to restore
    } else if (result.data === 1) {
      confirmRestore().then(async (result) => {
        if (result.isConfirmed) {
          navigate(`/login/restore/${userId}`);
        }
      });

      //login success
    } else if (result.data === 2) {
      fetchLoginUser(userId); //작동잘 하고 있음.
      navigate("/");
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content-center my-5">
        <Card style={{ width: "30rem" }} className="p-3">
          <Form onSubmit={handleLogin}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="id"
                value={userId}
                name="userId"
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
                value={userPass}
                name="userPass"
                type="password"
                onChange={onChangeForm}
              />
            </Grid>

            <hr />
            <Button type="submit" style={{ width: "30%" }}>
              로그인
            </Button>
          </Form>

          <div className="my-3">
            <Link style={{ marginRight: 110 }} to="/login/register">
              회원가입
            </Link>
            <Link style={{ marginRight: 80 }} to="/login/findId">
              아이디 찾기
            </Link>
            <Link to="/login/findPass">비밀번호 찾기</Link>
          </div>
        </Card>
      </Row>
    </div>
  );
};

export default LoginForm;
