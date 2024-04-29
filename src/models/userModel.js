import { Schema, mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: String,
  firstname: String,
  email: { type: String, required: true },
  password: { type: String, min: [6, "Must be at least 6 characters"] },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  commentaire: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  invitedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.validPassword = async (candidatePassword, oldPassword) => {
  const result = await bcrypt.compare(candidatePassword, oldPassword);
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;
