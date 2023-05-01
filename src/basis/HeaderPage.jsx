import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../model/user.store";

const HeaderPage = () => {
  const navigate = useNavigate();
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const deleteEverything=useUserStore((state)=>state.deleteEverything);
  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    navigate(href);
  };

  const handleLogoutClick = async (e) => {
    deleteEverything();
    navigate("/");
  };

  return (
    <div className="fixed">
      <Navbar
        className="fixed-top"
        bg="secondary"
        variant="dark"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand className="box13" onClick={handleClick} href="/">
            물론마켓
          </Navbar.Brand>
          <Nav className="me-auto" navbarScroll>
            <Nav.Link className="box13" onClick={handleClick} href="/about">
              회사소개
            </Nav.Link>
            <NavDropdown title="상품" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleClick} href="/productBoard/list">
                상품 목록
              </NavDropdown.Item>
              {loginUserNickname && (
                <NavDropdown.Item
                  onClick={handleClick}
                  href={`/productBoard/insert`}
                >
                  상품 등록
                </NavDropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link
              className="box13"
              href={`/notice/list`}
              onClick={handleClick}
            >
              공지사항
            </Nav.Link>
            <Nav.Link
              className="box13"
              href={`/event/list`}
              onClick={handleClick}
            >
              이벤트
            </Nav.Link>
          </Nav>
          <Nav>
            {loginUserNickname ? (
              <>
                <Nav.Link href={`/my/menu`} onClick={handleClick}>
                  {loginUserNickname}
                </Nav.Link>

                <Nav.Link onClick={handleLogoutClick}>로그아웃</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleClick} href="/login/form">
                로그인
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderPage;
