const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config();

//create express app
const app = express();

//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);
//port
const port = process.env.port || 8000;

//server listening
app.listen(port, () => {
  console.log(`server is running at port" ${port}`);
});
