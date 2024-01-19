// Import the express in typescript file
import express from "express";
import dotenv from "dotenv";
import { route } from "./routes/testRoute";
import cors from "cors";
import bodyParser from 'body-parser';
// run dotenv
dotenv.config();

// Initialize the express engine
const app: express.Application = express();
app.use(
  cors(
    //  if don't have 2 line below, credentials: "include" attributes in fetch in front-end will got cors error
    {
      origin: "http://localhost:5173",
      credentials: true,
    }
  )
);

app.use(bodyParser.json())
// Take a port 3000 for running server.
const port: number | string = process.env.PORT || 5000;

// Handling '/' Request
app.get("/", (_req, _res) => {
  _res.send("TypeScript With Express");
});

app.use("/api/test", route);

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express 
		http://localhost:${port}/`);
});
