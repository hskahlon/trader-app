import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";

const API_KEY = "5FCSO2LNUN72V90N";
const API_BASE_URL = "https://www.alphavantage.co/query";

function CurrentPrice({ quantity, ticker }) {
  const [currValue, setCurrValue] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${API_BASE_URL}`, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: ticker,
          apikey: API_KEY,
        },
      });
      setCurrValue(result.data["Global Quote"]["05. price"]);
    };
    getData();
  }, []);

  return <Typography>Current value: ${quantity * currValue}</Typography>;
}
export default CurrentPrice;
