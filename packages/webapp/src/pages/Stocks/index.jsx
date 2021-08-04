import React from "react";
import Comments from "./components/Comments";
import SearchChart from "./components/SearchChart"
import Typography from '@material-ui/core/Typography';
function Stocks() {
  return (
    <div className="App">
      <br></br>
      <Typography variant="h2" align="center">
        Charts Page
      </Typography>
      <SearchChart />

      <Comments />
    </div>
  );
}

export default Stocks;
