import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;
