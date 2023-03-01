import React from 'react';
import { Button } from 'react-bootstrap';

const MyChatItem = ({ message, onDeleteMessage }) => {
    const { text, date, uid, id, unickname, uprofile } = message;



    return (
        <>
            <div>
                <p style={{ fontSize: 20 }}>
                    {unickname}</p>

                <img className='icon' src={uprofile}     alt="빈 이미지" />

                <span className='chat_span'>{JSON.stringify(new Intl.DateTimeFormat('kr', { dateStyle: 'short', timeStyle: 'short' })
                    .format(date))}</span>
            </div>
            <div className="textbox">
                <p style={{ textAlign: 'left' }}>
                    {text}
                </p>
                {uid === sessionStorage.getItem('uid') && <Button className='mt-3' onClick={() => onDeleteMessage(id)}>삭제</Button>}
            </div>

        </>


    )
}

export default MyChatItem