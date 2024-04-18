
import { Schema, mongoose } from "mongoose";

const mediaSchema = new Schema({
  title: String,
  description: String,
  sousDescription: String,
  imageMedia: String,
  pdfMedia: String,   
  viewUrl: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  commentaire: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createAt: {type:Date, default:Date.now()}
});

const Media = mongoose.model("Media", mediaSchema);

export default Media;



