import Comment from '../models/comment.js'

const addComment = (req, res) => {
    var comment = new Comment ({
        name: req.body.name,
        value: req.body.value,
    });

    comment.save(function(err) {
        if(err)
            throw err;
        else
            console.log('Comment Insert Successful');
    })
  }

const getComments = async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
}
  
export default {
    addComment,
    getComments,
}
  