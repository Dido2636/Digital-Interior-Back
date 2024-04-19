import { Schema, mongoose } from "mongoose";

const commentSchema = new Schema(
  {
    commentaire: String,
    author: String,
    media: { type: Schema.Types.ObjectId, ref: "Media" },
    createAt: {type:Date, default:Date.now()}
  },

);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
