import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { confirmInsert } from "../util/swal/confirmation";
import { informServerError } from "../util/swal/information";
import { login } from "../util/axios/login";
import { failDuplicationCheckUserId } from "../util/swal/service.exception";

const LoginForm = () => {
  const navigate = useNavigate();
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

    try {
      const result = await login(form);

      //id x
      if (result.data === 0 || result.data === 3) {
        failDuplicationCheckUserId();
        setForm({
          userId: "",
          userPass: "",
        });

        //move to restore
      } else if (result.data === 1) {
        confirmInsert().then(async (result) => {
          if (result.isConfirmed) {
            navigate(`/login/restore/${userId}`);
          }
        });

        //login success
      } else if (result.data === 2) {
        sessionStorage.setItem("userId", form.userId);
        navigate("/");
      }
    } catch (e) {
      informServerError();
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
