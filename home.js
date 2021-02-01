const pageLimit = 20;
var pageNum = 1;
var mode = "";
var modeNum = 1;
var strMode = "";
var maxPage = 125929;
var sliceDirector = "";
var sliceActor = "";
var sliceMovie = "";

$(document).ready(function () {
  $("#pageNum").val(pageNum);
  updateMode();
  search();

  $("#drilldownBtn").click(function () {
    if (modeNum < 3) {
      modeNum++;
      updateMode();
      search();
      $("#rollupBtn").prop("hidden", false);
      if (modeNum >= 3) {
        $("#drilldownBtn").prop("hidden", true);
      }
    }
  });

  $("#rollupBtn").click(function () {
    if (modeNum > 1) {
      modeNum--;
      updateMode();
      search();
      $("#drilldownBtn").prop("hidden", false);
      if (modeNum <= 1) {
        $("#rollupBtn").prop("hidden", true);
      }
    }
  });

  $("#pageNum").keyup(function (e) {
    var key = e.which;
    if (key == 13) {
      var val = $("#pageNum").val();
      if (val > 0 && val <= maxPage) {
        pageNum = val;
        search();
      } else {
        $("#pageNum").val(pageNum);
      }
    }
  });

  $("#pageNum").focusout(function () {
    $("#pageNum").val(pageNum);
  });

  $("#prevBtn").on("click", function () {
    if (pageNum > 1) {
      pageNum--;
      search();
    }
  });

  $("#nextBtn").on("click", function () {
    if (pageNum < maxPage) {
      pageNum++;
      search();
    }
  });
});

function slice(id, name, column) {
  if (column == "director_id") {
    sliceDirector = column + "=" + id;
    $("#sliceDirector .textSpan").text(name);
    $("#sliceDirector").prop("hidden", false);
  }
  if (column == "actor_id") {
    sliceActor = column + "=" + id;
    $("#sliceActor .textSpan").text(name);
    $("#sliceActor").prop("hidden", false);
  }
  if (column == "movie_id") {
    sliceMovie = column + "=" + id;
    $("#sliceMovie .textSpan").text(name);
    $("#sliceMovie").prop("hidden", false);
  }
  pageNum = 1;
  search();
}

function removeSlice(column) {
  if (column == "director_id") {
    sliceDirector = "";
    $("#sliceDirector .textSpan").text("");
    $("#sliceDirector").prop("hidden", true);
  }
  if (column == "actor_id") {
    sliceActor = "";
    $("#sliceActor .textSpan").text("");
    $("#sliceActor").prop("hidden", true);
  }
  if (column == "movie_id") {
    sliceMovie = "";
    $("#sliceMovie .textSpan").text("");
    $("#sliceMovie").prop("hidden", true);
  }
  pageNum = 1;
  search();
}

function updateMode() {
  /// Modes
  // 1) rollupDirector
  // 2) rollupActor
  // 3) rollupMovie
  pageNum = 1;
  switch (modeNum) {
    default:
    case 1:
      mode = "rollupDirector";
      strMode = "Director Average Ratings";
      break;
    case 2:
      mode = "rollupActor";
      strMode = "Director and Actor Average Ratings";
      break;
    case 3:
      mode = "rollupMovie";
      strMode = "Director and Actor Average Ratings and Movie Ratings";
      break;
  }
}

function search() {
  $("#results").empty();
  $("#resultsCaption").empty();
  $("#results").attr("start", pageLimit * (pageNum - 1) + 1);
  $("#pageNum").val(pageNum);
  $("#resultsCaption").append("Loading...");

  t1 = new Date();
  $.post(
    "search.php",
    {
      mode: mode,
      sliceDirector: sliceDirector,
      sliceActor: sliceActor,
      sliceMovie: sliceMovie,
      pageNum: pageNum,
    },
    function (data) {
      $("#results").empty();
      $("#resultsCaption").empty();
      $("#resultsCaption").append("<span class=bold>" + strMode + "</span>");
      $("#results").append(data);
      t2 = new Date();
      $("#resultsCaption").append(", " + (t2 - t1) / 1000 + " seconds.");
    }
  );
}
