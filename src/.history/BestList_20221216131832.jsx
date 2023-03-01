import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Carousel.css";
import BestItem from './BestItem';
import { async } from '@firebase/util';
import { connect } from 'net';



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
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoPlaySpeed: 500,
    nextArrow: <img src='../image/nextbutton_80863.png' alt='빈 이미지' width={50} height={50} />,
    prevArrow: <img src='../image/backarrow1_80790.png' alt='빈 이미지' width={50} height={50} />
  };

void updateCounts(HttpDownload hd){

  //값이 있으면 State 값을 찾는다.
  if(!hd.has_event_log() || !hd.event_log().has_exit_state()){
    counts["Exit State"]["unknown"]++;
  }else{
    String state_str = ExitStateTypeName(hd.event_log().exit_state());
    counts["Exit State"][state_str]++;
  }

if(!hd.has_http_headers()){
  counts["Http Response"]["unknown"]++;
  counts["Content-Type"]["unknow"]++;
  return;
}

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