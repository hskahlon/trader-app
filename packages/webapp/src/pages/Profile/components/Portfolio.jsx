/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CurrentPrice from "./CurrentPrice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  typography: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const API_KEY = "5FCSO2LNUN72V90N";
const API_BASE_URL = "https://www.alphavantage.co/query";

function Profolio({ setTotalCurrValue, setTotalSpent, setTotalProfit }) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [stockArr, setStock] = useState(null);

  useEffect(() => {
    const getStocks = async () => {
      const res = await axios.post("http://localhost:5000/user/info", {
        email: user?.result.email,
      });
      console.log(res.data);
      setTotalProfit(res.data.data.profit);

      const result = await axios.post(
        "http://localhost:5000/inventory/getInventory",
        {
          email: user?.result.email,
          name: user?.result.name,
        }
      );
      setStock(result.data);
      let totalSpent = 0;
      result.data.forEach((stock, i) => {
        totalSpent += stock.quantity * stock.stockPrice;
      });
      let profitSum = 0;
      result.data.forEach(async (stock) => {
        const profit = await axios.get(`${API_BASE_URL}`, {
          params: {
            function: "GLOBAL_QUOTE",
            symbol: stock.ticker,
            apikey: API_KEY,
          },
        });
        profitSum += profit.data["Global Quote"]["05. price"] * stock.quantity;
        console.log(profitSum);
        setTotalCurrValue(profitSum);
      });
      setTotalSpent(totalSpent);
    };
    getStocks();
  }, []);

  const displayStocks = () => {
    if (stockArr !== null) {
      return stockArr.map((stock, index) => (
        <Paper className={classes.paper} key={index}>
          <Grid containter spacing={1}>
            <Grid item xs={12}>
              <Typography>Ticker: {stock.ticker}</Typography>
              <Typography>Owned: {stock.quantity}</Typography>
              <Typography>
                Purchased for: ${stock.quantity * stock.stockPrice}
              </Typography>
              <CurrentPrice
                quantity={stock.quantity}
                ticker={stock.ticker}
              ></CurrentPrice>
            </Grid>
          </Grid>
        </Paper>
      ));
    } else {
      return (
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <Typography>You currently have no stocks.</Typography>
          </Grid>
        </Paper>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Typography>Owned Stocks: </Typography>
          {displayStocks()}
        </Grid>
      </Paper>
    </div>
  );
}

export default Profolio;
