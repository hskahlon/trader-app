import React from "react";
import SelectStock from "./components/selectStock";
import ChartTest from "./components/chart";
import Comments from "./components/Comments";

function Stocks() {
  return (
    <div className="App">
      <h1>This is the Stocks pages</h1>
      <h2 id="Stock">TSLA Stock Chart</h2>
      {/* <SelectStock></SelectStock> */}
      <ChartTest />
      {/* <Example></Example> */}
      <h2>Currently the chart is working with Api Data</h2>
      <Comments />
    </div>
  );
}

export default Stocks;
