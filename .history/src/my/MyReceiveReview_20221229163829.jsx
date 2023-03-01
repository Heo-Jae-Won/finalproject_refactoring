import { Rating } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-js-pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Pagination.css';

const MyReceiveReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [review, setReview] = useState(['aaa']);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });



  const unickname = search.receiver
  const page = parseInt(search.page) || 1;

  const callReceivewReview = async () => {
    const cancelToken = axios.CancelToken.source();

    setLoading(true);
    try {
      const result = await axios.get(`/api/review?page=${page}&num=6&receiver=${unickname}`, {
        cancelToken: cancelToken.token
      })
      setReview(result.data.list);
      setTotal(result.data.total);
      setLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Cancelled!')
      }
    }

    return () => {
      cancelToken.cancel();
    }
  };

  console.log(review);


  useEffect(() => {
    callReceivewReview();

  }, [page, unickname]);

  if (loading) return (
    <Spinner animation="border" variant="primary"
      style={{ width: '20rem', height: '20rem', marginTop: '220px' }} />
  )

  return (
    <div className='main'>
      <Table striped className='mt-5'>
        <thead>
          <tr >
            <th>후기내용</th>
            <th>보낸사람</th>
            <th>작성일자</th>
            <th>평점</th>

          </tr>
        </thead>
        <tbody>
          {review.map(review =>
            <>
              <tr key={review.rvcode}>
                <td>{review.rvcontent}</td>
                <td>{review.sender}</td>
                <td>{review.regDate}</td>
                <td>  <Rating
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  value={review.point}
                  readOnly
                  fractions={5} precision={0.5} max={5} /></td>
              </tr>

            </>
          )}
        </tbody>
      </Table>


      {review.length !== 0 ? <div style={{ marginLeft: 640 }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={6}
          totalItemsCount={total}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => navigate(`/my/review?receiver=${unickname}&page=${e}`)}
        />
      </div>
        : <div style={{ marginTop: 200 }}>
          <h1 style={{ fontSize: 60, color: 'red', marginBottom: 170 }}>해당 검색 결과가 존재하지 않습니다.</h1>
        </div>}
    </div>

  )
}

export default MyReceiveReview