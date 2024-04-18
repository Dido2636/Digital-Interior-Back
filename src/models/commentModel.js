import { Schema, mongoose } from "mongoose";

const commentSchema = new Schema({
  commentaire: String,
  media: { type: Schema.Types.ObjectId, ref: "Media" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
