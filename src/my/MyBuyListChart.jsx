import qs from "qs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import { useLocation } from "react-router-dom";
import { getTradeBuyChart } from "../util/axios/my/trade";

const MyBuyListChart = () => {
  const location = useLocation();
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const buyer = search.buyer;
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

  const fetchTradeBuyChartData = useCallback(async () => {
    let result = await getTradeBuyChart(buyer);
    let array = toArrayTradeBuyChartData(result.data);
    setData(array);
  }, [buyer]);

  const toArrayTradeBuyChartData = (result) => {
    title.current = "2022 월별 구매 총액";
    chartType.current = "LineChart";

    let array = [];
    array.push(["월", "총액"]);
    result.forEach((item) => {
      array.push([item.month, item.payPrice]);
    });
    return array;
  };

  useEffect(() => {
    fetchTradeBuyChartData();
  }, [fetchTradeBuyChartData]);

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

export default MyBuyListChart;
