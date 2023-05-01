import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "react-js-pagination";
import "../Pagination.css";
import { useUserStore } from "../model/user.store";
import { deleteReply, getReplyList, insertReply } from "../util/axios/event";
import { confirmDelete } from "../util/swal/confirmation";
import { informServerError, informSuccess } from "../util/swal/information";

const EventReplyList = ({ eventCode }) => {
  const [eventReplyList, setEventReplyList] = useState([]);
  const [page, setPage] = useState(1);
  const [eventReplyTotal, setEventReplyTotal] = useState(0);
  const [eventReplyContent, setEventReplyContent] = useState("");
  const num = 6;
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const fetchEventReplyList = useCallback(async () => {
    const result = await getReplyList(eventCode, page, num);
    setEventReplyList(result.data.eventReplyList);
    setEventReplyTotal(result.data.eventReplyTotal);
  }, [eventCode, page]);

  useEffect(() => {
    fetchEventReplyList();
  }, [fetchEventReplyList, page]);

  const handleReplyInsert = async (e) => {
    if (e.keyCode === 13) {
      if (!eventReplyContent) {
        alert("내용을 입력해 주세요!");
        return;
      }

      //ctrl enter
      if (e.ctrlKey) {
        let val = e.target.value;
        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        e.target.value = val.substring(0, start) + "\n" + val.substring(end);
        setEventReplyContent(e.target.value);
        return false;
      }

      const data = {
        eventCode,
        eventReplyWriter: loginUserNickname,
        eventReplyContent,
      };

      await insertReply(data)
        .then(() => {
          setPage(page);
          fetchEventReplyList();
          setEventReplyContent("");
        })
        .catch(() => {
          informServerError();
        });
    }
  };

  const handleReplyDelete = async (eventReplyCode) => {
    confirmDelete().then(async (result) => {
      if (result.isConfirmed) {
        await deleteReply(eventReplyCode)
          .then(() => {
            informSuccess();
            fetchEventReplyList();
          })
          .catch(() => {
            informServerError();
          });
      }
    });
  };

  const handlePageChange = (e) => {
    setPage(e);
    window.scrollTo({
      top: 400,
      left: 150,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {loginUserNickname && (
        <Form>
          <Form.Label
            classNameName="d-flex justify-content-left"
            style={{ fontSize: 20 }}
          >
            댓글 입력
          </Form.Label>
          <Form.Control
            as="textarea"
            className="ereply_content"
            value={eventReplyContent}
            onKeyDown={handleReplyInsert}
            onChange={(e) => setEventReplyContent(e.target.value)}
            placeholder="내용을 입력하세요..."
          />
        </Form>
      )}

      <hr />
      {eventReplyList?.map((reply) => (
        <div
          className="u_cbox_comment_box u_cbox_type_profile"
          key={reply.eventReplyCode}
        >
          <div className="u_cbox_area">
            <div className="u_cbox_info">
              <span>작성자- {reply.eventReplyWriter}</span>
            </div>
            <div className="u_cbox_text_wrap">
              <span className="u_cbox_contents">{reply.eventReplyContent}</span>
            </div>
            <div className="u_cbox_info_base">
              <span className="u_cbox_date">{reply.regDate}</span>
              <span className="u_cbox_recomm_set">
                {reply.eventReplyWriter === loginUserNickname &&
                reply.adminDeleted !== 1 &&
                reply.userDeleted !== 1 ? (
                  <Button
                    onClick={() => handleReplyDelete(reply.eventReplyCode)}
                  >
                    삭제
                  </Button>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginLeft: 440 }}>
        <Pagination
          activePage={page}
          itemsCountPerPage={num}
          totalItemsCount={eventReplyTotal}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e) => handlePageChange(e)}
        />
      </div>
    </div>
  );
};

export default EventReplyList;
