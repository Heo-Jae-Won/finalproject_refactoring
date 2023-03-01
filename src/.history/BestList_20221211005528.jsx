import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Carousel.css"; 
import BestItem from './BestItem';



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

  function addClass(els, className){
    if(!Array.isArray(els)) throw new Error("addClass함수는 배열을 받습니다.")
    els.forEach(el=>el.classList.add(className));
  }
  
  try{
    const el=documnet.body;
    addClass(el, “opacity100”);
  }catch(e){
    console.error("에러가 잡혔네요")
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