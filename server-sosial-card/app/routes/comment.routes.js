// module.exports = app => {
//     const comments = require("../controllers/comments.controller")
//     var router = require("express").Router();
//     router.get("/:postID",comments.findAll)
//     router.post("/:postID",comments.create)
//     app.use("/api/comments", router);
// }