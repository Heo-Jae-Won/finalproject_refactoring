import { Grid, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { requireEqualityPassword, requireInput, requireValidationPass } from '../util/swal/requirement';
import { checkPasswordValid } from '../util/regex/regex';
import { informEqualPassword, informNotEqualPassword, informSuccess } from '../util/swal/information';
import { confirmUpdate } from '../util/swal/confirmation';
import { updatePassword } from '../util/axios/my/user';
const MyUpdatePass = () => {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('')
    const { loginUser } = useContext(UserContext);
    const [isChecked, setIsChecked] = useState(false);

    const [form, setForm] = useState({
        userId: loginUser.userId,
        userPass: ''
    })

    const { userId, userPass } = form;

    const onChangeForm = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //validate password
    const onValidatePass = async (e) => {
        e.preventDefault();
        if (!confirmPassword) {
            requireInput();
        }

        else if (!checkPasswordValid(userPass) ) {
            requireValidationPass();
        }

        else if (userPass !== confirmPassword) {
            informNotEqualPassword();
        }

        else if (userPass === confirmPassword) {
            informEqualPassword();
            setIsChecked(true);
        }
    }

    const handlePasswordUpdate = (e) => {
        e.preventDefault();

        confirmUpdate().then(async (result) => {

            if (result.isConfirmed) {
                
                const data = {
                    userId,
                    userPass
                };

                await updatePassword(data).then(() => {
                    informSuccess();
                    navigate(`/my/info/${sessionStorage.getItem('userId')}`)
                }).catch(() => {
                    informSuccess();
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
                            value={userPass}
                            name="userPass"
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
                            id="userPass"
                            label="비밀번호 확인"
                            value={confirmPassword}
                            name="userPass"
                            autoComplete="userPass"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                    <Button onClick={onValidatePass} className='mt-3'>패스워드 일치 확인</Button>

                    <Button onClick={isChecked === true ? handlePasswordUpdate :
                        requireEqualityPassword} className='mt-3'>비밀번호 변경</Button>
                </Card>
            </Row>
        </div>
    )
}

export default MyUpdatePass