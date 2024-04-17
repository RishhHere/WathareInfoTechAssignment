const express = require("express");
const app = express();
const samdata = require("./schema");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mon = require("./db_connect");

mon.mongodb();
// const corsOrigin = {
//   origin: ["http://localhost:3000"], //or whatever port your frontend is using
//   headers: ["Content-Type"],
//   credentials: true,
//   optionSuccessStatus: 200,
// };
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getdata", async (req, res) => {
  const data = await samdata.find();
  console.log(data.length);
  res.send({ sampledata: data });
});

app.listen(8080, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`server running on ${8080}`);
});
