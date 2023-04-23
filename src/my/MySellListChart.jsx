import axios from "axios";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import { useLocation } from "react-router-dom";
import { getTradeSellChart } from "../util/axios/my";
import { useCallback } from "react";

const MySellListChart = () => {
  const search = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
  const seller = search.seller;
  const [data, setData] = useState("");
  const chartType = useRef("Bar");
  const title = useRef("직업별인원수");

  const options = {
    title: title.current,
    lineWidth: 4,
    curveType: "function",
    animation: {
      startup: true,
      duration: 1000,
      easing: "linear",
    },
    legend: {
      position: "right",
      alignment: "center",
      textStyle: { color: "black", fontSize: 20, bold: true },
    },
  };

  //fetch data from db + put it in state variable
  const fetchTradeSellChartData = useCallback(async () => {
    let result = await getTradeSellChart(seller);
    let array = toArrayTradeBuyChartData(result.data);
    setData(array);
  }, [seller]);

  const toArrayTradeBuyChartData = (result) => {
    title.current = "2022 월별 판매 총액";
    chartType.current = "LineChart";

    let array = [];
    array.push(["월", "총액"]);
    result.forEach((item) => {
      array.push([item.month, item.payPrice]);
    });
    return array;
  };

  useEffect(() => {
    fetchTradeSellChartData();
  }, [fetchTradeSellChartData]);

  return (
    <div style={{ marginTop: 100 }}>
      <Chart
        chartType={chartType.current}
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default MySellListChart;
