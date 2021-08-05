import Comment from "../models/comment.js";

const addComment = (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    value: req.body.value,
  });

  comment.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.send("Comment successful");
    }
  });
};

const getComments = async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
};

export default {
  addComment,
  getComments,
};
