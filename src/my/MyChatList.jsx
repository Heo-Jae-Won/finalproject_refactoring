import { addDoc, collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import qs from 'qs';
import { default as React, useCallback, useContext, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { app } from '../fireStore';
import MyChatItem from './MyChatItem';
import './MyChatList.css';
import './MyChatList.scss';
import { extractProductBoardRead } from '../util/axios/product.board';
import { confirmDelete, confirmLeave } from '../util/swal/confirmation';

const MyChatList = () => {
    const db = getFirestore(app);
    const location = useLocation();
    const navigate = useNavigate();
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [productCode, setProductCode] = useState(search.productCode || 'ab');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [chatId, setChatId] = useState('init');
    const [productBoardInfo, setProductBoardInfo] = useState({});
    const { loginUser } = useContext(UserContext);

    const fetchRoomList = useCallback( async () => {
        const q = query(
            collection(db, `chatroom`),
            where('who', 'array-contains', sessionStorage.getItem('uid')),
            limit(100)
        );

        //chatroom fetch
        onSnapshot(q, (snapshot) => {

            snapshot.forEach(async (doc) => {
                const li = document.createElement('li');

                li.className = 'list-group-item non-click';

                li.innerHTML = `
                <h6>
                ${sessionStorage.getItem('uid') === doc.data().who[0] ?
                        '판매자ㅡ'
                        :
                        '구매자ㅡ'}
                        ${sessionStorage.getItem('uid') === doc.data().who[0] ?
                        doc.data().who[1]
                        :
                        doc.data().who[0]}</h6>
                        <div class='text-small'>${doc.id}</div>
                        <p class='text-small1'>${doc.data().productCode}</p>
                        <img src=${JSON.stringify(doc.data().productImage)} width=70 height=70/>
                `;


                //same chatId onclick ㅡ> duplicate x
                if (chatId.includes('init')) {
                    document.getElementsByClassName('list-group chat-list')[0].append(li);
                }
            });



            for (let i = 0; i < document.getElementsByClassName('list-group-item non-click').length; ++i) {
                document.getElementsByClassName('list-group-item non-click')[i].addEventListener("click", function () {
                    setChatId(document.getElementsByClassName("text-small")[i].innerHTML)
                    setProductCode(document.getElementsByClassName("text-small1")[i].innerHTML)
                })
            }
        (async () => {
                const result = await extractProductBoardRead(productCode);
                setProductBoardInfo(result.data);
            })();

        });

    },[chatId,db,productCode]);







    const nonClick = document.querySelectorAll(".non-click");

    const onClick = async (e) => {

        if (e.target.tagName === 'LI' || e.target.tagName === "H6" || e.target.tagName === "IMG") {
            // dom 요소에서 모든 "click" 클래스 제거
            nonClick.forEach((e) => {
                e.classList.remove("click");
            });
            // 클릭한 dom의 최상위요소만 "click"클래스 추가.
            e.currentTarget.classList.add("click");
        }

    }

    nonClick.forEach((e) => {
        e.addEventListener("click", onClick);
    });



    //Doc element를 최초 생성
    const sendMessage = async (e) => {

        if (e.keyCode === 13) {

            if (e.ctrlKey) {
                let val = e.target.value;
                let start = e.target.selectionStart;
                let end = e.target.selectionEnd;
                e.target.value = val.substring(0, start) + "\n" + val.substring(end);
                setMessage(e.target.value);
                return false; //  pre focus
            }

            if (!message) {
                alert('메시지를 입력하세요')
                return;
            }



            const docRef = doc(db, 'chatRoom', `${chatId}`);
            const colRef = collection(docRef, 'messageList')
            await addDoc(colRef, {
                text: message,
                date: new Date().getTime(),
                userId: sessionStorage.getItem('uid'),
                userNickname: loginUser.userNickname,
                userProfile: loginUser.userProfile
            });
            setMessage('');
            window.scrollTo({
                top: 200,
                left: 150,
                behavior: 'smooth'
            })
        }
    }

    const fetchMessageList = useCallback(() => {

        const q = query(
            collection(db, `chatRoom/${chatId}/messageList`),
            orderBy('date', 'asc'),
            limit(100)
        );

        onSnapshot(q, (snapshot) => {
            let rows = [];
            snapshot.forEach((doc) => {
                rows.push({
                    id: doc.id,
                    userId: doc.data().uid,
                    text: doc.data().text,
                    date: doc.data().date,
                    userNickname: doc.data().userNickname,
                    userProfile: doc.data().userProfile
                });
            });
            setMessageList(rows);
        });
    },[chatId,db])

    const handleMessageDelete = async (id) => {
        confirmDelete().then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, `chatRoom/${chatId}/messageList`, id));
            }
        })
    }

    const handleChatRoomDelete = (id) => {
        confirmLeave().then(async (result) => {
            if (result.isConfirmed) {

                //hack : if no use of setTimeout during chatRoom exit, chatRooms duplication happen
                setTimeout(() => deleteDoc(doc(db, `chatRoom`, id)), 1000);
                document.getElementsByClassName('list-group-item non-click click')[0].remove();
                navigate('/productBoard/list')
            }
        })
    }

    useEffect(() => {
        fetchRoomList();
        fetchMessageList();
    }, [chatId, fetchMessageList, fetchRoomList]);



    return (
        <li className="container" style={{ marginTop: 100 }}>
            <li className="row" style={{ margin: '150px 0px' }}>

                <li className="col-3 p-0">

                    <ul className="list-group chat-list">
                    </ul>

                </li>
                <li className="col-9 p-0">

                    {chatId.length > 5 && <li className="chat-room">
                        <div className="wrap">
                            {messageList?.map(message =>
                                <div className={message.uid === sessionStorage.uid ? 'chat ch2' : 'chat ch1'}>
                                    <MyChatItem key={message.id}
                                        message={message}
                                        handleMessageDelete={handleMessageDelete} />
                                </div>
                            )}
                        </div>

                        <Row className="mt-5 justify-content-center">
                            <Form className="d-flex my-3" style={{ width: '52rem' }}>
                                <Form.Control
                                    as="textarea"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={sendMessage}
                                    placeholder='enter를 누르세요' className="mx-2" />

                            </Form>
                            <div>
                                {((sessionStorage.getItem('userId') !== productBoardInfo.userId) && (productBoardInfo.productStatus === 0)) &&
                                    <Button Button onClick={() => navigate(`/my/pay/${productCode}`)}>결제창 이동</Button>}
                                <Button style={{ marginLeft: 80 }} onClick={() => navigate(-1)}>뒤로가기</Button>
                                <Button style={{ marginLeft: 80 }} onClick={() => handleChatRoomDelete(chatId)}>채팅방 나가기</Button>
                            </div>
                        </Row>
                    </li>}
                </li>
            </li>

        </li >
    )
}

export default MyChatList