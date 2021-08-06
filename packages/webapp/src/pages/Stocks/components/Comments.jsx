import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { useEffect, useState } from "react";
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
  comments: {
    maxWidth: 750,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  sumbit: {
    maxWidth: 750,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
  },
  nameField: {
    padding: theme.spacing(1),
  },
  submitBtn: {
    margin: `${theme.spacing(1)}px auto`,
  },
  gridItem: {
    margin: "10px",
  },
}));

function Comments() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const [commentsArr, setComments] = useState(null);

  useEffect(() => {
    axios.get("http://34.127.9.86:5000/comment/getComments").then((res) => {
      setComments(res.data);
    });
  }, ["http://34.127.9.86:5000/comment/getComments"]);

  const handleSubmit = (e) => {
    axios
      .post("http://34.127.9.86:5000/comment/addComment", {
        name: user?.result.name,
        value: comment,
      })
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const displayComments = () => {
    if (commentsArr) {
      return commentsArr.map((comment, index) => (
        <Paper className={classes.paper} key={index}>
          <Grid containter wrap="nowrap" spacing={2}>
            <Grid item xs={2} className={classes.gridItem}>
              <Avatar>{comment.name.charAt(0)}</Avatar>
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <Typography className={classes.user}>{comment.name}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              {comment.value}
            </Grid>
          </Grid>
        </Paper>
      ));
    } else {
      return (
        <Paper className={classes.paper}>
          <Grid containter wrap="nowrap" spacing={2}>
            <Grid item xs>
              No Comments
            </Grid>
          </Grid>
        </Paper>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container className={classes.comments}>
        <div>
          <Typography
            className={classes.typography}
            variant="h6"
            color="textSecondary"
            compoent="h2"
          >
            Comments
          </Typography>
          <div>{displayComments()}</div>
        </div>
        <Container className={classes.submit}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.gridItem}>
                <Avatar>{user?.result.name.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  onChange={(e) => setComment(e.target.value)}
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="sumbit"
              variant="containted"
              endIcon={<KeyboardArrowRightIcon />}
              className={classes.submitBtn}
            >
              Submit
            </Button>
          </form>
        </Container>
      </Container>
    </div>
  );
}

export default Comments;
