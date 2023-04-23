import { Card, Grid, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import { addDoc, collection, getFirestore, limit, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';
import { useCallback } from 'react';
import { deleteProductBoard, getProductBoardRead, updateProductBoard } from '../util/axios/product.board';
import { informServerError, informSuccess } from '../util/swal/information';
import { confirmDelete } from '../util/swal/confirmation';
import { DeleteAlready, failFileUploadBySize } from '../util/swal/service.exception';

const ProductBoardRead = () => {
  const { productCode } = useParams();
  const navigate = useNavigate();
  const db = getFirestore(app);
  const { loginUser } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [comparisonProductCode, setComparisonProductCode] = useState([]);
  const [postRead, setPostRead] = useState({
    productTitle: '',
    productContent: '',
    productWriter: '',
    productLikecnt: '',
    productImage: '',
    productViewcnt: '',
    productRegDate: '',
    productName: '',
    userPoint: '',
    file: null,
    userId: ''
  });
  const { userId, productTitle, userPoint, productContent, productWriter, productImage, productPrice, productName, file } = postRead;



  const fetchProductBoard = useCallback( async () => {
    setLoading(true);

    //productCode o ㅡ>rendering on || productCode x ㅡ>move to ProductBoardList
    try {
      const result = await getProductBoardRead(productCode);

      const q = query(
        collection(db, `chatroom`),
        where('who', 'array-contains', sessionStorage.getItem('userId')),
        limit(100)
      );

      onSnapshot(q, (snapshot) => {
        let rows = [];
        snapshot.forEach((doc) => {
          rows.push(doc.data().productCode);
        });
        setComparisonProductCode(rows);
      });

      //sold, removed ㅡ> not allow access
      if (result.data.productStatus === 0) {
        setPostRead(result.data);
        setImage(result.data.productImage);
      } else {
        DeleteAlready();
        let seconds_ms = 1000;
        setTimeout(() => navigate('/productBoard/list'), seconds_ms);
      }
    } catch (e) {
      informServerError();
    }
    setLoading(false);
  },[db,navigate,productCode]);


  const handleFormChange = (e) => {
    setPostRead(postRead => ({
      ...postRead,
      [e.target.name]: e.target.value
    })
    )
  }

  const handleFileChange = (e) => {
    setPostRead(postRead => ({
      ...postRead,
      file: e.target.files[0]
    }))
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleProductBoardUpdate = (e) => {
    e.preventDefault();

    informSuccess().then(async (result) => {

      //update click
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("productCode", productCode);
        formData.append("productContent", productContent);
        formData.append("productTitle", productTitle);
        formData.append("productPrice", productPrice);
        formData.append("productWriter", productWriter);
        formData.append("productImage", productImage);
        formData.append("productName", productName);


        await updateProductBoard(formData).catch((e) => {
          //변경이 필요함.Exception 메시지 받아오게끔.
          e.message === 'Network Error' ?
            failFileUploadBySize()
            :
            informServerError();
        });
      }
    })

  }

  const handleProductBoardDelete = (e) => {
    e.preventDefault();
    confirmDelete().then(async (result) => {
      //remove click
      if (result.isConfirmed) {

        await deleteProductBoard(productCode).then(() => {
          informSuccess();
          navigate('/productBoard/list')
        }).catch(() => {
          informServerError();
        })

      }
    })
  }

  const setChatRoomList = async () => {

    if (!comparisonProductCode.includes(productCode)) {
      const docRef = collection(db, 'chatroom');
      await addDoc(docRef, {
        who: [sessionStorage.getItem('userId'), userId],
        date: new Intl.DateTimeFormat('kr', { dateStyle: 'full', timeStyle: 'full' })
          .format(new Date()),
        productCode: productCode,
        productImage: productImage,
      });
    }
    navigate(`/my/chat`)

  }

  useEffect(() => {
    fetchProductBoard();
  }, [fetchProductBoard])


  if (loading) return (
    <Spinner animation="border" variant="primary"
      style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
  )


  return (
    <div>

      <Row className='d-flex justify-content-center my-5'>
        <Card style={{ width: '50rem' }} className="p-3">
          <Form>
            <img src={image || 'https://dummyimage.com/100x100'} alt="빈이미지" width={300} height={300} />
            <Form.Control className='my-3'
              type="file"
              onChange={handleFileChange} />

            <hr />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={productWriter}
                readOnly
                label="작성자"
                name="productWriter"
                autoComplete="productWriter"
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={productTitle}
                onChange={loginUser.userNickname === productWriter && handleFormChange}
                label="제목"
                helperText='제목은 50까지로 제한'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="productTitle"
                autoComplete="productTitle"
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
                onChange={loginUser.userNickname === productWriter && handleFormChange}
                label="내용"
                helperText='내용은 300자까지로 제한'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                name="productContent"
                autoComplete="productContent"
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText='원하는 가격을 입력하세요'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={productPrice}
                onChange={loginUser.userNickname === productWriter && handleFormChange}
                name="productPrice"
                type='number'
                autoComplete="productPrice"
              />
            </Grid>

            <hr />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                helperText='상품명은 30자까지로 제한'
                label='상품명'
                FormHelperTextProps={{ style: { fontSize: 15 } }}
                value={productName}
                onChange={loginUser.userNickname === productWriter && handleFormChange}
                name="productName"
              />
            </Grid>
            <hr />

            {userPoint ? <>
              <span style={{ marginRight: 50, fontSize: 20 }}>판매자 별점</span>
              <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                value={userPoint}
                readOnly
                fractions={5} precision={0.5} max={5} />({userPoint})
            </>
              : <h1>거래 이력이 없습니다.</h1>}
            <div style={{ marginTop: 30 }}>

              <ButtonGroup>
                {loginUser.userNickname === productWriter &&
                  <>
                    <Button onClick={handleProductBoardUpdate} style={{ marginRight: 90 }}>상품 수정</Button>
                    <Button style={{ marginRight: 90 }} onClick={handleProductBoardDelete} >상품 삭제</Button>
                  </>}
                {loginUser.userNickname !== productWriter &&
                  <Button style={{ marginRight: 90 }} onClick={() => setChatRoomList()}>채팅하기</Button>}
                <Button onClick={() => navigate('/productBoard/list')}>상품 목록으로</Button>
              </ButtonGroup>
            </div>

          </Form>
        </Card>
      </Row>
    </div>
  )
}

export default ProductBoardRead