/* eslint-disable react/prop-types */
import React, { useState, useEffect, PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { getDailyChartForSymbol } from "../../../api/apiConnect";

// function formatStockData(stockData) {
//   // Convert stockData from an object to an array
//   return Object.entries(stockData).map((entries) => {
//     const [date, priceData] = entries;

//     return {
//       date,
//       open: Number(priceData["1. open"]),
//       high: Number(priceData["2. high"]),
//       low: Number(priceData["3. low"]),
//       close: Number(priceData["4. close"]),
//     };
//   });
// }
// Creating Data using Array
const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 1 + Math.random(),
  });
}

function CustomTooltip({ active, payload, label }) {
  // active if hovering over it
  // payload is the data being hovered over
  // label is x value
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>${payload[0].value.toFixed(2)} CAD</p>
      </div>
    );
  }
  return null;
}
// Returns only dates divisible by 7, and formats date
function formatDate() {
  return (str) => {
    const date = parseISO(str);
    if (date.getDate() % 7 === 0) {
      return format(date, "MMM, d");
    }
    return "";
  };
}
// Returns number formatted to 2 decimals
function formatNumber() {
  return (number) => `$${number.toFixed(2)}`;
}

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
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
            tickFormatter={formatDate()}
          />

          <YAxis
            // Y axis uses the value (price) as its key
            datakey="value"
            axisLine={false}
            tickLine={false}
            tickCount={6}
            tickFormatter={formatNumber()}
          />

          <Tooltip content={<CustomTooltip />} />
          {/* Cartesian grid is the lines on the graph */}
          <CartesianGrid opacity={0.3} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
