import { Schema, mongoose } from "mongoose";

const commentSchema = new Schema({
  commentaire: {type:String, required:true},
  id :{type: Schema.Types.ObjectId, ref:"Comments"},
  media: {type: Schema.Types.ObjectId, ref:"Media" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
