import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import { swalErrorPayment, swalErrorVerification, swalQueryReviewWrite } from '../util/swal/swal.my.util';
import { swalError } from '../util/swal/swal.basic.util';
import { extractPboardRead } from '../util/axios/pboard';
import { getPaymentId, onPayment } from '../util/axios/my';

const MyPay = () => {
  const { loginUser } = useContext(UserContext);
  const { pcode } = useParams();
  const navigate = useNavigate();
  const [productInfo, SetProductInfo] = useState({
    pwriter: '',
    pprice: '',
    pname: ''
  });

  const extractReadData = async () => {
    const result = await extractPboardRead(pcode).then(() => {
      SetProductInfo(result.data)
    })

  }

  const { pwriter, pprice, pname } = productInfo;

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp37385705'); // 결제 데이터 정의
    const data = {
      pg: 'html5_inicis', // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `pay_${new Date().getTime()}`, // 주문번호 (필수항목)
      name: pname, // 주문명 (필수항목)
      amount: pprice, // 금액이고 반드시 숫자로 써야함. (필수항목)
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_name: loginUser.uname, // 구매자 이름
      buyer_tel: loginUser.utel, // 구매자 전화번호 (필수항목)
      buyer_email: loginUser.uemail, // 구매자 이메일
      buyer_addr: loginUser.uaddress,
    };
    IMP.request_pay(data, paymentCallback);
  }

  const paymentCallback = async (response) => {
    const { success, error_msg, imp_uid, merchant_uid, buyer_email, pay_method, paid_amount } = response;

    const result = await getPaymentId(imp_uid).then(() => {
      if (result.data.response.amount === paid_amount)
        console.log('검증 완료')
      else
        swalErrorVerification();
    }).catch(() => {
      swalError();
    })

    //pay done
    if (success) {
      const formData = new FormData();
      formData.append("payprice", paid_amount);
      formData.append("seller", pwriter);
      formData.append("buyer", loginUser.unickname);
      formData.append("paytype", pay_method);
      formData.append("payemail", buyer_email);
      formData.append("paycode", merchant_uid);
      formData.append("pcode", pcode);

      //pay + review insert
      await onPayment(formData).then(() => {
        swalQueryReviewWrite().then(async (result) => {
          if (result.isConfirmed)
            navigate(`/my/review/insert/${merchant_uid}?seller=${pwriter}&buyer=${loginUser.unickname}&pcode=${pcode}`)
          else if (result.isDismissed)
            navigate('/my/menu')
        })
      }).catch(() => {
        swalError();
      })
    } else {
      swalErrorPayment(error_msg);
    }
  }

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    extractReadData();
    return () => {
      document.head.removeChild(jquery); document.head.removeChild(iamport);
    }

  }, []);

  return (
    <div className='pay'>
      <div className='img23'>
        <img
          size='10px'
          className="d-block w-100"
          src="/image/image23.jpg"
          alt="빈 이미지"
        />
      </div>
      <div className='img21'>
        <img
          size='10px'
          className="d-block w-100"
          src="/image/img21.jpg"
          alt="빈 이미지"
        />
      </div>

      <Button variant="warning" style={{ width: '200px', height: '100px' }}
        className='pay' onClick={onClickPayment}>결제하기</Button>
      <div className='animate__animated animate__fadeInUp'>
        <img
          size='10px'
          className="d-block w-100"
          src="/image/image24.jpg"
          alt="빈 이미지"
        />
      </div>


    </div>
  );
}

export default MyPay;