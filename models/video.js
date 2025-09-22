import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: String,
  url: String,
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
