import app from "./app.js";
import { connectDB } from "./config/database.js";
import NodeCron from "node-cron";
import { Stats } from "./models/stats.js";

connectDB();

NodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working on Port ${process.env.PORT}`);
});