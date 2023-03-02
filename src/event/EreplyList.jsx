import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import { UserContext } from '../context/UserContext';
import '../Pagination.css';
import { deleteReply, getReplyList, insertReply } from '../util/axios/event';
import { swalError, swalQueryDelete, swalSuccessDelete } from '../util/swal/swal.basic.util';

const EreplyList = ({ ecode }) => {
  const { loginUser } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ercontent, setErcontent] = useState('');
  const num = 6;

  const fetchEreply = async () => {
    const result = await getReplyList(ecode, page, num);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  console.log(list);
  useEffect(() => {
    fetchEreply();
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

      await insertReply(data).then(() => {
        setPage(page);
        fetchEreply();
        setErcontent('');
      }).catch(() => {
        swalError();
      })

    }
  }

  const onDelete = async (ercode) => {

    swalQueryDelete().then(async (result) => {

      if (result.isConfirmed) {

        await deleteReply(ercode).then(() => {
          swalSuccessDelete();
          fetchEreply();
        }).catch(() => {
          swalError();
        })
      }
    })
  }

  const onPageChange = (e) => {
    setPage(e)
    window.scrollTo({
      top: 400,
      left: 150,
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
                {(reply.erwriter === loginUser.unickname) && (reply.admincondition !== 1 && reply.usercondition !== 1)
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
