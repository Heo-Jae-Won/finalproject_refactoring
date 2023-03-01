import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import { UserContext } from '../context/UserContext';
import '../Pagination.css';
import Swal from 'sweetalert2'

const EreplyList = ({ ecode }) => {
  const { loginUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ercontent, setErcontent] = useState('');
  const num = 6;

  const callEreply = async () => {
    const result = await axios.get(`/api/ereply/list?ecode=${ecode}&page=${page}&num=${num}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  console.log(list);
  useEffect(() => {
    callEreply();
    
  }, [page]);

  const onInsert = async (e) => {

    if (e.keyCode === 13) {
      if (ercontent === '') {
        alert('내용을 입력해 주세요!');
        return;
      }

      //ctrl enter 
      if (e.ctrlKey) {
        let val = e.target.value;
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        e.target.value = val.substring(0, start) + "\n" + val.substring(end);
        setErcontent(e.target.value);
        return false; 
      }
      const data = {
        ecode: ecode,
        erwriter: loginUser.unickname,
        ercontent: ercontent
      };
      await axios.post('/api/ereply/insert', data);
      setPage(page);
      callEreply();
      setErcontent('');
    }
  }

  const onDelete = async (ercode) => {

    Swal.fire({
      text: "정말로 삭제하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {
          await axios.patch(`/api/ereply/${ercode}`)
          Swal.fire({
            text: "댓글이 삭제되었습니다",
            icon: 'success',
            confirmButtonColor: '#3085d6',
          })
          callEreply();
        } catch (e) {
          Swal.fire({
            text: "예상치 못한 오류가 발생하였습니다.",
            icon: 'error',
            confirmButtonColor: '#3085d6',
          })
        }

      }
    })
  }

  const onPageChange=(e)=>{
    setPage(e)
    window.scrollTo({
        top:400,
        left:150,
        behavior: 'smooth'
    })
}


  if (!list) return <h1>Loading......</h1>

  return (
    <div>
      {sessionStorage.getItem('uid') &&
        <Form >
          <Form.Label classNameName='d-flex justify-content-left' style={{ fontSize: 20 }}>
            댓글 입력
          </Form.Label>
          <Form.Control
            as="textarea"
            className='ereply_content'
            value={ercontent}
            onKeyDown={onInsert}
            onChange={(e) => setErcontent(e.target.value)}
            placeholder='내용을 입력하세요...' />
        </Form>}

      <hr />
      {list?.map(reply =>
        <div className='u_cbox_comment_box u_cbox_type_profile' key={reply.ercode}>
          <div className='u_cbox_area'>
            <div className='u_cbox_info'>
              <span>
                작성자- {reply.erwriter}
              </span>
            </div>
            <div className='u_cbox_text_wrap'>
              <span className='u_cbox_contents'>
                {reply.ercontent}
              </span>
            </div>
            <div className='u_cbox_info_base'>
              <span className='u_cbox_date'>
                {reply.regDate}
              </span>
              <span className='u_cbox_recomm_set'>
                {(reply.erwriter === loginUser.unickname) && (reply.admincondition!==1 && reply.usercondition!==1)
                 ?
                <Button onClick={() => onDelete(reply.ercode)}>삭제</Button>
              :
              null}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginLeft: 440 }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={num}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => onPageChange(e)} />
      </div>
    </div>
  )
}

export default EreplyList
