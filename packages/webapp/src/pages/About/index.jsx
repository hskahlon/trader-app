import React from "react";
import {
  Typography,
  makeStyles,
  Paper,
  Grid,
  CardMedia,
  Card,
} from "@material-ui/core";
import img1 from "../../Images/img1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  banner: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  },
  card: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "1px",
    left: "1px",
    width: "100%",
    color: "white",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Card className={classes.card}>
              <CardMedia className={classes.banner} image={img1} />
              <Typography variant="h1" alignCenter className={classes.overlay}>
                About Us
              </Typography>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Etiam libero augue, bibendum quis tincidunt quis, luctus nec quam.
            Aliquam venenatis pulvinar magna eget ultricies. Nunc metus nunc,
            fermentum a dolor eu, egestas facilisis nunc. Donec quis ex
            elementum, rutrum neque sit amet, bibendum tellus. Sed quis tortor
            magna. Nunc dapibus orci eros, et finibus ligula efficitur eget.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Sed mattis urna eu est iaculis rutrum. In
            vestibulum auctor mi non scelerisque. Suspendisse purus ipsum,
            rutrum nec malesuada eu, gravida at risus. Etiam dictum elit et
            dapibus dignissim. Fusce vitae purus sed libero rutrum luctus. In
            lobortis, enim in laoreet pharetra, metus sapien lobortis sem, eu
            feugiat tellus neque in ex. Donec nec dictum massa.
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Etiam libero augue, bibendum quis tincidunt quis, luctus nec quam.
            Aliquam venenatis pulvinar magna eget ultricies. Nunc metus nunc,
            fermentum a dolor eu, egestas facilisis nunc. Donec quis ex
            elementum, rutrum neque sit amet, bibendum tellus. Sed quis tortor
            magna. Nunc dapibus orci eros, et finibus ligula efficitur eget.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Sed mattis urna eu est iaculis rutrum. In
            vestibulum auctor mi non scelerisque. Suspendisse purus ipsum,
            rutrum nec malesuada eu, gravida at risus. Etiam dictum elit et
            dapibus dignissim. Fusce vitae purus sed libero rutrum luctus. In
            lobortis, enim in laoreet pharetra, metus sapien lobortis sem, eu
            feugiat tellus neque in ex. Donec nec dictum massa.
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Contact Us At: help@email.com</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Address: 123 Street, Vancouver, BC
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
