/* eslint-disable react/prop-types */
import React, { useState, useEffect, PureComponent, Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiCall from "../api/apiConnect";

const Symbol = "TSLA";
const API_CALL = apiCall(Symbol);

export default function ChartTest() {
  let [data, setData] = useState([]);
  const finaldata = [];
  const calcXvals = [];
  const calcYvals = [];
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    console.log("fetching data");
    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then((data) => setData(data));
    console.log("finished fetching data");
  };
  for (const key in data["Time Series (Daily)"]) {
    calcXvals.push(key);
    calcYvals.push(data["Time Series (Daily)"][key]["1. open"]);
  }
  for (let i = calcXvals.length; i > 0; i--) {
    finaldata.push({
      date: calcXvals[i],
      value: calcYvals[i],
    });
  }

  console.log("finaldata");
  console.log(finaldata);
  data = finaldata;
  return (
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
  );
}
