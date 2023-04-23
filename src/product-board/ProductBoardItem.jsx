import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getProductBoardLikeUser, onDislikeClicked } from '../util/axios/product.board';

const ProductBoardItem = ({ postList, fetchProductLikeCnt }) => {
  const navigate = useNavigate();
  const { productCode, productTitle, productContent, productWriter, productImage, productViewcnt, productLikeCnt } = postList;
  const { loginUser } = useContext(UserContext);
  const [isClickedLike, setIsClickedLike] = useState(false);

  //productLikeCnt on productBoardItem + truth of user whether click like or not 
  const fetchLikeList = useCallback(async () => {
    const result = await getProductBoardLikeUser(productCode, loginUser.userNickname)

    //initial state of productLikeCnt = false
    setIsClickedLike(result.data.likeStatus || false);
  }, [loginUser.userNickname, productCode])

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    navigate(href);
  }

  //click like button 
  const handleLikeClick = async () => {

    const data = {
      productCode,
      userNickname: loginUser.userNickname
    }

    isClickedLike === false ?
      await onDislikeClicked(data)
      :
      await onDislikeClicked(data);

    setIsClickedLike(!isClickedLike);
    fetchProductLikeCnt();
  }







  useEffect(() => {
    fetchLikeList();
  }, [fetchLikeList, isClickedLike])


  return (
    <>

      <Col md="auto" style={{ marginTop: 60 }}>

        <Card border='success' bg='light' style={{ width: '25rem', marginRight: 40, height: 700, padding: 10 }}>
          <Card.Body style={{ marginBottom: 50 }}>
            <Card.Header style={{ fontSize: 20, height: 50 }}>
              <span style={{ float: 'left' }}>작성자: {productWriter}</span>
              <span style={{ float: 'right' }}>조회수: {productViewcnt}</span>
            </Card.Header>
            <Card.Img src={productImage} height='300' />
            <Card.Title style={{ textAlign: 'left', marginTop: 22 }}>제목: {productTitle}</Card.Title>
            <hr />
            <Card.Text style={{ textAlign: 'left', marginTop: 22 }}>내용: {productContent}</Card.Text>
          </Card.Body>
          <ButtonGroup>
            <Button className='btn-10' onClick={sessionStorage.getItem('uid') && handleLikeClick} variant="primary">
              <img src={
                isClickedLike ? "../image/heart.png" : "../image/emptyheart.png"} width={15} alt="빈 이미지" />
              &nbsp;&nbsp;{productLikeCnt}
            </Button>

            <Button style={{ marginLeft: 100 }} variant='secondary'>
              <Nav.Link className='box' onClick={onClick} href={`/productBoard/read/${productCode}`}>자세히보기</Nav.Link>
            </Button>
          </ButtonGroup>

        </Card>
      </Col>

    </>

  )
}

export default ProductBoardItem