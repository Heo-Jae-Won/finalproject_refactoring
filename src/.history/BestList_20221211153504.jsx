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
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoPlaySpeed: 500,
    nextArrow: <img src='../image/nextbutton_80863.png' alt='빈 이미지' width={50} height={50} />,
    prevArrow: <img src='../image/backarrow1_80790.png' alt='빈 이미지' width={50} height={50} />
  };



  // 파일의 확장자가 jpg,png인지 확인
  String contentType = file.getContentType();
  if (contentType.contains("image/png") || contentType.contains("image/jpeg")) {
    System.out.println("성공");
  } else {
    throw new Exception("이미지 파일은 jpg,png만 가능합니다. ");
  }

  File newFile = new File(path + file.getOriginalFilename());
  try{

    if (!newFile.exists()) {
      FileOutputStream thumnail = new FileOutputStream(newFile);
        Thumbnailator.createThumbnail(file.getInputStream(), thumnail, 300, 300);
        thumnail.close();
      }
    
  }catch(FileIOException e){
    system.out.println("파일 IO 오류",e)
  }catch(Exception e){
  }finally{
    system.out.println("오류",e)
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