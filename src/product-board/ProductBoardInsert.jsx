import { Card, Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { informSuccess } from '../util/swal/information'
import { confirmInsert } from '../util/swal/confirmation'
import { insertProductBoard } from '../util/axios/product.board'
import { swalAlertFileUploadTypeError } from '../util/swal/service.exception'

const ProductBoardInsert = () => {
    const { userNickname } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [form, setForm] = useState({
        productWriter: userNickname,
        productPrice: '',
        productTitle: '',
        productContent: '',
        productName: '',
        file: null,
        productImage: ''
    })
    const { productName, productPrice, productTitle, productContent, productImage, file, productWriter } = form;

    const handleFormChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFileChange = (e) => {
        setForm(prev => ({
            ...prev,
            file: e.target.files[0]
        }))
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleProductBoardInsert = async () => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("productContent", productContent);
        formData.append("productTitle", productTitle);
        formData.append("productPrice", productPrice);
        formData.append("productWriter", productWriter);
        formData.append("productImage", productImage);
        formData.append("productName", productName);


        confirmInsert().then(async (result) => {

            if (result.isConfirmed) {

                await insertProductBoard(formData).then(() => {
                    informSuccess();
                    navigate('/productBoard/list')
                }).catch((error) => {
                   if(error.response.data.includes("imagefile only accepted for jpeg,png")){
                       swalAlertFileUploadTypeError();
                   }
                })

            }
        })
    }


    // 새로고침 막기(조건 부여 가능)
    useEffect(() => {
        window.onbeforeunload = function () {
            return true;
        };
        return () => {
            window.onbeforeunload = null;
        };
    }, [])

    return (
        <div>

            <Row className='d-flex justify-content-center my-5'>
                <Card style={{ width: '60rem' }} className="p-3">
                    <Form>
                        <Grid item xs={12}>
                            <p style={{ width: "100%" }}>이미지</p>
                            <img src={image || 'https://dummyimage.com/300x300'}
                                alt="빈이미지" title='메인이미지' width={300} height={300} />
                        </Grid>
                        <Form.Control className='my-3'
                            type="file"
                            onChange={handleFileChange} />
                        <hr />

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={productTitle}
                                onChange={handleFormChange}
                                label="제목"
                                name="productTitle"
                                autoComplete="productTitle"
                            />
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="상품명"
                                value={productName}
                                onChange={handleFormChange}
                                name="productName"
                            />
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                            <TextField multiline
                                minRows={12}
                                variant="outlined"
                                required
                                fullWidth
                                value={productContent}
                                onChange={handleFormChange}
                                label="내용은 300자 제한"
                                name="productContent"
                                autoComplete="productContent"
                            />

                            <hr />
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="가격"
                                    value={productPrice}
                                    onChange={handleFormChange}
                                    name="productPrice"
                                    type='number'
                                    autoComplete="productPrice"
                                />
                            </Grid>
                            <hr />

                        </Grid>
                        <div style={{ marginTop: 30 }}>
                            <Button onClick={handleProductBoardInsert} style={{ width: '20%', marginTop: 100 }}>상품 등록</Button>
                            <Button onClick={() => navigate(-1)} style={{ width: '20%', marginLeft: 200 }}>뒤로가기</Button>

                        </div>

                    </Form>
                </Card>
            </Row>
        </div>
    )
}

export default ProductBoardInsert



