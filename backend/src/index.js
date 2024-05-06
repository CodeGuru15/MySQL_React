const express = require("express");
const cors = require("cors");
const dbConfig = require("./dbConfig");

const app = express();
const port = 1000;

app.use(cors({ origin: "*" })); // accepting request from all server

app.use(express.json()); // we are using json format for the data

const mysql = require("mysql2/promise");

async function connectToDatabase() {
  try {
    const pool = await mysql.createPool(dbConfig);
    console.log("Connected to MySQL database");
    return pool;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1); // Exit the application on error
  }
}

const pool = connectToDatabase();

app.get("/users", async (req, res) => {
  try {
    const [rows] = await (await pool).query("SELECT * FROM  user_table");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error");
  }
});

app.get("/", function (req, res) {
  res
    .status(200)
    .send("<h1 style=color:blue;text-align:center>Happy hacking!</h1>");
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
