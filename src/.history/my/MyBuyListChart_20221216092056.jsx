import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Chart from 'react-google-charts';
import qs from 'qs';



const MyBuyListChart = ({location}) => {
    
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const buyer = search.buyer;
    const [data, setData] = useState('');
    const chartType = useRef('Bar');
    const title = useRef('직업별인원수');

    const options = {
        title: title.current,
        lineWidth: 4,
        curveType: "function",
        animation: { 
            startup: true,
            duration: 1000,
            easing: 'linear'
        },
        legend : {position: 'right', alignment :'center', textStyle: {color: 'black', fontSize: 20,bold:true}},
        
    };

    const extractData = async () => {
        //fetch data from db + put it in state variable
        let result = await axios.get(`/api/tradeinfo/buy/chart?buyer=${buyer}`);
        let array = chageData(result.data);
        setData(array);
    }

    const chageData = (result) => {
        title.current = '2022 월별 구매 총액';
        chartType.current = 'LineChart';

        let array = [];
        array.push(['월', '총액']);
        result.forEach(item => {
            array.push([item.month, item.payprice]);
        });
        return array;
    }

    useEffect(() => {
        extractData();
    }, [])

    return (
        <div style={{ marginTop: 100 }}>
             <Chart
                chartType={chartType.current}
                width="100%"
                height="400px"
                data={data}
                options={options} /> 
                
        </div>
    )
}

export default MyBuyListChart