const db = require("../models");
const mongoose = require('mongoose');
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log("da",req.body)
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    avatar: req.body.avatarr,
    name: req.body.name,
    description: req.body.description,
    image: req.body.imagee


    // published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("search", req.params)
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  console.log("update", req.body)
  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  console.log("body", req.params)
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
exports.like = async (req, res) =>{

  const id = req.params.id;
  console.log("like", id)
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Tutorial.findById(id);
  console.log("like",post)
  const updatedPost = await Tutorial.findByIdAndUpdate(id, { likesCount: post.likesCount + 1 }, { new: true });

  res.json(updatedPost);
}
exports.deleteRevert = async (req, res) =>{

  const id = req.params.id;
  console.log("like", id)
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Tutorial.findById(id);
  console.log("like",post)
  const updatedPost = await Tutorial.findByIdAndUpdate(id, { deleteCheck: true }, { new: true });

  res.json(updatedPost);
}
exports.revert = async (req, res) =>{

  const id = req.params.id;
  console.log("like", id)
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Tutorial.findById(id);
  console.log("like",post)
  const updatedPost = await Tutorial.findByIdAndUpdate(id, { deleteCheck: false }, { new: true });

  res.json(updatedPost);
}
exports.comment = async (req,res) =>{
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  console.log("comments", req.body)
  const id = req.params.id
  const { comments } = req.body
  const post = await Tutorial.findById(id);
  console.log("body-comment", req.body.comments)
  console.log("comment",post)

   post.comments.push(comments);
   post.commentsCount = post.commentsCount + 1

  const updatedPost = await Tutorial.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
}