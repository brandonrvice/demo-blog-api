const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");

dotenv.config();

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api", routes);
app.listen(process.env.PORT || 80, () =>
  console.log(`Listening on port ${process.env.PORT || 80}.`)
);
