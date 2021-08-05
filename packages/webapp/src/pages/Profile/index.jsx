import { Paper, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Profolio from "./components/Portfolio";
import User from "./components/User";
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

function Profile() {
  const classes = useStyles();
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalCurrValue, setTotalCurrValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalProfitCurrPort, setTotalProfitCurrPort] = useState(
    totalCurrValue - totalSpent
  );
  useEffect(() => {
    setTotalProfitCurrPort(totalCurrValue - totalSpent);
  }, [totalSpent, totalCurrValue]);
  return (
    <>
      <User />
      <Profolio
        setTotalSpent={setTotalSpent}
        setTotalCurrValue={setTotalCurrValue}
        setTotalProfit={setTotalProfit}
      />
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Typography>Profile Statistics: </Typography>
          <Paper className={classes.paper}>
            <Grid containter spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  Total Spent On Current Portfolio: {totalSpent.toPrecision(4)}
                </Typography>
                <Typography>
                  Total Profit On Current Portfolio:{" "}
                  {totalProfitCurrPort.toPrecision(4)}
                </Typography>
                <Typography>Total Profit: {totalProfit}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Paper>
    </>
  );
}

export default Profile;
