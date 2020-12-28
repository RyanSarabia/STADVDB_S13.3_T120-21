$(document).ready(function () {
  $("#searchBtn").on("click", function () {
    $("#results").empty();
    $.get("/actors", function (data) {
      console.log(data);
      data.forEach((record) => {
        $("#results").append(
          "<li>" +
            record.gender +
            ", " +
            record.first_name +
            " " +
            record.last_name +
            "</li>"
        );
      });
    });
  });
});
