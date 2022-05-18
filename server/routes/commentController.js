const Comment = require("../models/comment");

exports.postComment = (req, res) => {
  console.log("Body: ", req.body);
  const data = req.body;
  const newComment = new Comment(data);

  // . save()
  newComment.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Ooops, something happened with the server" });
    } else {
      res.status(200).json({ msg: "Your data has been saved!!!" });
    }
  });
};

exports.getAllPosts = (req, res) => {
  Comment.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
