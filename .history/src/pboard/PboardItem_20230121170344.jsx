import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList, callPlike }) => {
const navigate=useNavigate();
  const { pcode, ptitle, pcontent, pwriter, pimage, viewcnt, plike } = postList;
  const { loginUser } = useContext(UserContext);
  const [likeCliked, setLikeCliked] = useState(false);




  //plike on PboardItem + truth of user whether click like or not 
  const callLikeList = useCallback(async () => {
    const result = await axios.get(`/api/pboard/like/${loginUser.unickname}/${pcode}`)

    //initial state of plike = false
    setLikeCliked(result.data.lovecondition || false);
  }, [loginUser.unickname, pcode])

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    navigate(href);
  }

  //click like button 
  const onLoveClick = async () => {
    const formData = new FormData();
    formData.append('pcode', pcode);
    formData.append('unickname', loginUser.unickname);

    likeCliked === false ?
      await axios.post(`/api/pboard/like`, formData)
      :
      await axios.post(`/api/pboard/dislike`, formData);

    setLikeCliked(!likeCliked);
    callPlike();
  }


  
    



  useEffect(() => {
    callLikeList();
  }, [callLikeList, likeCliked])


  return (
    <>
      
        <Col md="auto" style={{ marginTop: 60 }}>

          <Card border='success' bg='light' style={{ width: '25rem', marginRight:40,height: 700, padding: 10 }}>
            <Card.Body style={{ marginBottom: 50 }}>
              <Card.Header style={{ fontSize: 20, height: 50 }}>
                <span style={{ float: 'left' }}>작성자: {pwriter}</span>
                <span style={{ float: 'right' }}>조회수: {viewcnt}</span>
              </Card.Header>
              <Card.Img src={pimage} height='300' />
              <Card.Title style={{ textAlign: 'left', marginTop: 22 }}>제목: {ptitle}</Card.Title>
              <hr />
              <Card.Text style={{ textAlign: 'left', marginTop: 22 }}>내용: {pcontent}</Card.Text>
            </Card.Body>
            <ButtonGroup>
              <Button className='btn-10' onClick={sessionStorage.getItem('uid') & onLoveClick} variant="primary">
                <img src={
                  likeCliked ? "../image/heart.png" : "../image/emptyheart.png"} width={15} alt="빈 이미지"/>
                &nbsp;&nbsp;{plike}
              </Button>

              <Button style={{ marginLeft: 100 }} variant='secondary'>
                <Nav.Link className='box' onClick={onClick} href={`/pboard/read/${pcode}`}>자세히보기</Nav.Link>
              </Button>
            </ButtonGroup>

          </Card>
        </Col>
      
    </>

  )
}

export default PboardItem