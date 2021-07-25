import React from "react";

class Stock extends React.Component {
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
    const API_KEY = "DXKIK94IXVCT2Q7Q";
    let Symbol = "TSLA";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Symbol}&outputsize=compact&apikey=${API_KEY}`;
    let calcChart_XVals = [];
    let calcChart_YVals = [];
    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var key in data["Time Series (Daily)"]) {
          calcChart_XVals.push(key);
          calcChart_YVals.push(data["Time Series (Daily)"][key]["1. open"]);
        }
        pointerToThis.setState({
          stockXvalues: calcChart_XVals,
          stockYvalues: calcChart_YVals,
        });
      });
  }
  render() {
    return (
      <div>
        <h1>Stonk Markets</h1>
      </div>
    );
  }
}
export default Stock;
