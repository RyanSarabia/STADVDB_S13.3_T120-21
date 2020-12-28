const path = require("path");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const port = 4000;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const SELECT_ALL_ACTORS = "SELECT * FROM actors LIMIT 100";

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "imdb_ijs",
});

app.get("/", (req, res) => {
  res.sendFile("home.html", { root: __dirname });
});

app.get("/actors", (req, res) => {
  pool.query(SELECT_ALL_ACTORS, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
