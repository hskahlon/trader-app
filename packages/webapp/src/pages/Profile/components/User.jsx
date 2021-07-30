import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  TextField,
  Image,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profolio from "./Portfolio";

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
  },
  userImg: {
    height: "100px",
    width: "100px",
  },
}));

function User() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar className={classes.userImg} variant="rounded">
              {user?.result.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h3" align="center">
              Welcome {user?.result.name}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default User;
