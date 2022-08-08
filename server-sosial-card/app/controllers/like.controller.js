// const db = require("../models");
// const Tutorial = db.tutorials
// const Like = db.like
// exports.create = (req,res) => {
//     const  id = req.params.id;
//     Tutorial.findById(id)
//         .then(data => {
//             if (!data)
//                 res.status(404).send({ message: "Not found Tutorial with id " + id });
//             else res.send(data);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "Error retrieving Tutorial with id=" + id });
//         });
//     // Like.findOne({postID: id })
//     const like = new Like({postID: id})
//     like
//         .save(like)
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Tutorial."
//             });
//         })
//
//
//
//
// }
// exports.finAll = (req, res) => {
//     const  id = req.params.id;
//     Like.findById(id)
//         .then(data => {
//             if (!data)
//                 res.status(404).send({ message: "Not found Tutorial with id " + id });
//             else res.send(data);
//         })
// }