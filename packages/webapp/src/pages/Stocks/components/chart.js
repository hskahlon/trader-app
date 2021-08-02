import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiCall from "../../../api/apiConnect";
import axios from 'axios'
import { Button } from '@material-ui/core';
const API_BASE_URL = 'https://www.alphavantage.co/query'
const API_KEY = '5FCSO2LNUN72V90N';
export default function Chart({ getTicker, setName, closeModal }) {
  const [data, setData] = useState([]);
  const [chartTicker, setChartTicker] = useState(getTicker);
  const [stockName, getName] = useState(setName);
  const [finaldata, setFinalData] = useState([]);
  const [gotData, setGotData] = useState(false);
  // const finaldata = [];
  // const calcXvals = [];
  // const calcYvals = [];;
  useEffect(() => {
    const fetchData = () => {
      if (!gotData) {
        console.log("fetching data");
        fetch(apiCall(chartTicker, API_KEY))
          .then(function (response) {
            return response.json();
          })
          .then((data) => setData(data));
        console.log("finished fetching data");
        setGotData(true);
      }
    };
    fetchData();
  }, [chartTicker]);
  useEffect(() => {
    const calcXvals = [];
    const calcYvals = [];
    const chartData = [];
    const setChartData = () => {
      if (data.Note !== undefined) {
        alert("Too many API requests for Charts, Try Writing some comments and come back in 1 minute :)")
        window.location.reload(true)
      }
      if (gotData) {
        setGotData(false);
        for (const key in data["Time Series (Daily)"]) {
          calcXvals.push(key);
          calcYvals.push(data["Time Series (Daily)"][key]["4. close"]);
        }
        for (let i = calcXvals.length; i > 0; i--) {
          chartData.push({
            date: calcXvals[i],
            value: calcYvals[i],
          });
        }
        setFinalData(chartData);
        console.log("set final data");
        console.log("hi")
        console.log(data);
      }
    }
    setChartData();
  }, [data])

  // for (const key in data["Time Series (Daily)"]) {
  //   calcXvals.push(key);
  //   calcYvals.push(data["Time Series (Daily)"][key]["1. open"]);
  // }
  // for (let i = calcXvals.length; i > 0; i--) {
  //   finaldata.push({
  //     date: calcXvals[i],
  //     value: calcYvals[i],
  //   });
  // }

  // console.log("finaldata");
  // console.log(finaldata);
  // data = finaldata;
  return (
    <div className="App">
      <div className="Stock Title"><h1>{stockName} Chart</h1>
        <Button size="small" variant="outlined" color="secondary" style={{ width: "100%" }} onClick={() => window.location.reload(false) }> Close Chart </Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </div>
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={finaldata}>
        <defs>
          {/* Coloring */}
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            {/* Gradient from 0 to 100 */}
            <stop offset="0%" stopColor="#1dc447" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1dc447" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#004211" fill="url(#color)" />

        <XAxis
          // X axis uses the date as its key
          dataKey="date"
          axisLine={false}
          tickLine={false}
          // formatting date
          // tickFormatter={formatDate()}
        />

        <YAxis
          // Y axis uses the value (price) as its key
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={6}
          // tickFormatter={formatNumber()}
        />

        <Tooltip />
        {/* Cartesian grid is the lines on the graph */}
        <CartesianGrid opacity={0.3} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}
