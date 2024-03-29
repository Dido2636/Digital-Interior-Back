import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoute";
import decoratorRouter from "./routes/decoratorRoute";
import mediaRouter from "./routes/mediaRoute";
import commentRouter from "./routes/commentRouter";

const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`DATABASE MongoDB est connecté`);
}

// // j'utilise EJS comme moteur de rendu pour les views (les pages "inscription" "connexion")
// app.set("view engine", "ejs");
// app.use(express.static("public"));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => res.json("YOU ARE IN INTERIOR BACKEND"));
app.use("/users", userRouter);
app.use("/decorators", decoratorRouter);

// app.use(,express.static("ima"));

app.use("/media", mediaRouter);
app.use("/comment", commentRouter);

app.listen(PORT, () =>
  console.log(`[SERVER] is running on http://localhost:${PORT}`)
);
