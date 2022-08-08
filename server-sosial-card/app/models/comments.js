const mongoose = require("mongoose")

const {Schema} = mongoose;
module.exports = mongoose => {
    var schema = mongoose.Schema({
        postID:{
            type: Schema.Types.ObjectId,
            ref: "post"
        },
        comment: {
            type: String,
            require: true
        }
    },{timestamps: true})
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Comment = mongoose.model("comment", schema);
    return Comment;
}