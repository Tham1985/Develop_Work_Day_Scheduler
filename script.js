$(function () {
  var storedValues = JSON.parse(localStorage.getItem("scheduledTasks")) || {};

  var currentHour = dayjs().format("H");
  
  $(".time-block").each(function () {
    var hourId = $(this).attr("id").split("-")[1];
    
    $(this).removeClass("past present future");

    if (parseInt(hourId) < parseInt(currentHour)) {
      $(this).addClass("past");
    } else if (hourId === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
    console.log(hourId)
  });

  $.each(storedValues, function (hourId, task) {
    $("#" + hourId + " textarea").val(task);
  });

  $(".saveBtn").on("click", function () {
    var hourId = $(this).parent().attr("id");
    var task = $(this).siblings("textarea").val();

    storedValues[hourId] = task;
    localStorage.setItem("scheduledTasks", JSON.stringify(storedValues));

    console.log("Value stored:", hourId, task);
      });

  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
