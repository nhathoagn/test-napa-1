const mongoose = require("mongoose")
const {Schema} = mongoose;
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      avatar: String,
      name: String,
      description: String,
        deleteCheck: {type: Boolean, default: false},
        image: String,
        comments: { type: [String], default: [] },
        commentsCount: {
            type: Number,
            default: 0,
        },
        likesCount: {
            type: Number,
            default: 0,
        },

    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("post", schema);
  return Tutorial;
};
