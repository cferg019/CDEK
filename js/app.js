$(document).ready(function () {
  $('select').formSelect();

  $('.datepicker').datepicker({ autoClose: true });

  $("#when").hide();
  $("#where").hide();
  $("#submit-button").hide();
  $("#next-button").hide();
  $("#what").show();

  $('select[name="dropdown"]').change(function () {
    var activityChoice = $(this).val();
    console.log(activityChoice);
    $("#what").hide();
    $("#where").show();
    $("#next-button").show();
  });

  $("#next-button").on("click", function () {
    var placeChoice = $("#email").val().trim();
    console.log(placeChoice);
    $("#where").hide();
    $("#next-button").hide();
    $("#when").show();
    $("#submit-button").show();
  });

  $("#submit-button").on("click", function () {
    var dateChoice = $(".datepicker").val();
    console.log(dateChoice);
  });


});