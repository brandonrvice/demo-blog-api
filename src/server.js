import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api", routes);

app.listen(8000, () => console.log("Listening on port 8000."));
