import Comment from '../models/inventory.js'

const addInventory = (req, res) => {
    var comment = new inventory ({
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

const getInventory = async (req, res) => {
    const comments = await Comment.find({ email: req.body.email });
    res.send(comments);
}
  
export default {
    addInventory,
    getInventory,
}
  