import React from "react";
import {
  Typography,
  makeStyles,
  Paper,
  Grid,
  CardMedia,
  Card,
} from "@material-ui/core";
import img2 from "../../Images/img2.jpg";
import { Parallax } from "react-parallax";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    paddingBottom: "10px",
  },
  overlay: {
    position: "absolute",
    top: "40%",
    left: "40%",
    color: "white",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Parallax
          blur={{ min: -30, max: 30 }}
          bgImage={img2}
          bgImageAlt="the dog"
          strength={-300}
        >
          <div style={{ height: "1000px" }} />
        </Parallax>
        <Typography variant="h1" alignCenter className={classes.overlay}>
          Trading
        </Typography>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography>Welcome to our trading app.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
