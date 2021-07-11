import { Avatar, Grid, Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const comments_arr = [
  { user: "bob", str: "this is bob" },
  { user: "john", str: "this is john" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 750,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

function Comments() {
  const classes = useStyles();
  return (
    <>
      <h1>Comments</h1>
      <div>
        {comments_arr.map((comment) => (
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
        ))}
      </div>
    </>
  );
}

export default Comments;
