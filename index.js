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

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.get("/", (req, res) => {
  res.sendFile("home.html", { root: __dirname });
});

const pageLimit = 20;

app.get("/name", (req, res) => {
  var strSearch = req.query.strSearch;
  var pageNum = req.query.pageNum - 1;
  var offset = pageNum * pageLimit;
  var query =
    'SELECT name FROM movies WHERE name LIKE "%' +
    strSearch +
    '%" LIMIT ' +
    pageLimit +
    " OFFSET " +
    offset;

  pool.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/id", (req, res) => {
  var strSearch = req.query.strSearch;
  var pageNum = req.query.pageNum - 1;
  var offset = pageNum * pageLimit;
  var query = "SELECT name FROM movies WHERE movies.id = " + strSearch;

  pool.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/year", (req, res) => {
  var strSearch = req.query.strSearch;
  var pageNum = req.query.pageNum - 1;
  var offset = pageNum * pageLimit;
  var query =
    "SELECT name FROM movies WHERE YEAR = " +
    strSearch +
    " LIMIT " +
    pageLimit +
    " OFFSET " +
    offset;

  pool.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/rating/lessorequal", (req, res) => {
  var strSearch = req.query.strSearch;
  var pageNum = req.query.pageNum - 1;
  var offset = pageNum * pageLimit;
  var query =
    "SELECT name FROM movies WHERE movies.rank <= " +
    strSearch +
    " LIMIT " +
    pageLimit +
    " OFFSET " +
    offset;

  pool.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/rating/greaterorequal", (req, res) => {
  var strSearch = req.query.strSearch;
  var pageNum = req.query.pageNum - 1;
  var offset = pageNum * pageLimit;
  var query =
    "SELECT name FROM movies WHERE movies.rank >= " +
    strSearch +
    " LIMIT " +
    pageLimit +
    " OFFSET " +
    offset;

  pool.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

/**
Single Query: (Single-table query must be written for the largest table (degree > 10) only.)
1. Find movie by name
SELECT name FROM movies
WHERE name LIKE "%star wars%"
LIMIT 20 OFFSET 0

2. Find movie by id
SELECT name FROM movies
WHERE movies.id = 0

3. Find movies by year shown
SELECT name FROM movies
WHERE YEAR = 2000
LIMIT 20 OFFSET 0

4. Find movies by finding less than or equal to the rating specified
SELECT name FROM movies
WHERE movies.rank < 5.0
LIMIT 20 OFFSET 0

4. Find movies by finding more than or equal to the rating specified
SELECT name FROM movies
WHERE movies.rank < 5.0
LIMIT 20 OFFSET 0
 */
