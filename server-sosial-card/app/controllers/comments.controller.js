// const db = require("../models");
//
// const Comments = db.comments;
// const Tutorial = db.tutorials
//
// exports.findAll = async (req, res) => {
//     try {
//         const post = await Tutorial.findOne({ id: req.params.postID });
//         if (!post) {
//             return res.status(404).json({
//                 message: "The post you were looking for is not available.",
//             });
//         }
//         const comments = await Comments.find({ postID: req.params.postID })
//             .exec();
//         res.status(200).json({
//             message: "Comments fetched successfully.",
//             response: {
//                 comments,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// }
// exports.create = async (req, res) => {
//     try {
//         const postID = req.params.id;
//         console.log("comment", req.body)
//         const comment = await new Comments({ postID, text: req.body.comment });
//         await comment.save();
//         res.status(201).json({
//             message: "Comment created successfully.",
//             response: {
//                 comment,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// }