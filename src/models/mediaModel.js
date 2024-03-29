import { Schema, mongoose } from "mongoose";

const mediaSchema = new Schema({
  title: String,
  description: String,
  mediaType: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createAt: {type:Date, default:Date.now()}
});

const Media = mongoose.model("Media", mediaSchema);

export default Media;
