import { Rating } from "@mui/material";
import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Pagination from "react-js-pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { getReceivedReview } from "../../util/axios/my/review";
import { informServerError } from "../../util/swal/information";

/**
 * 받은 리뷰 목록 화면
 */
const MyReceiveReviewList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [review, setReview] = useState(["aaa"]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });

  const userNickname = search.receiver;
  const page = parseInt(search.page) || 1;

  const fetchReceivedReviewList = useCallback(async () => {
    setLoading(true);

    //받은 리뷰 보기
    const result = await getReceivedReview(page, userNickname)
      .then(() => {
        setReview(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
      })
      .catch(() => {
        informServerError();
      });
  }, [page, userNickname]);

  useEffect(() => {
    fetchReceivedReviewList();
  }, [fetchReceivedReviewList, page, userNickname]);

  if (loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "20rem", height: "20rem", marginTop: "220px" }}
      />
    );

  return (
    <div className="main">
      <Table striped className="mt-5">
        <thead>
          <tr>
            <th>후기내용</th>
            <th>보낸사람</th>
            <th>작성일자</th>
            <th>평점</th>
          </tr>
        </thead>
        <tbody>
          {review.map((review) => (
            <>
              <tr key={review.reviewCode}>
                <td>{review.reviewContent}</td>
                <td>{review.reviewSender}</td>
                <td>{review.reviewRegDate}</td>
                <td>
                  {" "}
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    value={review.reviewPoint}
                    readOnly
                    fractions={5}
                    precision={0.5}
                    max={5}
                  />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      {review.length !== 0 ? (
        <div style={{ marginLeft: 640 }}>
          <Pagination
            activePage={page}
            itemsCountPerPage={6}
            totalItemsCount={total}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e) =>
              navigate(`/my/review?receiver=${userNickname}&page=${e}`)
            }
          />
        </div>
      ) : (
        <div style={{ marginTop: 200 }}>
          <h1 style={{ fontSize: 60, color: "red", marginBottom: 170 }}>
            해당 검색 결과가 존재하지 않습니다.
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyReceiveReviewList;