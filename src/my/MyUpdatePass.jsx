import { Grid, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { onPasswordUpdate } from '../util/axios/my';
import { onCheckPassword } from '../util/regex/regex';
import { swalError, swalQueryUpdate, swalSuccessUpdate } from '../util/swal/swal.basic.util';
import { swalSuccessEqualPassword, swalWarnConfirmPassword, swalWarnNotEqualPassword, swalWarnPasswordForm, swalWarnPasswordInput } from '../util/swal/swal.my.util';
const MyUpdatePass = () => {
    const navigate = useNavigate();
    const [pass1, setPass1] = useState('')
    const { loginUser } = useContext(UserContext);
    const [isChecked, setIsChecked] = useState(false);

    const [form, setForm] = useState({
        uid: loginUser.uid,
        upass: ''
    })

    const { uid, upass } = form;

    const onChangeForm = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //validate password
    const onValidatePass = async (e) => {
        e.preventDefault();
        if (pass1 === '') {
            swalWarnPasswordInput();
        }

        else if (onCheckPassword(upass) === false) {
            swalWarnPasswordForm();
        }

        else if (upass !== pass1) {
            swalWarnNotEqualPassword();
        }

        else if (upass === pass1) {
            swalSuccessEqualPassword();
            setIsChecked(true);
        }
    }

    const onUpdate = (e) => {
        e.preventDefault();

        swalQueryUpdate().then(async (result) => {

            if (result.isConfirmed) {
                
                const data = {
                    uid: uid,
                    upass: upass
                };

                await onPasswordUpdate(data).then(() => {
                    swalSuccessUpdate();
                    navigate(`/my/info/${sessionStorage.getItem('uid')}`)
                }).catch(() => {
                    swalError();
                })

            }
            //취소 click.
            else if (result.isDismissed) {
                setIsChecked(false);
            }
        })
    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            <Row className='mt-3'>
                <Card style={{ width: '30rem' }} className="p-3">
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="비밀번호"
                            helperText="8-10자 영문대소문자와 숫자를 조합"
                            FormHelperTextProps={{ style: { fontSize: 15 } }}
                            value={form.upass}
                            name="upass"
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
                    <Button onClick={onValidatePass} className='mt-3'>패스워드 일치 확인</Button>

                    <Button onClick={isChecked === true ? onUpdate :
                        swalWarnConfirmPassword} className='mt-3'>비밀번호 변경</Button>
                </Card>
            </Row>
        </div>
    )
}

export default MyUpdatePass