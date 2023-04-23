import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getPaymentId, payProduct } from '../util/axios/my/payment';
import { extractProductBoardRead } from '../util/axios/product.board';
import { confirmWriterReview } from '../util/swal/confirmation';
import { informFailedPayment, informServerError } from '../util/swal/information';
import { failPaymentVerification } from '../util/swal/service.exception';

const MyPay = () => {
  const { loginUser } = useContext(UserContext);
  const { productCode } = useParams();
  const navigate = useNavigate();
  const [productInfo, SetProductInfo] = useState({
    productWriter: '',
    productPrice: '',
    productName: ''
  });

  const handleDataExtract =useCallback( async () => {
    const result = await extractProductBoardRead(productCode).then(() => {
      SetProductInfo(result.data)
    })
  },[productCode]);

  const { productWriter, productPrice, productName } = productInfo;

  const handlePaymentClick = () => {
    const { IMP } = window;
    IMP.init('imp37385705'); // 결제 데이터 정의
    const data = {
      pg: 'html5_inicis', // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `pay_${new Date().getTime()}`, // 주문번호 (필수항목)
      name: productName, // 주문명 (필수항목)
      amount: productPrice, // 금액이고 반드시 숫자로 써야함. (필수항목)
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_name: loginUser.uname, // 구매자 이름
      buyer_tel: loginUser.userTel, // 구매자 전화번호 (필수항목)
      buyer_email: loginUser.userEmail, // 구매자 이메일
      buyer_addr: loginUser.userAddress,
    };
    IMP.request_pay(data, paymentCallback);
  }

  const paymentCallback = async (response) => {
    const { success, error_msg, imp_uid, merchant_uid, buyer_email, pay_method, paid_amount } = response;

    const result = await getPaymentId(imp_uid).then(() => {
      if (result.data.response.amount === paid_amount){
        console.log('검증 완료')
      }
      else{
        failPaymentVerification();
      }
    }).catch(() => {
      informServerError();
    })

    //pay done
    if (success) {
      const formData = new FormData();
      formData.append("payPrice", paid_amount);
      formData.append("paySeller", productWriter);
      formData.append("payBuyer", loginUser.userNickname);
      formData.append("payType", pay_method);
      formData.append("payEmail", buyer_email);
      formData.append("payCode", merchant_uid);
      formData.append("productCode", productCode);

      //pay + review insert
      await payProduct(formData).then(() => {
        confirmWriterReview().then(async (result) => {
          if (result.isConfirmed)
            navigate(`/my/review/insert/${merchant_uid}?seller=${productWriter}&buyer=${loginUser.userNickname}&productCode=${productCode}`)
          else if (result.isDismissed)
            navigate('/my/menu')
        })
      }).catch(() => {
        informServerError();
      })
    } else {
      informFailedPayment(error_msg);
    }
  }

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    handleDataExtract();
    return () => {
      document.head.removeChild(jquery); document.head.removeChild(iamport);
    }

  }, [handleDataExtract]);

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
        className='pay' onClick={handlePaymentClick}>결제하기</Button>
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