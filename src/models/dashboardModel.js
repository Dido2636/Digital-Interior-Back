import { Schema, mongoose } from "mongoose";

const dashboardSchema = new Schema({
  decorator: { type: Schema.Types.ObjectId, ref: "Decorator" },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;