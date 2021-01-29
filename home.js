const pageLimit = 20;
var pageNum = 1;
var strSearch = "";
var strSearch2 = "";
var mode = "";
var maxPage = 100;

$(document).ready(function () {
  mode = $("#searchMode").val();
  $("#pageNum").text(pageNum);
  search();

  $("#searchMode").change(function () {
    mode = $("#searchMode").val();
    $("#searchQuery").val("");
    $("#searchQuery2").val("");
    if (mode == "actorgenre" || mode == "actordirector") {
      $("#searchQuery2").attr("hidden", false);
      if (mode == "actorgenre") {
        $("#searchQuery").prop("placeholder", "enter genre");
        $("#searchQuery2").prop("placeholder", "enter actor name");
      } else {
        $("#searchQuery").prop("placeholder", "enter actor name");
        $("#searchQuery2").prop("placeholder", "enter director name");
      }
    } else {
      $("#searchQuery2").attr("hidden", true);
      switch (mode) {
        case "name":
          $("#searchQuery").prop("placeholder", "enter movie name");
          break;
        case "id":
          $("#searchQuery").prop("placeholder", "enter movie id");
          break;
        case "year":
          $("#searchQuery").prop("placeholder", "enter movie year");
          break;
        case "ratinglessorequal":
        case "ratinggreaterorequal":
          $("#searchQuery").prop("placeholder", "enter rating");
          break;
        case "directorname":
          $("#searchQuery").prop("placeholder", "enter director name");
          break;
        case "directorid":
          $("#searchQuery").prop("placeholder", "enter director id");
          break;
        case "movietoactor":
          $("#searchQuery").prop("placeholder", "enter movie name");
          break;
      }
    }
  });

  $("#searchBtn").on("click", function () {
    pageNum = 1;
    mode = $("#searchMode").val();
    strSearch = $("#searchQuery").val();
    strSearch2 = $("#searchQuery2").val();
    search();
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

function search() {
  $("#results").empty();
  $("#resultsCaption").empty();
  $("#results").attr("start", pageLimit * (pageNum - 1) + 1);
  $("#pageNum").text(pageNum);
  $("#resultsCaption").append("Loading...");

  strMode = $("#searchMode option:selected").text();
  curQuery = strSearch;
  curQuery2 = strSearch2;

  t1 = new Date();
  $.post(
    "search.php",
    {
      mode: mode,
      strSearch: strSearch,
      strSearch2: strSearch2,
      pageNum: pageNum,
    },
    function (data) {
      $("#results").empty();
      $("#resultsCaption").empty();
      $("#resultsCaption").append(
        "Results of <span class=bold>" +
          strMode +
          "</span>: " +
          curQuery +
          " " +
          curQuery2
      );
      $("#results").append(data);
      t2 = new Date();
      $("#resultsCaption").append(
        "<br/>Finished in " + (t2 - t1) / 1000 + " seconds."
      );
    }
  );
}
