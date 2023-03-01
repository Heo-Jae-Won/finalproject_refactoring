import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Carousel.css"; 
import BestItem from './BestItem';
import { async } from '@firebase/util';



const BestList = () => {

  const [bestList, setBestList] = useState([]);

  //fetch 8 most liked item 
  const callAPI = async () => {
    const result = await axios.get(`/api/pboard/best`);
    setBestList(result.data);
  }


  useEffect(() => {
    callAPI();
  }, [])


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:4,
    slidesToScroll:4,
     autoplay: true,
    autoPlaySpeed: 500, 
    nextArrow: <img src='../image/nextbutton_80863.png' alt='빈 이미지' width={50} height={50} />,
    prevArrow: <img src='../image/backarrow1_80790.png' alt='빈 이미지' width={50} height={50} />
  };

  
async function bar(URL){
  const res=await axios.get(URL,{
    validateStatus: function (status) {
      // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
      return status < 500;
    }
  })

}
  

  if (!bestList) return <h1>로딩중</h1>

  return (
    <Slider {...settings}>
      {bestList.map(bestList =>
        <BestItem key={bestList.pcode} bestList={bestList} />
      )}
    </Slider>
    




  )
}

export default BestList