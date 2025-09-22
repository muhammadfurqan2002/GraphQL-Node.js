import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  comment: String,
  commentableId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  commentableType: {
    type: String,
    enum: ["Post", "Video"],
    required: true,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
