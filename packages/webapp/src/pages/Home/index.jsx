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
            feugiat tellus neque in ex. Donec nec dictum massa. Etiam libero
            augue, bibendum quis tincidunt quis, luctus nec quam. Aliquam
            venenatis pulvinar magna eget ultricies. Nunc metus nunc, fermentum
            a dolor eu, egestas facilisis nunc. Donec quis ex elementum, rutrum
            neque sit amet, bibendum tellus. Sed quis tortor magna. Nunc dapibus
            orci eros, et finibus ligula efficitur eget. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Sed mattis urna eu est iaculis rutrum. In vestibulum auctor mi non
            scelerisque. Suspendisse purus ipsum, rutrum nec malesuada eu,
            gravida at risus. Etiam dictum elit et dapibus dignissim. Fusce
            vitae purus sed libero rutrum luctus. In lobortis, enim in laoreet
            pharetra, metus sapien lobortis sem, eu feugiat tellus neque in ex.
            Donec nec dictum massa.
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
      </Grid>
    </div>
  );
}

export default Home;
