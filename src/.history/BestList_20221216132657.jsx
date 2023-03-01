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

    //작업: 읽고자 하는 각각의 값을 위한 기본값을 정의한다.
	String exit_state="unknown";

    if (!hd.has_http_headers()) {
      counts["Http Response"]["unknown"]++;
      counts["Content-Type"]["unknow"]++;
      return;
    }

    HttpHeaders headers= hd.http_headers();

    //값이 있으면 HTTP 응답을 기록하고, 아니면 "unknown"을 기록한다.
    if(!headers.has_response_code()){
      counts["Http Response"]["unknown"]++;
    }else{
      String code=StringPrintf("%d", headers.response_code());
      counts["Http Response"][code]++;
    }

    //값이 있으면 Content-Type 값을 기록하고, 아니면 "unknown"을 기록한다.
    if(!headers.has_content_type()){
      counts["Content-Type"]["unknown"]++;
    }else{
      String content_type=ContentTYpeMine(headers.content_type());
      counts["Content-Type"][content_type]++;
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