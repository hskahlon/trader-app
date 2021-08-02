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
  const [stockArr, setStock] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:5000/inventory/getInventory", {
        email: user?.result.email,
        name: user?.result.name,
      })
      .then((res) => {
        setStock(res.data);
      });
  });

  const displayStocks = () => {
    if (stockArr !== null) {
      return stockArr.map((stock, index) => (
        <Paper className={classes.paper} key={index}>
          <Grid containter spacing={1}>
            <Grid item xs={3}>
              Ticker: {stock.ticker}
            </Grid>
            <Grid item xs={3}>
              Owned: {stock.quantity}
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
