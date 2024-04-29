import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoute";
import decoratorRouter from "./routes/decoratorRoute";
import mediaRouter from "./routes/mediaRoute";
import commentRouter from "./routes/commentRouter";
import projectRouter from "./routes/projectRouter";


const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`DATABASE MongoDB est connecté`);
}


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
app.use("/media", mediaRouter);
app.use("/comment", commentRouter);
app.use("/projects", projectRouter);





app.use(express.static(process.cwd() + "/uploads"));






app.listen(PORT, () =>
  console.log(`[SERVER] is running on http://localhost:${PORT}`)
);



