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


  if (!bestList) return <h1>로딩중</h1>

  return (
    <Slider {...settings}>
      {bestList.map(bestList =>
        <BestItem key={bestList.pcode} bestList={bestList} />
      )}
    </Slider>
    
 <tr>
 <td width=100>교수번호</td>
 <td width=100><input type=text name=pcode value="${provo.pcode}"
   readonly></td>
 <td width=100>교수이름</td>
 <td width=100><input type=text name=pname value="${provo.pname}"></td>

 <td width=100>교수학과</td>
 <td width=100><select name=dept>
     <option value=전산
       <c:out value="${provo.dept=='전산' ? 'selected' : ''}"/>>
       컴퓨터정보공학과</option>
     <option value=전자
       <c:out value="${provo.dept=='전자' ? 'selected' : ''}"/>>
       전자공학과</option>
     <option value=건축
       <c:out value="${provo.dept=='건축' ? 'selected' : ''}"/>>
       건축토목공학과</option>
 </select></td>
</tr>



  )
}

export default BestList