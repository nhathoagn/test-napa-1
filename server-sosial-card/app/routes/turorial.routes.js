const tutorials = require("../controllers/tutorial.controller");
module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);



  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  //like
  router.patch('/likePost/:id',tutorials.like);
  //comment
  router.post('/comment/:id',tutorials.comment);
  //deleteRevert
  router.patch('/deleteRever/:id',tutorials.deleteRevert)
  //revert
  router.patch('/revert/:id',tutorials.revert);

  app.use("/api/posts", router);
};
