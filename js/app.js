// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCQ70Sp4YCE4VNGzu7sgpvhTP2-jc09810",
  authDomain: "cdek-e5b2e.firebaseapp.com",
  databaseURL: "https://cdek-e5b2e.firebaseio.com",
  projectId: "cdek-e5b2e",
  storageBucket: "cdek-e5b2e.appspot.com",
  messagingSenderId: "537136191482",
  appId: "1:537136191482:web:4de06e5866b16000cb3643"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {

  // Declaring variables to be used in API search
  var activityChoice;
  var placeChoice;
  var artistChoice;
  var teamChoice;
  var diningChoice;

  //Initializing drop down menu
  $('select').formSelect();

  // hiding question divs other than "what are you in the mood for"
  $("#when").hide();
  $("#where").hide();
  $("#submit-button").hide();
  $("#next-button").hide();
  $("#artist").hide();
  $("#team").hide();
  $("#dining").hide();
  $("#results-button").hide();

  // when choice selected from drop down, the activity chosen in stored, this div is hidden, and the div with the next question is shown.
  $('select[name="dropdown"]').change(function () {
    activityChoice = $(this).val().trim();
    console.log(activityChoice);
    $("#what").hide();
    $("#where").show();

    if (activityChoice === "Have a Drink")
      $("#results-button").show();
    else {
      $("#submit-button").show();
    }
  });

  // When next button is selected, the place chosen is stored, this div is hidden, and the div with the next question is shown.
  $("#submit-button").on("click", function () {
    placeChoice = $("#email").val().trim();
    console.log(placeChoice);
    $("#where").hide();
    $("#next-button").hide();
    $("#results-button").show();
    $("#submit-button").hide();

    if (activityChoice === "See a Concert") {
      $("#artist").show();
    } else if (activityChoice === "Go to a Game") {
      $("#team").show();
    } else if (activityChoice === "Eat Out") {
      $("#dining").show();
    }
  });

  // Final information is stored.  Begin API query.
  $("#results-button").on("click", function () {
    if (activityChoice === "See a Concert") {
      artistChoice = $("#concertArtist").val().trim();
      $("#concertArtist").val("");
      console.log(artistChoice);
    } else if (activityChoice === "Go to a Game") {
      teamChoice = $("#sportsTeam").val().trim();
      $("#sportsTeam").val("");
      console.log(teamChoice);
    } else if (activityChoice === "Eat Out") {
      diningChoice = $("#foodType").val().trim();
      $("#foodType").val("");
      console.log(diningChoice);
    } else if (activityChoice === "Have a Drink") {
      placeChoice = $("#email").val().trim();
      $("#email").val("");
      console.log(placeChoice);
    }

    // API Code Here
  });

});