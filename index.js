const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_ACTORS = "SELECT * FROM actors";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "imdb_ijs",
// });

// connection.connect((err) => {
//   if (err) {
//     return err;
//   }
// });

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "imdb_ijs",
});

// console.log(connection);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.get("/actors", (req, res) => {
  pool.query(SELECT_ALL_ACTORS, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
