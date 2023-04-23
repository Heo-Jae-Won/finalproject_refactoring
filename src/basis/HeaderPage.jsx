import React, { useContext, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getUserInfo } from '../util/axios/basis';
import { useCallback } from 'react';

const HeaderPage = () => {
  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useContext(UserContext);
  const userId = sessionStorage.getItem('userId');

  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    navigate(href);
  }

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem('userId');
    navigate('/')
  }


const fetchUserInfo = useCallback( async () => {
    const result = await getUserInfo(userId);
    console.log(result.data);
    setLoginUser(result.data);
  },[userId,setLoginUser]);


  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null)
      fetchUserInfo();
  }, [fetchUserInfo, userId]);


  return (
    <div className='fixed'>
      <Navbar className='fixed-top' bg='secondary' variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand className='box13' onClick={handleClick} href="/">물론마켓</Navbar.Brand>
          <Nav className="me-auto"
            navbarScroll>
            <Nav.Link className='box13' onClick={handleClick} href="/about">회사소개</Nav.Link>
            <NavDropdown title="상품" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleClick} href="/productBoard/list">상품 목록</NavDropdown.Item>
              {sessionStorage.getItem('userId') &&
                <NavDropdown.Item onClick={handleClick} href={`/productBoard/insert/${loginUser.userNickname}`}>상품 등록</NavDropdown.Item>

              }
            </NavDropdown>

            <Nav.Link className='box13' href={`/notice/list`} onClick={handleClick}>
              공지사항
            </Nav.Link>
            <Nav.Link className='box13' href={`/event/list`} onClick={handleClick}>
              이벤트
            </Nav.Link>
          </Nav>
          <Nav>

            {sessionStorage.getItem('userId') ?
              <>
                <Nav.Link href={`/my/menu`} onClick={handleClick}>
                  {loginUser.userNickname}
                </Nav.Link>

                <Nav.Link onClick={handleLogoutClick}>
                  로그아웃
                </Nav.Link>
              </> :
              <Nav.Link onClick={handleClick} href='/login/form'>로그인</Nav.Link>
            }

          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default HeaderPage