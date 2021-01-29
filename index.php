<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="css/styles.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <title>IMDB WAREHOUSE</title>
</head>

<body class="p-5">
    <h1 class="text-center font-weight-bold">IMDB DATASET</h1>
    <div class="row p-4 d-flex justify-content-center align-items-center">
        <div>
            <label for="searchMode" class="mt-2">search by:</label>
            <select name="searchMode" id="searchMode">
                <!-- Single Table Queries -->
                <option value="name">Movie by Movie Name</option>
                <option value="id">Movie by Movie ID</option>
                <option value="year">Movie by Year Shown</option>
                <option value="ratinglessorequal">Movie with Rating Less than or Equal to</option>
                <option value="ratinggreaterorequal">Movie with Rating Greater than or Equal to</option>
                <!-- Two Table Queries -->
                <option value="directorname">Movie by Director Name</option>
                <option value="directorid">Movie by Director ID</option>
                <!-- Three Table Queries -->
                <option value="movietoactor">Actors and the roles they played on a movie</option>
                <option value="actorgenre">No. of times actor played in a genre</option>
                <!-- Four to Six Table Queries -->
                <option value="actordirector">No. of times actor played under a director</option>
            </select>
        </div>
        <div class="mx-4 d-flex">
            <input type="text" name="searchQuery" id="searchQuery" placeholder="enter movie name">
            <input type="text" name="searchQuery2" id="searchQuery2" placeholder="enter movie name" hidden>
            <input type="button" name="searchBtn" id="searchBtn" value="Search">
        </div>
        <div class="px-3 d-flex justify-content-center align-items-center">
            <a name="prevBtn" id="prevBtn"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
            <Text name="pageNum" id="pageNum" class="px-3 h5"></Text>
            <a name="nextBtn" id="nextBtn"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
        </div>
    </div>
    <p name="resultsCaption" id="resultsCaption"></p>
    <table name="results" id="results">
    </table>
</body>

<script type="text/javascript" src="home.js"></script>

</html>

<?php

// include_once("connections/connection.php");

// $con = connection();

// $strSearch = "star wars";

// $sql = 'SELECT name FROM movies WHERE name LIKE "%'.$strSearch.'%" LIMIT 20 OFFSET 0';

// $result = $con->query($sql) or die ($con->connect_error);

// echo "<ol>";
// while($row = $result->fetch_assoc()){
//     echo "<li>".$row['name']."</li>";
// };
// echo "</ol>";
?>