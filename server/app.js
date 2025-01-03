import express from "express";
import dotenv from "dotenv"; 
import ErrorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
  path: "./config/config.env"
})
const app = express();

// Using middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors(
  {
    origin: [process.env.FRONTEND_URL, process.env.VIEWER_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
));

// Importing and using routes

import user from "./routes/userRoutes.js"
import subject from "./routes/subjectRoutes.js"
import others from "./routes/otherRoutes.js"

app.use("/api/v1", user);
app.use("/api/v1", subject);
app.use("/api/v1", others);

app.get("/", (req, res) => {
  res.send(`<h1 style="font-family:Garamond; width:100%; text-align:center; padding-top: 45vh;">Server is working fine, <a href="${process.env.FRONTEND_URL}" style="font-style: italic;">click here</a> to visit client side.</h1>`);
});

app.use(ErrorMiddleware)
export default app;