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
// formating date
import { format, parseISO, subDays } from "date-fns";
import { getDailyChartForSymbol } from "../../../api/apiConnect";

// Creating Data using Array

const finaldata = [];
export function getData() {
  return 1;
}
function CustomTooltip({ active, payload, label }) {
  // active if hovering over it
  // payload is the data being hovered over
  // label is x value
  if (active) {
    return (
      <div className="tooltip">
        <h4>label</h4>
        {/* <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4> */}
        {/* <p>${payload[0].value.toFixed(2)} CAD</p> */}
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
  constructor(props) {
    super(props);
    this.state = {
      stockXvalues: [],
      stockYvalues: [],
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const API_KEY = "5FCSO2LNUN72V90N";
    const Symbol = document.getElementById("Stock").innerHTML;
    const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Symbol}&outputsize=compact&apikey=${API_KEY}`;
    const calcChartXVals = [];
    const calcChartYVals = [];
    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data["Time Series (Daily)"]["2021-02-24"]);
        // console.log(new Date("2021-02-24").toISOString());
        for (const key in data["Time Series (Daily)"]) {
          finaldata.push({
            date: calcChart_XVals.push(new Date(key).toISOString()),
            value: data["Time Series (Daily)"][key]["1. open"],
          });
        }
        pointerToThis.setState({
          stockXvalues: calcChartXVals,
          stockYvalues: calcChartYVals,
        });
      });
  }

  render() {
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
