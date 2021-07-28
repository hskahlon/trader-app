import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

function Profolio() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const stockArr = [
    { name: "AAPL", quantity: 100, price: 23 },
    { name: "AMC", quantity: 100, price: 23 },
    { name: "AMZN", quantity: 100, price: 23 },
    { name: "TSLA", quantity: 100, price: 23 },
  ];

  const totalValue = stockArr.reduce(
    (sum, stock) => sum + stock.price * stock.quantity,
    0
  );

  const displayStocks = () => {
    if (stockArr) {
      return stockArr.map((stock) => (
        <Paper className={classes.paper} key={stock}>
          <Grid containter spacing={1}>
            <Grid item xs={3}>
              Ticker: {stock.name}
            </Grid>
            <Grid item xs={3}>
              Owned: {stock.quantity}
            </Grid>
            <Grid item xs={3}>
              Price: ${stock.price}
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
          <Grid item xs={12}>
            <Typography variant="h5">Portfolio total: {totalValue}</Typography>
          </Grid>
          {displayStocks()}
        </Grid>
      </Paper>
    </div>
  );
}

export default Profolio;
