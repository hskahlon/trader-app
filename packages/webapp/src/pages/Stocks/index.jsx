import React from "react";
import Comments from "./components/Comments";
import SearchChart from "./components/SearchChart"
function Stocks() {
  return (
    <div className="App">
      <h1> Stocks pages </h1>
      <SearchChart />

      <Comments />
    </div>
  );
}

export default Stocks;
