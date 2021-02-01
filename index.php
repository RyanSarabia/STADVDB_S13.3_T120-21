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
    <h1 class="text-center font-weight-bold">IMDB RATINGS</h1>
    <div class="container d-flex justify-content-between align-items-end">
        <!-- <div>
            <label for="searchMode" class="mt-2">search by:</label>
            <select name="searchMode" id="searchMode">
                <option value="rollupDirector">Director Average Rating</option>
                <option value="rollupActor">Actors Average Rating</option>
                <option value="rollupMovie">Movies Rating</option>
            </select>
        </div> -->
        <!-- <div class="mx-4 d-flex">
            <input type="text" name="searchQuery" id="searchQuery" placeholder="enter movie name">
            <input type="text" name="searchQuery2" id="searchQuery2" placeholder="enter movie name" hidden>
            <input type="button" name="searchBtn" id="searchBtn" value="Search">
        </div> -->
        <p name="resultsCaption" id="resultsCaption" class="m-0"></p>
        <div class="px-3 d-flex justify-content-center align-items-center">
            <a name="prevBtn" id="prevBtn"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
            <input type="number" name="pageNum" id="pageNum" min="1" class="px-3 h5"></Text>
            <a name="nextBtn" id="nextBtn"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
        </div>
    </div>
    <div class="container">
    </div>
    <div class="card container">
        <div class="row d-flex justify-content-between">
            <div style="min-width: 91px;">
                <button type="button" id="rollupBtn" class="btn btn-primary font-weight-bold mx-4 my-3" hidden>ROLL UP</button>
            </div>
            <div>
                <button type="button" id="sliceDirector" onclick="removeSlice('director_id')" class="btn btn-secondary font-weight-bold mx-1 my-3" hidden>
                    <span class="textSpan">Director</span> <span class="glyphicon glyphicon-remove ml-2" aria-hidden="true">
                </button>
                <button type="button" id="sliceActor" onclick="removeSlice('actor_id')" class="btn btn-secondary font-weight-bold mx-1 my-3" hidden>
                    <span class="textSpan">Actor</span> <span class="glyphicon glyphicon-remove ml-2" aria-hidden="true">
                </button>
                <button type="button" id="sliceMovie" onclick="removeSlice('movie_id')" class="btn btn-secondary font-weight-bold mx-1 my-3" hidden>
                    <span class="textSpan">Movie</span> <span class="glyphicon glyphicon-remove ml-2" aria-hidden="true">
                </button>
            </div>
            <div style="min-width: 91px;">
                <button type="button" id="drilldownBtn" class="btn btn-primary font-weight-bold mx-4 my-3">DRILL DOWN</button>
            </div>
        </div>
        <table name="results" id="results" class="table ">
    </div>
    </table>
</body>

<script type="text/javascript" src="home.js"></script>

</html>