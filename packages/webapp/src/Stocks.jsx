import React from "react";
import Example from "./portfolio_chart";
import SelectStock from "./components/selectStock";
import ChartTest from "./components/chart";
function Stocks() {
  return (
    <div className="App">
      <h1>This is the Stocks pages</h1>
      <h2 id="Stock">TSLA</h2>
      <SelectStock></SelectStock>
      <ChartTest />
      {/* <Example></Example> */}
    </div>
  );
}

export default Stocks;
