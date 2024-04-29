import { Schema, mongoose } from "mongoose";

const projectSchema = new Schema({
  title: String,
  description: String,
  author: {
    email: String, // Ajoutez le champ email pour stocker l'e-mail de l'utilisateur invité
    userId: { type: Schema.Types.ObjectId, ref: "Decorator" }, // Ajoutez l'ID de l'utilisateur pour référence
  },
  media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  invitedUsers: [
    {
      email: String, // Ajoutez le champ email pour stocker l'e-mail de l'utilisateur invité
      userId: { type: Schema.Types.ObjectId, ref: "User" }, // Ajoutez l'ID de l'utilisateur pour référence
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
