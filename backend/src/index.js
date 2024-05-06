const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 1000;

app.use(cors({ origin: "*" })); // accepting request from all server

app.get("/", function (req, res) {
  res
    .status(200)
    .send("<h1 style=color:blue;text-align:center>Happy hacking!</h1>");
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
