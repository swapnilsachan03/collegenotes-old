import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on Port ${process.env.PORT}`);
});