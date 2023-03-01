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



	@RequestMapping("/api/display")
	@ResponseBody
	public ResponseEntity<byte[]> display(String fileName)throws Exception{
		ResponseEntity<byte[]> image=null;
		File file=new File(fileName);
		HttpHeaders header=new HttpHeaders();
		header.add("Content-type", Files.probeContentType(file.toPath()));
		image=new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
		return image;
	}
	
	@RequestMapping(value="/api/download", method=RequestMethod.POST)
	@ResponseBody
	public void download(String image){
		try {
			String path="c:/image/naver/";
			int list = image.lastIndexOf("/");
			String fileName = image.substring(list + 1);
			File file=new File(path + fileName);
			if(file.exists()) return;
			
			URL url=new URL(image);
			InputStream in=url.openStream();
			OutputStream out=new FileOutputStream(path + fileName);
			FileCopyUtils.copy(in, out);
		} catch (Exception e) {
			System.out.println("error" + e.toString());
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