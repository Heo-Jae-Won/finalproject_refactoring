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









  -	let page = 1;
  -	  getList();
  -	  
  -	   function getList() {
  -	       var key = $(frm.key).val();
  -	       var word = $(frm.word).val();
  -	       var per = $(frm.per).val();
  -	       var order = $(frm.order).val();
  -	       var desc = $(frm.desc).val();
  -	       $.ajax({
  -	             type : "get",
  -	             url : "/stu/list.json",
  -	             dataType : "json",
  -	             data : {
  -	               key : key,
  -	               word : word,
  -	               per : per,
  -	               order : order,
  -	               desc : desc,
  -	               page : page
  -	             },
  -	           }).done(
  -	               function(data) {
  -	                 var temp = Handlebars.compile($("#temp").html());
  -	                 $("#tbl").html(temp(data));
  -	                 $("#total").html(data.total);
  -	   
  -	                 if (data.total == 0) {
  -	                   $("#tbl")
  -	                       .append(
  -	                           "<tr><td colspan=6 class='none'>검색된 자료가 없습니다!</td></tr>");
  -	                   $(".buttons").hide();
  -	                 } else {
  -	                   $("#page").html(page + "/" + data.last);
  -	   
  -	                   page == 1 ? $("#prev").attr("disabled", true)
  -	                       : $("#prev").attr("disabled", false);
  -	                   page == data.last ? $("#next").attr("disabled",
  -	                       true) : $("#next").attr("disabled",
  -	                       false);
  -	                   $(".buttons").show();
  -	                 }
  -	               })
  -	     };
  
  
  













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