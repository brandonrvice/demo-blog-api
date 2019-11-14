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
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api", routes);
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}.`));
