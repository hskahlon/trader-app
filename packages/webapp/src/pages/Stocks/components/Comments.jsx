/*
  Currently not connected to database
*/
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
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const commentsArr = [
  { user: "bob", str: "this is bob" },
  { user: "john", str: "this is john" },
];

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

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
}));

function Comments() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const forceUpdate = useForceUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();
    commentsArr.push({ user: user, str: comment });
    console.log({ user: user, str: comment });
    forceUpdate();
  };

  const displayComments = () => {
    return commentsArr.map((comment) => (
      <Paper className={classes.paper} key={comment}>
        <Grid containter wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>{comment.user}</Avatar>
          </Grid>
          <Grid item xs>
            {comment.str}
          </Grid>
        </Grid>
      </Paper>
    ));
  };

  return (
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
          <TextField
            onChange={(e) => setUser(e.target.value)}
            className={classes.nameField}
            label="Name"
            required
          />
          <TextField
            onChange={(e) => setComment(e.target.value)}
            label="Comment"
            variant="outlined"
            fullWidth
            required
          />
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
  );
}

export default Comments;
