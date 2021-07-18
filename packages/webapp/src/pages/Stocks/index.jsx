import React from "react";
import Example from "./components/portfolio_chart";
import Comments from "./components/Comments";

function Stocks() {
  return (
    <div className="App">
      <h1>This is the Stocks pages</h1>
      <h2>Currently the chart is working with supplied data</h2>
      <Example />
      <Comments />
    </div>
  );
}

export default Stocks;
