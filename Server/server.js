const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

//create express app
const app = express();

//Db
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("***DB connected***");
  })
  .catch((err) => {
    console.log("DB connection failed due to : ", err);
  });
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
